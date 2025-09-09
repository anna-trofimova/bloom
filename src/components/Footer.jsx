
import React from "react";
import { Link } from "react-router-dom";

const contactLinks = [
  { label: "Email:bloom.clientscare@gmail.com", href: "mailto:bloom.clientscare@gmail.com" }, 
  { label: "Pinterest", href: "https://es.pinterest.com/BloomExplorer/", external: true }, 
];

const legalLinks = [
  { label: "Privacy", to: "/privacy" }, 
  { label: "Terms", to: "/terms" },
  { label: "Returns & Refunds", to: "/returns" }, // when you add it
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[hsl(var(--border))] py-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <section aria-labelledby="footer-contact">
            <h3 id="footer-contact" className="mb-3 text-base font-semibold">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              {contactLinks.map((item) => (
                <li key={item.label}>
                  <a
                    className="hover:underline"
                    href={item.href}
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="footer-legal">
            <h3 id="footer-legal" className="mb-3 text-base font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm">
              {legalLinks.map((item) => (
                <li key={item.label}>
                  <Link className="hover:underline" to={item.to}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-sm text-[color:hsl(var(--muted-foreground))] md:flex-row">
          <p>© {year} Bloom</p>
        </div>
      </div>
    </footer>
  );
}
