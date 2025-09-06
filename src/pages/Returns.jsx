// src/pages/Returns.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Returns() {
  const navigate = useNavigate();

  const handleClose = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Returns & Refunds Policy</h1>
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close Returns Policy"
          className="inline-flex items-center rounded-md border border-[hsl(var(--border))] px-3 py-1 text-sm text-[color:hsl(var(--muted-foreground))] hover:bg-black/5 transition"
        >
          ✕ Close
        </button>
      </header>

      <p className="text-sm text-[color:hsl(var(--muted-foreground))]">
        Last updated: 08/26/2025
      </p>

      <p className="mt-4">
        At <strong>Bloom</strong>, we take pride in delivering high-quality digital products.
        Please read our policy carefully before making a purchase.
      </p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mt-8">1. Digital Products Are Final Sale</h2>
        <ul className="list-disc pl-6">
          <li>All purchases of digital products are final.</li>
          <li>
            Once a product has been purchased and delivered via email or download link, we do not
            offer returns, exchanges, or refunds.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">2. Delivery Issues</h2>
        <ul className="list-disc pl-6">
          <li>If you do not receive your digital product within 24 hours of purchase, check your email spam/junk folder first.</li>
          <li>
            If you still cannot access your purchase, contact us at{" "}
            <a href="mailto:bloom.clientscare@gmail.com" className="hover:underline">
              bloom.clientscare@gmail.com
            </a>{" "}
            and we will ensure you receive your product.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">3. Technical Support</h2>
        <ul className="list-disc pl-6">
          <li>
            We are happy to assist if there are technical issues preventing you from accessing or
            using your digital product.
          </li>
          <li>
            Support is available via{" "}
            <a href="mailto:bloom.clientscare@gmail.com" className="hover:underline">
              bloom.clientscare@gmail.com
            </a>{" "}
            and will typically be responded to within 2 business days.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">4. Product Errors</h2>
        <ul className="list-disc pl-6">
          <li>
            If a product is found to have a defect or error that prevents its intended use, we will
            provide a corrected version at no additional cost.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">Contact Us</h2>
        <p>
          For any questions regarding returns, refunds, or product delivery, please contact us at:{" "}
          📧{" "}
          <a href="mailto:bloom.clientscare@gmail.com" className="hover:underline">
            bloom.clientscare@gmail.com
          </a>
        </p>
      </div>
    </main>
  );
}
