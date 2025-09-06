import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Success() {
  const params = new URLSearchParams(useLocation().search);
  const sessionId = params.get("session_id");

  const [info, setInfo] = useState(null);
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!sessionId) return;
    (async () => {
      try {
        const res = await fetch(
          `http://localhost:4242/checkout-session?id=${encodeURIComponent(sessionId)}`
        );
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
      const res = await fetch(
        `http://localhost:4242/downloads?session_id=${encodeURIComponent(sessionId)}`
      );
      const data = await res.json();
      if (res.ok) setItems(data.items || []);
      else setErr(data.error || "Could not load downloads");
    } catch {
      setErr("Network error");
    } finally {
      setLoading(false);
    }
  };

  // Helper: show a nice filename if server included file_key; fallback to URL path
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
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold">Payment successful 🎉</h1>
      {sessionId && <p className="mt-2 text-sm opacity-70">Session: {sessionId}</p>}

      {err && <p className="mt-4 text-red-600">{err}</p>}

      {info && (
        <div className="mt-6 mx-auto max-w-md text-left border rounded-xl p-4">
          <p><strong>Status:</strong> {info.status}</p>
          {info.amount_total != null && (
            <p><strong>Total:</strong> {(info.amount_total / 100).toFixed(2)} {info.currency?.toUpperCase()}</p>
          )}
          {info.customer_email && <p><strong>Email:</strong> {info.customer_email}</p>}
          {Array.isArray(info.line_items) && info.line_items.length > 0 && (
            <div className="mt-3">
              <strong>Items:</strong>
              <ul className="list-disc pl-5">
                {info.line_items.map((li, i) => (
                  <li key={i}>{li.product_name || li.description} × {li.quantity}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* MULTI-LINK DOWNLOADS: numbered + open in new tab */}
      <div className="mt-6">
        {items.length > 0 ? (
          <div className="space-y-3">
            {items.map((d, idx) => (
              <div key={`${d.price_id || "free"}-${idx}`} className="flex flex-col items-center">
                <a
                  href={d.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 rounded-lg bg-black text-white"
                  title={prettyName(d, idx)}
                >
                  Open document {idx + 1}
                </a>
                <p className="mt-1 text-xs opacity-70">
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
            className="inline-block px-4 py-2 rounded-lg bg-black text-white disabled:opacity-60"
          >
            {loading ? "Preparing downloads…" : "Get your downloads"}
          </button>
        )}
      </div>

      <a href="/" className="block mt-8 underline">Back to home</a>
    </div>
  );
}
