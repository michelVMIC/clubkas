import { supabase } from "$lib/supabaseClient";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const prerender = false;

export const load = (async ({ params }) => {
  const id = params.clubkasId;

  if (!id) throw error(404, "ClubKas action not found");
  const selectClubKas = supabase
    .from("clubkas")
    .select(
      `
    slug,
    logo,
    message,
    funding_goal,
    target_amount,
    total_raised,
    clubkas_styling (
      primary_color,
      secondary_color
    )
  `
    )
    .eq("id", id);

  const result = await selectClubKas;
  if (result.error) throw error(500, "Something went wrong with retrieving the data.");
  if (result.data.length !== 1) throw error(404, "No single ClubKas ID found.");
  else return {clubKasData: result.data[0], id};
}) satisfies PageServerLoad;
