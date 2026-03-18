import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Success() {
  const params = new URLSearchParams(useLocation().search);
  const sessionId = params.get("session_id");

  const [info, setInfo] = useState(null);
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    if (!sessionId) return;
    (async () => {
      try {
        const res = await fetch(`${API}/api/checkout-session?id=${encodeURIComponent(sessionId)}`);
        const data = await res.json();
        if (res.ok) setInfo(data);
        else setErr(data.error || "Could not load session");
      } catch {
        setErr("Network error");
      }
    })();
  }, [sessionId]);

  const loadDownloads = async () => {
    setLoading(true);
    setErr("");
    setItems([]);
    try {
      const res = await fetch(`${API}/api/downloads?session_id=${encodeURIComponent(sessionId)}`);
      const data = await res.json();
      if (res.ok) setItems(data.items || []);
      else setErr(data.error || "Could not load downloads");
    } catch {
      setErr("Network error");
    } finally {
      setLoading(false);
    }
  };

  const prettyName = (item, idx) => {
    const fromKey = item?.file_key?.split("/").pop();
    if (fromKey) return fromKey;
    try {
      const clean = (item?.url || "").split("?")[0];
      const last = clean.split("/").pop();
      if (last) return last;
    } catch {}
    return `document-${idx + 1}.pdf`;
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] flex flex-col items-center justify-center px-6 py-16">

      {/* Decorative top gradient bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d8b4fe] via-[#818cf8] to-[#34d399]" />

      <div className="w-full max-w-lg animate-fade-up">

        {/* Icon + heading */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[hsl(var(--secondary))] mb-6 text-3xl">
            🎉
          </div>
          <h1 className="text-4xl font-bold font-['Playfair_Display'] text-[hsl(var(--foreground))] mb-3">
            Payment Successful
          </h1>
          <p className="text-[hsl(var(--muted-foreground))] text-base leading-relaxed max-w-sm mx-auto">
            Thank you for your purchase! Your digital product is ready to download below.
          </p>
        </div>

        {err && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600 text-center">
            {err}
          </div>
        )}

        {/* Order summary */}
        {info && (
          <div className="card-soft mb-8">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))] mb-4">
              Order Summary
            </h2>
            <div className="space-y-2 text-sm text-[hsl(var(--foreground))]">
              <div className="flex justify-between">
                <span className="text-[hsl(var(--muted-foreground))]">Status</span>
                <span className="inline-flex items-center gap-1.5 font-medium text-emerald-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  {info.status === "paid" ? "Paid" : info.status}
                </span>
              </div>
              {info.amount_total != null && (
                <div className="flex justify-between">
                  <span className="text-[hsl(var(--muted-foreground))]">Total</span>
                  <span className="font-medium">
                    {(info.amount_total / 100).toFixed(2)} {info.currency?.toUpperCase()}
                  </span>
                </div>
              )}
              {info.customer_email && (
                <div className="flex justify-between">
                  <span className="text-[hsl(var(--muted-foreground))]">Email</span>
                  <span className="font-medium">{info.customer_email}</span>
                </div>
              )}
            </div>

            {Array.isArray(info.line_items) && info.line_items.length > 0 && (
              <div className="mt-4 pt-4 border-t border-[hsl(var(--border))]">
                <p className="text-xs uppercase tracking-widest text-[hsl(var(--muted-foreground))] mb-2">Items</p>
                <ul className="space-y-1">
                  {info.line_items.map((li, i) => (
                    <li key={i} className="text-sm font-medium">
                      {li.product_name || li.description}
                      <span className="text-[hsl(var(--muted-foreground))] font-normal"> × {li.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Downloads */}
        <div className="text-center">
          {items.length > 0 ? (
            <div className="space-y-4">
              <p className="text-sm text-[hsl(var(--muted-foreground))] mb-2">
                Click below to open your file. We recommend saving it to your device.
              </p>
              {items.map((d, idx) => (
                <div key={`${d.price_id || "free"}-${idx}`}>
                  <a
                    href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full px-6 py-3 rounded-2xl font-semibold text-white text-center shadow-md transition hover:shadow-lg"
                      style={{ background: 'hsl(262, 83%, 58%)' }}
                    >
                      ↓ Download {items.length > 1 ? `Document ${idx + 1}` : "Your File"}
                    </a>
                  <p className="mt-1.5 text-xs text-[hsl(var(--muted-foreground))]">
                    {prettyName(d, idx)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
        <button
          type="button"
          onClick={loadDownloads}
          disabled={loading}
          className="w-full px-6 py-3 rounded-2xl font-semibold text-white shadow-md transition hover:shadow-lg disabled:opacity-60"
          style={{ background: 'hsl(262, 83%, 58%)' }}
        >
          {loading ? "Preparing your download…" : "Get Your Download"}
        </button>
          )}
        </div>

        {/* Back to home */}
        <div className="text-center mt-10">
          <a
            href="/"
            className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition underline underline-offset-4"
          >
            ← Back to home
          </a>
        </div>

      </div>
    </div>
  );
}
