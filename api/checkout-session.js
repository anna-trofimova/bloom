import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });

export default async function handler(req, res) {

  res.setHeader('Access-Control-Allow-Origin', process.env.WEBSITE_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { id } = req.query || {};
  
  if (!id) return res.status(400).json({ error: "Missing session id" });
  try {
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
    res.status(400).json({ error: e.message });
  }
}
