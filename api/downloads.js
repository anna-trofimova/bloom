import Stripe from "stripe";
import { supabase, BUCKET } from "./_supabase.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      res.setHeader("Allow", "GET");
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const session_id = req.query.session_id;
    if (!session_id) return res.status(400).json({ error: "Missing session_id" });

    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items.data.price.product"],
    });

    if (session.mode === "payment" && session.payment_status !== "paid") {
      return res.status(403).json({ error: `Payment not completed (status: ${session.payment_status})` });
    }

    const items = [];
    for (const li of session.line_items?.data || []) {
      const price = li.price;
      const product = price?.product;
      const productName = (product && product.name) || li.description || "Download";

      const meta = price?.metadata || {};
      const raw = meta.file_keys ?? meta.file_key ?? null;

      let keys = [];
      if (raw) {
        try {
          const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
          if (Array.isArray(parsed)) keys = parsed;
          else if (typeof parsed === "string" && parsed.trim()) keys = [parsed.trim()];
        } catch {
          if (typeof raw === "string" && raw.trim()) keys = [raw.trim()];
        }
      }

      if (!keys.length) {
        return res.status(404).json({
          error: `No file keys found in Stripe Price metadata (price: ${price?.id}). Add "file_key" or "file_keys".`,
        });
      }

      for (const fileKey of keys) {
        const relative = String(fileKey).replace(new RegExp(`^${BUCKET}/`), "").replace(/^\//, "");
        const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(relative, 60 * 10);
        if (error || !data?.signedUrl) {
          console.error("[downloads] sign error:", { BUCKET, relative, error });
          return res.status(500).json({ error: `Could not sign URL for ${relative}: ${error?.message || "unknown"}` });
        }
        items.push({ product: productName, price_id: price?.id || null, quantity: li.quantity || 1, url: data.signedUrl, file_key: fileKey });
      }
    }

    return res.status(200).json({ items });
  } catch (e) {
    console.error("/api/downloads error:", e);
    return res.status(500).json({ error: e?.message || "Server error" });
  }
}
