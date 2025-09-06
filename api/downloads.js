import Stripe from "stripe";
import { supabase, BUCKET } from "./_supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });

export default async function handler(req, res) {
  const session_id = req.query.session_id;
  if (!session_id) return res.status(400).json({ error: "Missing session_id" });

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items.data.price.product"],
    });

    if (session.payment_status !== "paid") {
      return res.status(403).json({ error: "Payment not completed" });
    }

    const items = [];
    for (const li of session.line_items?.data ?? []) {
      const price = li.price;
      const product = price?.product;
      const productName = (product && product.name) || li.description || "Download";

      const meta = price?.metadata || {};
      const raw = meta.file_keys ?? meta.file_key ?? null;

      let keys = [];
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) keys = parsed;
          else if (typeof parsed === "string" && parsed.trim()) keys = [parsed.trim()];
        } catch {
          if (typeof raw === "string" && raw.trim()) keys = [raw.trim()];
        }
      }

      for (const fileKey of keys) {
        if (!fileKey) continue;
        const relative = String(fileKey).replace(new RegExp(`^${BUCKET}/`), "");
        const { data, error } = await supabase
          .storage.from(BUCKET)
          .createSignedUrl(relative, 60 * 10); // 10 minutes

        if (error || !data?.signedUrl) {
          console.error("Signing error for", fileKey, error);
          return res.status(500).json({ error: `Could not sign URL for ${fileKey}` });
        }

        items.push({ product: productName, price_id: price?.id, url: data.signedUrl, file_key: fileKey });
      }
    }

    if (!items.length) {
      return res.status(404).json({
        error: "No downloadable items found. Add 'file_key' or 'file_keys' to the Price metadata.",
      });
    }

    res.json({ items });
  } catch (e) {
    console.error("/downloads error:", e);
    res.status(400).json({ error: e.message || "Failed to load session" });
  }
}
