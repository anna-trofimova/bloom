// src/pages/LandingPage.jsx
import { useState } from "react";
import ProductsMenu from "./components/ProductsMenu";
import CheckoutButton from "./components/CheckoutButton";
import SliderDots from "./components/SliderDots";
import ProductCarousel from "./components/ProductCarousel";
import ProductCard from "./components/ProductCard";
import ProductPreviewModal from "./components/ProductPreviewModal";

import logo from "./assets/logo_bloom.png";

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

  // --- DATA ---------------------------------------------------------
  const astr_products = [
    {
      id: "astr-1",
      title: "ASTROLOGY CHEAT SHEET",
      price: "$21,99",
      description:
        "Unlock the mysteries of the stars with the Astrology Cheat Sheet! This handy guide breaks down everything you need to know about houses, planets, signs, and their powerful combinations. Perfect for beginners and enthusiasts alike, it makes reading charts simple, clear, and fun—helping you understand yourself and others on a whole new level.",
      image: "/images/book_1.png",
      images: [
        "/images/book_1.png",
        "/images/previews/astro-cheat-pr.png",
      ],
      originalPrice: "$26,99", 
      priceId: "price_1S3zGOF4PC9m1AqKRFDkTE8z",
    },
    {
      id: "astr-2",
      title: "Mercury Retrograde Survival Guide",
      price: "$0",
      description:
        "Navigate the chaos of Mercury Retrograde with the Mercury Retrograde Survival Guide! Packed with practical dos and don’ts, this guide helps you avoid communication mishaps, travel hiccups, and tech troubles. Easy to follow and full of helpful tips, it’s your go-to companion for staying calm, prepared, and in control when the stars throw a curveball.",
      image: "/images/mercury_retrograde.png",
      priceId: null,          
      fileKey: "astrology/mercury-retrograde-survival-guide.pdf",
    },
    {
      id: "astr-3",
      title: "Moon Phases Journal",
      price: "$16,99",
      description: "Connect with the natural rhythm of the moon with the Moon Phases Journal. Track each phase, reflect on your intentions, and set goals in harmony with the lunar cycle. With prompts for self-discovery and mindful planning, it’s the perfect companion for anyone looking to align their life with the moon’s energy and cultivate a deeper sense of balance.",
      image: "/images/moon_phase_cover.png",
      images: [
        "/images/moon_phase_cover.png",
        "/images/previews/moon-phase-pr.png",
      ],
      originalPrice: "$21,99", 
      priceId: "price_1S3zNmF4PC9m1AqKSlB1PZOo",
    }
  ];

  const habit_products = [
    {
      id: "habit-1",
      title: "Self-care Tracker with pictures",
      price: "$14,99",
      description:
        "Elevate your self-care routine with our beautifully designed digital self-care tracker featuring inspiring images. This weekly planner spans the entire year, helping you stay mindful and motivated as you track your wellness habits. Each week includes visual prompts to encourage reflection and positivity, making your self-care journey both structured and uplifting. Perfect for those who appreciate a visually engaging way to nurture their well-being.",
      image: "/images/self-care-tracker-per-week.png",
      images: [
        "/images/self-care-tracker-per-week.png",
        "/images/previews/self-care-week-pr.png",
      ],
      originalPrice: "$19,99", 
      priceId: "price_1S41DfF4PC9m1AqKkEW1k67W",
    },
    { id: "habit-2", 
      title: "Self-care Tracker Blank", 
      price: "$11,99", 
      description: "Take full control of your self-care routine with our minimalist blank digital tracker. This weekly planner covers the whole year and offers the flexibility to personalize your tracking without distractions. Ideal for users who prefer a clean slate to customize their wellness goals and habits according to their unique needs. Stay organized and consistent while crafting your own path to better self-care.", 
      image: "/images/self-care-tracker-per-week.png",
      images: [
        "/images/self-care-tracker-per-week.png",
        "/images/previews/self-care-weel-blank-pr.png",
      ],
      originalPrice: "$16,99", 
      priceId: "price_1S41FBF4PC9m1AqKyZwPU1DY",
    },
    { id: "habit-3", 
      title: "Tracker for SEPTEMBER", 
      price: "$0", 
      description: "Stay on top of your month with this simple, stylish Monthly Tracker — your all-in-one calendar to keep life organized and stress-free. Whether it’s appointments, goals, events, or daily to-dos, you’ll have everything laid out clearly in one place. Perfect for staying focused, boosting productivity, and making sure nothing slips through the cracks. Think of it as your month-at-a-glance best friend!", 
      image: "/images/month-tracker.png",
      priceId: null,
      fileKey: "trackers/SEPTEMBER-2025.pdf",
     },
     { id: "habit-4", 
      title: "Tracker for OCTOBER", 
      price: "$0", 
      description: "Stay on top of your month with this simple, stylish Monthly Tracker — your all-in-one calendar to keep life organized and stress-free. Whether it’s appointments, goals, events, or daily to-dos, you’ll have everything laid out clearly in one place. Perfect for staying focused, boosting productivity, and making sure nothing slips through the cracks. Think of it as your month-at-a-glance best friend!", 
      image: "/images/month-tracker.png",
      priceId: null,
      fileKey: "trackers/OCTOBER-2025.pdf",
     },
     { id: "habit-5", 
      title: "Tracker for NOVEMBER", 
      price: "$0", 
      description: "Stay on top of your month with this simple, stylish Monthly Tracker — your all-in-one calendar to keep life organized and stress-free. Whether it’s appointments, goals, events, or daily to-dos, you’ll have everything laid out clearly in one place. Perfect for staying focused, boosting productivity, and making sure nothing slips through the cracks. Think of it as your month-at-a-glance best friend!", 
      image: "/images/month-tracker.png",
      priceId: null,
      fileKey: "trackers/NOVEMBER-2025.pdf",
     },
    { id: "habit-6", 
      title: "Forget Your EX Guide", 
      price: "$3", 
      description: "Spark ideas and self-reflection.", 
      image: "/images/forget-ex.png",
      images: [
        "/images/forget-ex.png",
        "/images/previews/forget-ex-pr.png",
      ],
      originalPrice: "$4,99", 
      priceId: "price_1S41GdF4PC9m1AqKcfj77DDG",
    },
  ];

  const book_products = [
    {
      id: "book-1",
      title: "Mandala Coloring Pages",
      price: "$11,99",
      description: "Relax, focus, and let your creativity flow with Mandala Coloring Pages. Each intricate design is crafted to help you unwind, reduce stress, and enjoy a moment of mindful calm. Perfect for both beginners and experienced colorists, these pages invite you to add your own colors and create beautiful, meditative art you’ll love.",
      image: "/images/mandala.png",
      images: [
        "/images/mandala.png",
        "/images/previews/mandala-pr.png",
      ],
      originalPrice: "$16,99", 
      priceId: "price_1S42etF4PC9m1AqKkSbbroHS",
    },
    {
      id: "book-2",
      title: "Coloring Book 15 Animals",
      price: "$11,99",
      description: "Unwind and get creative with the *Coloring Book: 15 Animals*! Featuring a collection of adorable and unique animal designs, this book is perfect for both kids and adults who love to color. From playful to majestic creatures, each page gives you the chance to relax, have fun, and bring these animals to life with your own colors. A simple, calming, and joyful way to spark creativity anytime!",
      image: "/images/animal_children.png",
      images: [
        "/images/animal_children.png",
        "/images/previews/animal-pr.png",
      ],
      originalPrice: "$16,99", 
      priceId: "price_1S42gfF4PC9m1AqKgF6qOCm2",
    },
    {
      id: "book-3",
      title: "Build My Better Self",
      price: "11,99",
      description: "Build My Better Self is a unique coloring book that combines creativity with positivity. Each page features inspiring affirmations alongside beautiful designs, giving you a fun and relaxing way to boost your mood, build confidence, and reinforce healthy habits. Color, reflect, and let each affirmation guide you toward your best self—one vibrant page at a time!",
      image: "/images/my-better-self.png",
      images: [
        "/images/my-better-self.png",
        "/images/previews/my-better-self-pr.png",
      ],
      originalPrice: "$16,99", 
      priceId: "price_1S42iEF4PC9m1AqKvgborLIO",
    },
  ];

  // BUNDLE

    const bundle_products = [
    {
      id: "bundle-1",
      title: "Fall Bundle",
      price: "$4,99",
      description: "Get ready to breeze through the season with our Fall Monthly Tracker Bundle — three beautifully designed calendars to help you stay organized from September through November. Keep track of goals, events, and daily to-dos while enjoying a fresh start each month. It’s the perfect way to stay productive, stress-free, and fully present all season long!",
      image: "/images/month-tracker.png",
      images: [
        "/images/september-2025.png",
        "/images/october-2025.png",
        "/images/november-2025.png"
      ],
      originalPrice: "$9,99", 
      priceId: "price_1S42zEF4PC9m1AqKvdlh8tiU",
    },
    {
      id: "bundle-2",
      title: "Astrology Professional",
      price: "$29,99",
      description: "The Astrology Professional Bundle brings together three powerful tools to deepen your cosmic journey: the Astrology Cheat Sheet to decode houses, planets, signs, and combinations; the Mercury Retrograde Survival Guide with practical dos and don’ts for smooth sailing during tricky planetary periods; and the Moon Phases Journal to track the lunar cycle, set intentions, and reflect mindfully. Perfect for beginners and enthusiasts alike, this bundle gives you everything you need to understand the stars, navigate their influence, and align your life with cosmic energy.",
      image: "/images/previews/bundle-astro-pr.png",
      originalPrice: "$34,99", 
      priceId: "price_1S447sF4PC9m1AqKzdCWDGQM",
    },
  ];

  // --- RENDER -------------------------------------------------------
  return (
    <div className="min-h-screen bg-[var(--background)] text-[color:hsl(var(--foreground))]">
      {/* NAV + HERO */}
      <header className="relative z-[200] overflow-visible isolate">
        <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="h-12 w-12 flex items-center justify-center">
            <img src={logo} alt="Bloom Logo" className="h-16 w-auto" />
          </div>
          <div className="hidden gap-6 md:flex">
            <a className="btn-ghost focus-ring" href="#features">Features</a>
            <ProductsMenu />
            <a className="btn-ghost focus-ring" href="#testimonials">Stories</a>
            <a className="btn-ghost focus-ring" href="#faq">FAQ</a>
          </div>
          <div className="flex gap-2">
            <a className="btn-secondary focus-ring" href="#tools">Get started</a>
          </div>
        </nav>

        <section className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-2">
          <div>
            <h1 className="text-hero mb-6">Grab It – </h1>
            <h1 className="text-hero mb-6">No Cost, Just Magic</h1>
            <p className="text-body-large text-[color:hsl(var(--muted-foreground))] mb-8">
              Build gentle routines for sleep, stress and focus. Thoughtful reminders, science-backed tips, and a calm space that’s yours.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Thanks! We'll be in touch at ${email}.`);
              }}
              className="flex w-full max-w-lg items-center gap-3"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="focus-ring h-12 flex-1 rounded-2xl border border-[hsl(var(--border))] bg-white/70 px-4 backdrop-blur-sm placeholder:text-[color:hsl(var(--muted-foreground))]"
              />
              <button className="btn-primary focus-ring h-12" type="submit">
                Join Bloom Community
              </button>
            </form>
            <p className="mt-3 text-sm text-[color:hsl(var(--muted-foreground))]">No spam. Unsubscribe anytime.</p>
          </div>

          <div>
            <div className="card-minimal p-4">
              <div className="card-soft p-4">
                <div className="grid grid-cols-2 gap-4">
                  {["Sleep", "Focus", "Mood", "Energy"].map((k) => (
                    <div key={k} className="rounded-2xl border border-[hsl(var(--border))] bg-white/70 p-6 text-center">
                      <p className="text-card-title mb-2">{k}</p>
                      <p className="text-sm text-[color:hsl(var(--muted-foreground))]">Tiny habit · 5 min</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-2xl border border-[hsl(var(--border))] bg-white/80 p-5">
                  <p className="text-card-title">Today’s gentle nudge</p>
                  <p className="mt-1 text-sm text-[color:hsl(var(--muted-foreground))]">
                    Step outside for 3 minutes of daylight to reset your rhythm.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </header>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-section-title text-center">What makes it soothing?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-[color:hsl(var(--muted-foreground))]">
          Designed with calm defaults. Gentle animations, soft colors, and just the right amount of guidance.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { title: "Kind reminders", copy: "Flexible nudges that respect your schedule." },
            { title: "Daily micro-rituals", copy: "Tiny steps that compound into big change." },
            { title: "Progress you can feel", copy: "Simple streaks and reflections—no pressure." },
          ].map((f) => (
            <div key={f.title} className="card-soft p-6">
              <h3 className="text-card-title">{f.title}</h3>
              <p className="mt-2 text-[color:hsl(var(--muted-foreground))]">{f.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SHOP SECTIONS */}
      <section id="tools" className="bg-[hsl(var(--background))] py-20">
        <div className="mx-auto max-w-6xl px-6">
          {/* ASTROLOGY */}
          <h2 id="astrology" className="text-section-title text-center mb-6 scroll-mt-28">
            Astrology Guides & Tools
          </h2>
          <p className="text-center text-[color:hsl(var(--muted-foreground))] mb-12">
            Astrology doesn’t tell you who you are — it’s a mirror that reflects patterns, inviting you to notice what’s already moving within you and the world around you.
          </p>

          <ProductCarousel
            products={astr_products}
            onPreview={onPreview}
            CheckoutButton={CheckoutButton}
            showDots={false}
            onReady={setAstrInst}
            onSlideChanged={setAstrCurrent}
          />
          <SliderDots products={astr_products} currentSlide={astrCurrent} instanceRef={astrInst} />

          {/* HABIT TRACKERS */}
          <h2 id="trackers" className="text-section-title text-center mb-6 scroll-mt-28">
            Habit Trackers
          </h2>
          <p className="text-center text-[color:hsl(var(--muted-foreground))] mb-12">
           A habit tracker doesn’t make you disciplined — it’s a mirror that shows the patterns of your days, inviting you to notice what’s 
           already shaping your life and where you want to grow.
          </p>

          <ProductCarousel
            products={habit_products}
            onPreview={onPreview}
            CheckoutButton={CheckoutButton}   
            showDots={false}
            onReady={setHabitInst}
            onSlideChanged={setHabitCurrent}
          />
          <SliderDots products={habit_products} currentSlide={habitCurrent} instanceRef={habitInst} />

          {/* COLORING BOOKS */}
          <h2 id="coloring" className="text-section-title text-center mb-6 scroll-mt-28">
            Coloring Books
          </h2>
          <p className="text-center text-[color:hsl(var(--muted-foreground))] mb-12">
            A coloring book is more than pages to fill — it’s a mirror for your inner world, reflecting your moods and inviting you to slow down, breathe, and create.
          </p>

           <ProductCarousel
            products={book_products}
            onPreview={onPreview}
            CheckoutButton={CheckoutButton}
            showDots={false}
            onReady={setBookInst}
            onSlideChanged={setBookCurrent}
          />
          <SliderDots products={book_products} currentSlide={bookCurrent} instanceRef={bookInst} />

          {/* BUNDLE PRODUCTS */}
          <h2 id="bundles" className="text-section-title text-center mb-6 scroll-mt-28">
            Our Bundle Options
          </h2>
          <p className="text-center text-[color:hsl(var(--muted-foreground))] mb-12">
            Get more for less with our bundle options: curated sets that save you money and give you everything you need in one go.
          </p>

           <ProductCarousel
            products={bundle_products}
            onPreview={onPreview}
            CheckoutButton={CheckoutButton}
            showDots={false}
            onReady={setBundleInst}
            onSlideChanged={setBundleCurrent}
          />
          <SliderDots products={bundle_products} currentSlide={bundleCurrent} instanceRef={bundleInst} />

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
          { q: "Is there a free plan?", a: "Yes! You can download our free products: core habits, reflections, and reminders are free." },
          { q: "How do I receive my product?", a: "After you buy a product, you'll see a download option on the success page to open your files." },
        ].map((item) => (
          <details key={item.q} className="card-soft p-5">
            <summary className="cursor-pointer text-card-title">{item.q}</summary>
            <p className="mt-2 text-[color:hsl(var(--muted-foreground))]">{item.a}</p>
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
