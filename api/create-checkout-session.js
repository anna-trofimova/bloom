import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  try {
    const { lineItems } = req.body || {};
    if (!Array.isArray(lineItems) || !lineItems.length) {
      return res.status(400).json({ error: "Missing lineItems" });
    }
    const CLIENT_URL = process.env.NEXT_PUBLIC_SITE_URL;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${CLIENT_URL}/cancel`,
      allow_promotion_codes: true,
    });

    res.json({ url: session.url });
  } catch (e) {
    console.error("create-checkout-session:", e);
    res.status(400).json({ error: e.message });
  }
}
