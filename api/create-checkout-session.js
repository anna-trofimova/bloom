// /api/create-checkout-session.js
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  try {
    const siteUrl = "https://bloombobiko.vercel.app"; // keep this hardcoded for stability

    const body = req.body || {};
    let line_items;
    if (Array.isArray(body.lineItems)) {
      line_items = body.lineItems.map(it => ({
        price: String(it.price),
        quantity: Number(it.quantity ?? 1),
      }));
    } else if (typeof body.priceId === "string") {
      line_items = [{ price: body.priceId, quantity: Number(body.quantity ?? 1) }];
    } else {
      return res.status(400).json({
        error: "Send either { priceId[, quantity] } or { lineItems: [{ price, quantity }] }",
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${siteUrl}/#/success?session_id={CHECKOUT_SESSION_ID}`, // <-- hash route
      cancel_url: `${siteUrl}/#/cancel`,                                      // <-- hash route
    });

    return res.status(200).json({ url: session.url });
  } catch (e) {
    console.error("Stripe create session error:", e);
    return res.status(400).json({ error: e?.message || "Stripe error" });
  }
}
