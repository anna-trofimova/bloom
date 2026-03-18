
import { useState } from "react";
import ProductsMenu from "./components/ProductsMenu";
import CheckoutButton from "./components/CheckoutButton";
import SliderDots from "./components/SliderDots";
import ProductCarousel from "./components/ProductCarousel";
import ProductCard from "./components/ProductCard";
import ProductPreviewModal from "./components/ProductPreviewModal";

import logo from "./assets/logo_bloom.png";

import {
  astrologyProducts,
  trackerProducts,
  coloringProducts,
  bundles,
  freeProducts
} from "./data/products";


export default function LandingPage() {
  const [email, setEmail] = useState("");

  const [previewProduct, setPreviewProduct] = useState(null);
  const onPreview = (item) => setPreviewProduct(item);

  const [astrCurrent, setAstrCurrent] = useState(0);
  const [habitCurrent, setHabitCurrent] = useState(0);
  const [bookCurrent, setBookCurrent] = useState(0);
  const [bundleCurrent, setBundleCurrent] = useState(0);

  const [astrInst, setAstrInst] = useState(null);
  const [habitInst, setHabitInst] = useState(null);
  const [bookInst, setBookInst] = useState(null);
  const [bundleInst, setBundleInst] = useState(null);

  const [freeInst, setFreeInst] = useState(null);
  const [freeCurrent, setFreeCurrent] = useState(0);

  // --- DATA ---------------------------------------------------------

  // --- RENDER -------------------------------------------------------
  return (
    <div className="min-h-screen bg-[var(--background)] text-[color:hsl(var(--foreground))]">
      {/* NAV + HERO */}
      <header className="relative z-[200] overflow-visible isolate">
        <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />

        {/* NAVBAR */}
        <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
            <div className="relative flex items-center" style={{ width: "140px", height: "100%" }}>
              <img
                src={logo}
                alt="Bloom Logo"
                className="absolute h-36 w-auto"
                style={{ top: "0", transform: "translateY(0)" }}
              />
            </div>
          <div className="hidden gap-6 md:flex">
            <ProductsMenu />
            <a className="btn-ghost focus-ring" href="#testimonials">Reviews</a>
            <a className="btn-ghost focus-ring" href="#faq">FAQ</a>
          </div>
        </nav>

        {/* HERO */}
        <section className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-2">
          <div>
            <h1 className="text-hero mb-6">One product –</h1>
            <h1 className="text-hero mb-6">Better Life</h1>
            <p className="text-body-large text-[color:hsl(var(--muted-foreground))] mb-8">
              Ready‑to‑Use guidance on your next bright step
            </p>
          </div>

          <div>
            <div className="card-minimal p-4">
              <div className="card-soft p-4">

                <div className="grid grid-cols-2 gap-4">
                  <a href="#trackers" className="rounded-2xl border border-[hsl(var(--border))] bg-white/70 p-6 text-center hover:shadow-md transition">
                    <p className="text-card-title mb-2">Self-care Habits</p>
                    <p className="text-sm text-[color:hsl(var(--muted-foreground))]">Track your routines</p>
                  </a>

                  <a href="#astrology" className="rounded-2xl border border-[hsl(var(--border))] bg-white/70 p-6 text-center hover:shadow-md transition">
                    <p className="text-card-title mb-2">Astrology World</p>
                    <p className="text-sm text-[color:hsl(var(--muted-foreground))]">Discover the stars</p>
                  </a>

                  <a href="#bundles" className="rounded-2xl border border-[hsl(var(--border))] bg-white/70 p-6 text-center hover:shadow-md transition">
                    <p className="text-card-title mb-2">Traveling & Budgeting</p>
                    <p className="text-sm text-[color:hsl(var(--muted-foreground))]">Plan smarter</p>
                  </a>

                  <a href="#coloring" className="rounded-2xl border border-[hsl(var(--border))] bg-white/70 p-6 text-center hover:shadow-md transition">
                    <p className="text-card-title mb-2">Coloring Books</p>
                    <p className="text-sm text-[color:hsl(var(--muted-foreground))]">Relax & create</p>
                  </a>
                </div>

                <a href="#bundles" className="mt-4 block rounded-2xl border border-[hsl(var(--border))] bg-white/80 p-5 hover:shadow-md transition">
                  <p className="text-card-title">Explore Bundle Options</p>
                  <p className="mt-1 text-sm text-[color:hsl(var(--muted-foreground))]">
                    Get yourself the full package because you deserve it
                  </p>
                </a>

              </div>
            </div>
          </div>
        </section>

      </header>

      {/* SHOP SECTIONS */}
      <section id="tools" className="bg-[hsl(var(--background))] py-20">
        <div className="mx-auto max-w-6xl px-6">
          {/* ASTROLOGY */}
          <h2 id="astrology" className="text-section-title text-center mb-6 scroll-mt-28">
            Astrology Guides & Tools
          </h2>
          <p className="text-center text-[color:hsl(var(--muted-foreground))] mb-12 italic text-lg max-w-2xl mx-auto">
            Astrology doesn’t tell you who you are — it’s a mirror that reflects patterns, inviting you to notice what’s already moving within you and the world around you.
          </p>

          <ProductCarousel
            products={astrologyProducts}
            onPreview={onPreview}
            CheckoutButton={CheckoutButton}
            showDots={false}
            onReady={setAstrInst}
            onSlideChanged={setAstrCurrent}
          />
          <div className="mb-16" />

          {/* HABIT TRACKERS */}
          <h2 id="trackers" className="text-section-title text-center mb-6 scroll-mt-28">
            Habit Trackers
          </h2>
          <p className="text-center text-[color:hsl(var(--muted-foreground))] mb-12 italic text-lg max-w-2xl mx-auto">
            A habit tracker doesn't make you disciplined — it's a mirror that shows the patterns of your days, inviting you to notice what's
            already shaping your life and where you want to grow.
          </p>

          <ProductCarousel
            products={trackerProducts}
            onPreview={onPreview}
            CheckoutButton={CheckoutButton}
            showDots={false}
            onReady={setHabitInst}
            onSlideChanged={setHabitCurrent}
          />
          <div className="mb-16" />

          {/* COLORING BOOKS */}
          <h2 id="coloring" className="text-section-title text-center mb-6 scroll-mt-28">
            Coloring Books
          </h2>
          <p className="text-center text-[color:hsl(var(--muted-foreground))] mb-12 italic text-lg max-w-2xl mx-auto">
            A coloring book is more than pages to fill — it’s a mirror for your inner world, reflecting your moods and inviting you to slow down, breathe, and create.
          </p>

           <ProductCarousel
            products={coloringProducts}
            onPreview={onPreview}
            CheckoutButton={CheckoutButton}
            showDots={false}
            onReady={setBookInst}
            onSlideChanged={setBookCurrent}
          />

          <div className="mb-16" />

          {/* BUNDLE PRODUCTS */}
          <h2 id="bundles" className="text-section-title text-center mb-6 scroll-mt-28">
            Our Bundle Options
          </h2>
          <p className="text-center text-[color:hsl(var(--muted-foreground))] mb-12 italic text-lg max-w-2xl mx-auto">
            Get more for less with our bundle options: curated sets that save you money and give you everything you need in one go.
          </p>

           <ProductCarousel
            products={bundles}
            onPreview={onPreview}
            CheckoutButton={CheckoutButton}
            showDots={false}
            onReady={setBundleInst}
            onSlideChanged={setBundleCurrent}
          />

          <div className="mb-16" />

          {/* FREE PRODUCTS */}
          <h2 id="free" className="text-section-title text-center mb-6 scroll-mt-28">
            Free Products
          </h2>
          <p className="text-center text-[color:hsl(var(--muted-foreground))] mb-12 italic text-lg max-w-2xl mx-auto">
            A small gift from us — free downloads to help you get started on your journey
            toward better habits, clarity, and growth.
          </p>

          <ProductCarousel
            products={freeProducts}
            onPreview={onPreview}
            CheckoutButton={CheckoutButton}
            showDots={false}
            onReady={setFreeInst}
            onSlideChanged={setFreeCurrent}
          />

          <div className="mb-16" />

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="mx-auto max-w-6xl px-6 pb-20">
        <div className="card-minimal p-8">
          <h2 className="text-section-title text-center">Gentle words from early users</h2>

          {(() => {
            const testimonials = [
              {
                quote:
                  "I absolutely love this mandala coloring book. The designs are gorgeous and detailed, and it helps me unwind at the end of the day. It feels like a little meditation session every time I sit down with it.",
                name: "Sarah",
              },
              {
                quote:
                  "This cheat sheet is so handy. Everything I need to reference is right there in front of me, clear and easy to follow. It makes learning astrology so much less overwhelming.",
                name: "Carlos",
              },
              {
                quote:
                  "I’ve been using the habit tracker for a few weeks now and it’s already made a difference. Seeing my progress on paper keeps me motivated and gives me that little push to stay consistent.",
                name: "Mira",
              },
            ];

            return (
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                {testimonials.map((t, i) => (
                  <figure
                    key={i}
                    className="rounded-2xl border border-[hsl(var(--border))] bg-white/70 p-6"
                  >
                    <blockquote className="text-[color:hsl(var(--muted-foreground))]">“{t.quote}”</blockquote>
                    {t.name && (
                      <figcaption className="mt-3 text-sm">— {t.name}</figcaption>
                    )}
                  </figure>
                ))}
              </div>
            );
          })()}
        </div>
    </section>

     {/* FAQ */}

     <section id="faq" className="mx-auto max-w-5xl px-6 pb-20">
       <h2 className="text-section-title text-center">FAQ</h2>

       <div className="mt-8 space-y-4">
         {[
           {
             q: "Do you offer free products?",
             a: (
               <>
                 Yes! We offer a selection of free downloads. You can explore them in the{" "}
                 <a href="#free" className="underline">
                   Free Products
                 </a>{" "}
                 section on this page.
               </>
             ),
           },
           {
             q: "Can I return a product or get a refund?",
             a: "Since our products are digital downloads, all sales are final. We do not offer returns, exchanges, or refunds once a product has been purchased and delivered. If you have trouble accessing your files, please contact us at bloom.clientscare@gmail.com and we will help you receive your purchase.",
           },
           {
             q: "When will I receive my files after purchase?",
             a: "You will be able to download your files immediately after completing your purchase.",
           },
           {
             q: "I didn’t receive my email or download link. What should I do?",
             a: "If you didn’t receive your download link, please contact us at bloom.clientscare@gmail.com and we will assist you.",
           },
           {
             q: "Do I need to create an account to buy a product?",
             a: "No. You can purchase and download our products without creating an account.",
           },
           {
             q: "Is this a physical product?",
             a: "All our products are digital downloads. No physical items will be shipped.",
           },
         ].map((item) => (
           <details key={item.q} className="card-soft p-5">
             <summary className="cursor-pointer text-card-title">
               {item.q}
             </summary>
             <p className="mt-2 text-[color:hsl(var(--muted-foreground))]">
               {item.a}
             </p>
           </details>
         ))}
       </div>
     </section>

      {/* ONE SHARED PREVIEW MODAL */}
      {previewProduct && (
        <ProductPreviewModal
          product={previewProduct}
          onClose={() => setPreviewProduct(null)}
        />
      )}
    </div>
  );
}
