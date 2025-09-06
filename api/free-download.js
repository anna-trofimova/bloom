import { supabase, BUCKET } from "./_supabase";

export default async function handler(req, res) {
  try {
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
