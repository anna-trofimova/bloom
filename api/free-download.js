// api/free-download.js
import { supabase, BUCKET } from "./_supabase.js"; 

export default async function handler(req, res) {
  // CORS (same as other routes)
  res.setHeader("Access-Control-Allow-Origin", process.env.WEBSITE_URL || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    if (req.method !== "GET") {
      res.setHeader("Allow", "GET, OPTIONS");
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const fileKey = (req.query.file_key || "").toString().trim();
    if (!fileKey) return res.status(400).json({ error: "Missing file_key" });

    const relative = fileKey.replace(new RegExp(`^${BUCKET}/`), "");
    const { data, error } = await supabase
      .storage.from(BUCKET)
      .createSignedUrl(relative, 60 * 60 * 24 * 7); // 7 days

    if (error || !data?.signedUrl) {
      console.error("Free signing error", error);
      return res.status(500).json({ error: "Could not create signed URL" });
    }

    res.json({ url: data.signedUrl });
  } catch (e) {
    console.error("/free-download error:", e);
    res.status(500).json({ error: "Server error" });
  }
}
