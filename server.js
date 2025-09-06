import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: ".env.server" });

const app = express();

// --- Stripe client (define BEFORE using it) ---
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

// --- CORS ---
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
app.use(
  cors({
    origin: [CLIENT_URL, "http://localhost:5173", "http://localhost:3000"],
    credentials: false,
  })
);

// --- Stripe Webhook must use RAW body and come BEFORE express.json() ---
app.post("/webhook", bodyParser.raw({ type: "application/json" }), (req, res) => {
  const sig = req.headers["stripe-signature"];
  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("✅ Payment success:", session.id);
      // TODO: grant access, write to Supabase, send email, etc.
    }

    res.json({ received: true });
  } catch (err) {
    console.error("❌ Webhook Error:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

// After webhook only:
app.use(express.json());

// --- Supabase ---
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
const BUCKET = process.env.SUPABASE_BUCKET || "downloads";

// --- Health ---
app.get("/ping", (_req, res) => res.json({ ok: true }));

// --- Create Checkout Session ---
app.post("/create-checkout-session", async (req, res) => {
  try {
    const { lineItems } = req.body;
    if (!Array.isArray(lineItems) || !lineItems.length) {
      return res.status(400).json({ error: "Missing lineItems" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${CLIENT_URL}/cancel`,
      allow_promotion_codes: true,
    });

    res.json({ url: session.url });
  } catch (e) {
    console.error("/create-checkout-session error:", e);
    res.status(400).json({ error: e.message });
  }
});

// --- Success page helper (order info) ---
app.get("/checkout-session", async (req, res) => {
  try {
    const { id } = req.query; // ?id=cs_...
    if (!id) return res.status(400).json({ error: "Missing session id" });

    const session = await stripe.checkout.sessions.retrieve(id, {
      expand: ["line_items.data.price.product"],
    });

    res.json({
      status: session.payment_status,
      amount_total: session.amount_total,
      currency: session.currency,
      customer_email: session.customer_details?.email,
      line_items:
        session.line_items?.data?.map((li) => ({
          description: li.description,
          quantity: li.quantity,
          price_id: li.price?.id,
          product_name: li.price?.product?.name,
        })) ?? [],
    });
  } catch (e) {
    console.error("/checkout-session error:", e);
    res.status(400).json({ error: e.message });
  }
});

// --- Generate downloads for a PAID session ---
app.get("/downloads", async (req, res) => {
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

        items.push({
          product: productName,
          price_id: price?.id,
          url: data.signedUrl,
          file_key: fileKey,
        });
      }
    }

    if (!items.length) {
      return res.status(404).json({
        error:
          "No downloadable items found. Add 'file_key' (single) or 'file_keys' (JSON array) to the Price metadata.",
      });
    }

    res.json({ items });
  } catch (e) {
    console.error("/downloads error:", e);
    res.status(400).json({ error: e.message || "Failed to load session" });
  }
});

// --- Start server (use dynamic port for hosting) ---
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
