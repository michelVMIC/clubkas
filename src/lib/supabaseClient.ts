import { createClient } from "@supabase/supabase-js";
import type { Database } from "dbschema/src";

export const supabase = createClient<Database>(
  process.env.SUPABASE_URL ?? "",
  process.env.SUPABASE_ANON_KEY ?? "",
);
