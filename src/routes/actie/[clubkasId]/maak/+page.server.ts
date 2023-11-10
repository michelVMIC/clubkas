import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { supabase } from "$lib/supabaseClient.js";
import { error, redirect } from "@sveltejs/kit";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Bucket } from "sst/node/bucket";
import type { PageServerLoad } from "./$types";

export const prerender = false;

export const load = (async ({ params }) => {
  const id = params.clubkasId;

  if (!id) throw error(404, "Customer not found.");

  const query = supabase.from("clubkas").select().eq("activated", true).eq("id", id);

  const result = await query;

  if (!result.data) throw error(404, `Customer with id: ${id} doesn't exist or is not activated`);

  const uploadLogoCommand = new PutObjectCommand({
    ACL: "public-read",
    Key: `logos/${id}`,
    Bucket: Bucket.clubkas.bucketName,
    ContentType: `image/*`,
  });

  const signedUrlForLogo = await getSignedUrl(new S3Client({}), uploadLogoCommand);

  return {
    customerData: result.data[0], // This should always return one element.
    logoUploadUrl: signedUrlForLogo,
  };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ params, request }) => {
    const id = params.clubkasId;
    const data = await request.formData();

    const payload = {
      slug: data.get("clubkas-slug") as string, // TODO: this might contain invalid slug data
      logoSrc: data.get("logo-src") as string,
      fundingGoal: data.get("funding-goal") as string,
      targetAmount: parseInt(data.get("target-amount") as string) * 100,
      motivation: data.get("motivation-message") as string,
      primaryColor: data.get("primary-color") as string,
      secondaryColor: data.get("secondary-color") as string,
    };

    // First create the styling attributes
    const createClubKasStyle = supabase.from("clubkas_styling").insert({
      clubkas_id: id,
      primary_color: payload.primaryColor,
      secondary_color: payload.secondaryColor,
    });
    await createClubKasStyle;
    // Then update the rest of the Clubkas fields
    const updateClubKasQuery = supabase
      .from("clubkas")
      .update({
        logo: payload.logoSrc,
        slug: payload.slug,
        funding_goal: payload.fundingGoal,
        target_amount: payload.targetAmount,
        message: payload.motivation,
      })
      .eq("id", id);

    const result = await updateClubKasQuery;
    if (!result.error) throw redirect(302, `/actie/${id}?status=created`);
    else throw error(502, result.error);
  },
};
