
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Privacy() {
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
        <h1 className="text-2xl font-semibold">Privacy Policy</h1>
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close Privacy Policy"
          className="inline-flex items-center rounded-md border border-[hsl(var(--border))] px-3 py-1 text-sm text-[color:hsl(var(--muted-foreground))] hover:bg-black/5 transition"
        >
          ✕ Close
        </button>
      </header>

      <p className="text-sm text-[color:hsl(var(--muted-foreground))]">
        Last updated: 08/26/2025
      </p>

      <p className="mt-4">
        At <strong>Bloom</strong> (“we,” “our,” “us”), your privacy is important to us. This Privacy
        Policy explains how we collect, use, and protect your personal information when you visit
        our website [YourWebsite.com] and purchase our digital products.
      </p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mt-8">1. Information We Collect</h2>
        <ul className="list-disc pl-6">
          <li><strong>Personal Information:</strong> name, email address, billing details (through our payment processor).</li>
          <li><strong>Order Information:</strong> details of digital products you purchase.</li>
          <li><strong>Technical Information:</strong> IP address, browser type, and usage data (through analytics tools like Google Analytics or Pinterest Tag).</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6">
          <li>Delivering purchased digital products via email or download link.</li>
          <li>Sending order confirmations, receipts, and product updates.</li>
          <li>Providing customer support.</li>
          <li>Marketing (e.g., newsletters, promotions) only if you opt in.</li>
          <li>Improving our website and services.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">3. Sharing Your Information</h2>
        <ul className="list-disc pl-6">
          <li>We do not sell or rent your personal information.</li>
          <li>We may share your data only with service providers (payment processors, email delivery services, analytics tools) to fulfill orders and operate our website.</li>
          <li>Legal authorities if required by law or to protect our rights.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">4. Data Storage & Security</h2>
        <ul className="list-disc pl-6">
          <li>Your data is stored securely using industry-standard encryption and access controls.</li>
          <li>We take reasonable steps to protect your personal information but cannot guarantee 100% security of data transmitted online.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">5. Your Rights</h2>
        <ul className="list-disc pl-6">
          <li>Access the personal data we hold about you.</li>
          <li>Request corrections or updates.</li>
          <li>Request deletion of your personal data (unless required for legal or transactional reasons).</li>
          <li>Opt out of marketing communications at any time.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">6. Tracking Technologies</h2>
        <p>
          We may use tracking technologies to analyze website traffic, improve user experience, and
          support advertising campaigns (e.g., Pinterest Ads, Google Analytics).
        </p>

        <h2 className="text-xl font-semibold mt-8">7. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites. We are not responsible for the
          privacy practices of these websites.
        </p>

        <h2 className="text-xl font-semibold mt-8">8. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted here with an
          updated “Last Updated” date.
        </p>

        <h2 className="text-xl font-semibold mt-8">Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy or how we handle your data, please
          contact us: 📧{" "}
          <a href="mailto:bloom.clientscare@gmail.com" className="hover:underline">
            bloom.clientscare@gmail.com
          </a>
        </p>
      </div>
    </main>
  );
}
