import { createClient } from "@supabase/supabase-js";

export const BUCKET = process.env.SUPABASE_BUCKET || "downloads"; 

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
if (!serviceKey) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");

export const supabase = createClient(url, serviceKey, {
  global: { headers: { "x-application-name": "bloom-downloads" } },
});
