// src/components/CheckoutButton.jsx
export default function CheckoutButton({ priceId, quantity = 1 }) {
  const handleClick = async () => {
    try {
      if (!priceId) {
        console.error("Missing priceId");
        alert("Missing Stripe priceId on this card");
        return;
      }

      const res = await fetch("http://localhost:4242/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lineItems: [{ price: priceId, quantity }] }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("Checkout API error:", err);
        alert("Failed to create checkout session");
        return;
      }

      const data = await res.json();
      if (data.url) {
        window.location.assign(data.url);
      } else {
        console.error("No URL in response:", data);
        alert("No checkout URL returned");
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error starting checkout");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="absolute top-3 right-3 z-10 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-3 py-1 rounded-full shadow"
    >
      Buy Now
    </button>
  );
}
