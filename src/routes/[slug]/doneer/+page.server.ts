import { announceOrder, getIssuerList, postRefreshCall } from "$lib/server/rabobank/RabobankClient";
import { type Actions, fail, redirect, error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { supabase } from "$lib/supabaseClient";

/**
 *  NOTE: this is not a customer specific refresh token, it's a general MIC token, used to **only** to get the bank list.
 */
const micBankToken =
  "eyJraWQiOiJIUDFYU2tYY1B2MWxNNTBvT3dkSVVHR3h5N1Q3MG1nazZJRzhRQktMUm9JPSIsImFsZyI6IlJTMjU2In0.eyJta2lkIjo4MTExNiwiZW52IjoiUyIsImV4cCI6NzI1ODAyODQwMH0.co2FNNmjeuHzOVCQFliCCFOEOQX33U2vu2ose9vUYj2yAs7NqJEwKefCGpkgJsa74YG-mRdjCG8LuyKS9QR7sP4oeq5tIBONgAtEJYVnwJDSYBFRFY9-Z5Csh8leAfjBqMQWtSDtEDSVCZRlI8IoLDKChwwDKg-6w7FFZHWKJkB7zgTuAUMwi977GStg4obDUc33QKoIL-kG9dLZv30jipiblLP0VXffNz2bhdTDUHmt6UpmtpweK-T2ApiG3t3C6cIhEDtkOYveHmvPhSHe0sUtdvGcFcTWwZ4th-FO35Fyg-h3LUbUiinve_c2zb9bIB8j1RQ-BFfhopyO0aG5lA";

export const load = (async ({ params }) => {
  const slug = params.slug;
  const getAccessTokenOutput = await postRefreshCall(micBankToken);
  const list = await getIssuerList(getAccessTokenOutput.token);

  const getClubKasQuery = supabase
    .from("clubkas")
    .select(
      `*,
      clubkas_styling (
        primary_color,
        secondary_color
    )`
    )
    .eq("slug", slug);
  const result = await getClubKasQuery;

  if (!result.error) return { bankList: list.issuers, clubkas: result.data[0] };
  else {
    throw error(404, "Unable to find slug associated with a clubkas");
  }
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request, url, params }) => {
    const slug = params.slug!;
    // get chosen bank
    const data = await request.formData();
    const bankId = data.get("bank");

    const amount = data.get("selected-amount") as string;

    if (!bankId) {
      fail(400, { message: "Select a bank." });
    }

    if (!amount || isNaN(parseFloat(amount))) {
      fail(400, { message: "Please specify an amount to donate." });
    }

    const parsedAmount = parseFloat(amount);

    const getClubKasData = supabase.from("clubkas").select().eq("slug", slug);
    const supaResponse = await getClubKasData;
    if (!supaResponse.data || supaResponse.data.length !== 1)
      throw error(500, "Something went wrong with the payment.");

    const clubkas = supaResponse.data[0];
    // Get an access token by using the refresh token of the customer
    const getAccesTokenOutput = await postRefreshCall(clubkas.rabo_refresh_token!);

    // First create an order
    const createPaymentRequest = supabase
      .from("rabo_paymentrequests")
      .insert({
        amount: parsedAmount,
        journey_id: clubkas.id,
      })
      .select("payment_id");

    const createPaymentRequestResponse = await createPaymentRequest;
    console.log({ createPaymentRequestResponse });
    if (!createPaymentRequestResponse.data || createPaymentRequestResponse.data.length !== 1)
      throw error(500, "Something went wrong with creating payment.");

    const order = createPaymentRequestResponse.data[0].payment_id;

    // Create the announce order.
    const announcedOrder = await announceOrder(
      order,
      getAccesTokenOutput.token,
      parsedAmount,
      bankId as string,
      url.href
    );

    console.log({ announcedOrder });
    // Redirect to the Rabobank environment
    throw redirect(303, announcedOrder.redirectUrl);
  },
} satisfies Actions;
