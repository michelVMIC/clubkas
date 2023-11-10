import { supabase } from "$lib/supabaseClient";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Bucket } from "sst/node/bucket";

export const prerender = false;

export const load = (async ({ params }) => {
  const id = params.clubkasId;

  if (!id) throw error(404, "ClubKas action not found");
  const selectClubKas = supabase
    .from("clubkas")
    .select(
      `
    logo,
    message,
    funding_goal,
    target_amount,
    clubkas_styling (
      primary_color,
      secondary_color
    )
  `
    )
    .eq("id", id);

  const result = await selectClubKas;

  const uploadLogoCommand = new PutObjectCommand({
    ACL: "public-read",
    Key: `logos/${id}`,
    Bucket: Bucket.clubkas.bucketName,
    ContentType: `image/*`,
  });

  const signedUrlForLogo = await getSignedUrl(new S3Client({}), uploadLogoCommand);

  if (result.error) throw error(500, "Something went wrong with retrieving the data.");
  if (result.data.length !== 1) throw error(404, "No single ClubKas ID found.");
  else
    return {
      clubKasData: result.data[0],
      logoUploadUrl: signedUrlForLogo,
    };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ params, request }) => {
    const id = params.clubkasId;
    const data = await request.formData();

    const payload = {
      logoSrc: data.get("logo-src") as string,
      fundingGoal: data.get("funding-goal") as string,
      targetAmount: parseInt(data.get("target-amount") as string) * 100,
      motivation: data.get("motivation-message") as string,
      primaryColor: data.get("primary-color") as string,
      secondaryColor: data.get("secondary-color") as string,
    };

    // First create the styling attributes
    const createClubKasStyle = supabase.from("clubkas_styling").update({
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
        funding_goal: payload.fundingGoal,
        target_amount: payload.targetAmount,
        message: payload.motivation,
      })
      .eq("id", id);

    const result = await updateClubKasQuery;
    if (!result.error) throw redirect(302, `/actie/${id}`);
    else throw error(502, result.error);
  },
};
