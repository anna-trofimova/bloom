
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Terms() {
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
        <h1 className="text-2xl font-semibold">Terms &amp; Conditions</h1>
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close Terms"
          className="inline-flex items-center rounded-md border border-[hsl(var(--border))] px-3 py-1 text-sm text-[color:hsl(var(--muted-foreground))] hover:bg-black/5 transition"
        >
          ✕ Close
        </button>
      </header>

      <p className="text-sm text-[color:hsl(var(--muted-foreground))]">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <p>Welcome to Bloom. These Terms and Conditions (“Terms”) govern your use of our website bloom.com and any purchases made through it. By accessing or using our site, you agree to be bound by these Terms. If you do not agree, please do not use our services.</p>

      <div className="prose max-w-none mt-6">
        <h2 className="text-xl font-semibold mt-8">1. General Information</h2>
            <ul className="list-disc pl-6">
                <li>This website is owned and operated by Bloom, located at [bloom.com].</li>
                <li>You must be at least 18 years old (or the legal age of majority in your country) to make purchases on our site.</li>
            </ul>

        <h2 className="text-xl font-semibold mt-8">2. Products &amp; Services</h2>
          <ul className="list-disc pl-6">
                <li>We strive to display our products as accurately as possible. However, we cannot guarantee that colors, images, or descriptions will always be perfectly accurate.</li>
                <li>We reserve the right to modify or discontinue products at any time without notice.</li>
            </ul>

        <h2 className="text-xl font-semibold mt-8">3. Payments &amp; Subscriptions</h2>
        <ul className="list-disc pl-6">
                <li>By placing an order, you agree to provide accurate billing and shipping information.</li>
                <li>We accept payments via ...</li>
                <li>Prices are displayed in U.S. dollars and include/exclude applicable taxes as stated at checkout.</li>
            </ul>

        <h2 className="text-xl font-semibold mt-8">4. Shipping &amp; Delivery</h2>
        <ul className="list-disc pl-6">
                <li>All of our products are digital and delivered electronically.</li>
                <li>After your payment is successfully processed, you will receive an email with a download link (or direct access instructions) to your product.</li>
                <li>Delivery is typically instant, but in some cases may take up to 24 hours depending on payment processing or technical issues.</li>
                <li>No physical items will be shipped.</li>
                <li>Please ensure you provide a valid email address at checkout to receive your digital purchase.</li>
            </ul>

        <h2 className="text-xl font-semibold mt-8">5. Intellectual Property</h2>
        <ul className="list-disc pl-6">
                <li>All content on this site (text, images, graphics, logos) is the property of Bloom or its content suppliers and is protected by copyright and trademark laws.</li>
                <li>You may not copy, distribute, or use our content without written permission.</li>
            </ul>

        <h2 className="text-xl font-semibold mt-8">6. Limitation of Liability</h2>
        <ul className="list-disc pl-6">
            <li>We are not liable for any indirect, incidental, or consequential damages arising from the use of our site or products.</li>
            <li>Our total liability to you shall not exceed the amount paid for the product in question.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">7. Changes to These Terms</h2>
        <ul className="list-disc pl-6">
            <li>We may update these Terms from time to time. Updates will be posted on this page with a new “Last Updated” date.</li>
            <li>Continued use of our site after changes means you accept the revised Terms.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">8. Privacy</h2>
        <ul className="list-disc pl-6">
            <li>
              Your use of our website is also governed by our
              <Link to="/privacy" className="underline hover:no-underline"> Privacy Policy</Link>, which explains how we collect, use, and protect your data.
            </li>
            <li>For details, please see our <Link to="/privacy" className="underline hover:no-underline"> Privacy Policy</Link> page.</li>
            <li>Third item</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">9. Returns &amp; Refunds</h2>
        <ul className="list-disc pl-6">
            <li>Since our products are digital downloads, all sales are final.</li>
            <li>We do not offer returns, exchanges, or refunds once a product has been purchased and delivered.</li>
            <li>If you encounter an issue accessing your product, please contact us at bloom.clientscare@gmail.com, and we will ensure you receive your purchase.</li>
            <li>For details, please see our <Link to="/returns" className="underline hover:no-underline"> Returns & Refund</Link> page.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">Contact Us</h2>
        <p>For questions about these Terms, please contact us at:
           📧 bloom.clientscare@gmail.com</p>

      </div>
    </main>
  );
}
