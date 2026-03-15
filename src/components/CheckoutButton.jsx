export default function CheckoutButton({ priceId, quantity = 1, className = "" }) {
  const handleClick = async () => {
    try {
      if (!priceId) {
        console.error("Missing priceId");
        alert("Missing Stripe priceId on this card");
        return;
      }

      const res = await fetch("/api/create-checkout-session", {
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
      className={className || "bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow"}
    >
      Buy Now
    </button>
  );
}