import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
});

export default async function handler(req, res) {
  
  res.setHeader('Access-Control-Allow-Origin', process.env.WEBSITE_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

  try {
    const siteUrl = process.env.WEBSITE_URL || "http://localhost:5173";

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${siteUrl}/#/success?session_id={CHECKOUT_SESSION_ID}`, // with hash
      cancel_url: `${siteUrl}/#/cancel`,
      allow_promotion_codes: true,
    });

    return res.status(200).json({ url: checkoutSession.url });


    if (!/^https?:\/\//i.test(siteUrl)) {
      return res.status(400).json({ error: `Invalid site URL: "${siteUrl}"` });
    }

    const body = req.body || {};
    let line_items;

    if (Array.isArray(body.lineItems)) {
      line_items = body.lineItems.map((it) => ({
        price: String(it.price),
        quantity: Number(it.quantity ?? 1),
      }));
    } else if (typeof body.priceId === 'string') {
      line_items = [{ price: body.priceId, quantity: Number(body.quantity ?? 1) }];
    } else {
      return res.status(400).json({
        error:
          'Send either { priceId[, quantity] } or { lineItems: [{ price, quantity }] }',
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      // 👉 Keep plain paths (no #) — this was the point where payment worked
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cancel`,
    });

    return res.status(200).json({ url: session.url });
  } catch (e) {
    console.error('Stripe create session error:', e);
    return res.status(400).json({ error: e?.message || 'Stripe error' });
  }
}
