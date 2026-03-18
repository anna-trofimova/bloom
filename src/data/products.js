// src/data/products.js

// ---------- PRODUCTS ----------

export const products = [

  // ASTROLOGY
  {
    id: "astr-1",
    category: "astrology",
    title: "ASTROLOGY CHEAT SHEET",
    price: "$21,99",
    originalPrice: "$26,99",
    description:
      "Unlock the mysteries of the stars with the Astrology Cheat Sheet! This handy guide breaks down everything you need to know about houses, planets, signs, and their powerful combinations.",
    image: "/images/book_1.png",
    images: [
      "/images/book_1.png",
      "/images/previews/astro-cheat-pr.png"
    ],
    priceId: "price_1T92QBF0CcRCK1mZq36XRyDQ"
  },

  {
    id: "astr-2",
    category: "astrology",
    title: "Mercury Retrograde Survival Guide",
    price: "$21,99",
    originalPrice: "$26,99",
    description:
      "Navigate the chaos of Mercury Retrograde with this practical guide packed with helpful dos and don'ts.",
    image: "/images/mercury_retrograde.png",
    priceId: "price_1TCQ6MF0CcRCK1mZCTSHtyQ5",
  },

  {
    id: "astr-3",
    category: "astrology",
    title: "Moon Phases Journal",
    price: "$16,99",
    originalPrice: "$21,99",
    description:
      "Track the lunar cycle and set intentions with this guided Moon Phases Journal.",
    image: "/images/moon_phase_cover.png",
    images: [
      "/images/moon_phase_cover.png",
      "/images/previews/moon-phase-pr.png"
    ],
    priceId: "price_1T92Q8F0CcRCK1mZkXYY4jr0"
  },

  // HABIT TRACKERS

  {
    id: "habit-1",
    category: "trackers",
    title: "Self-care Tracker with pictures",
    price: "$14,99",
    originalPrice: "$19,99",
    description:
      "A beautifully designed self-care tracker with inspiring images to help you stay consistent with wellness habits.",
    image: "/images/self-care-tracker-per-week.png",
    images: [
      "/images/self-care-tracker-per-week.png",
      "/images/previews/self-tracker-n-pr.png"
    ],
    priceId: "price_1T92Q8F0CcRCK1mZa7F3mqF7"
  },

  {
    id: "habit-2",
    category: "trackers",
    title: "Self-care Tracker Blank",
    price: "$11,99",
    originalPrice: "$16,99",
    description:
      "Minimalist blank self-care tracker that lets you fully customize your habits.",
    image: "/images/Self-Care-Tracker-Blank.png",
    images: [
      "/images/Self-Care-Tracker-Blank.png",
      "/images/previews/self-care-weel-blank-pr.png"
    ],
    priceId: "price_1T92QCF0CcRCK1mZL0XO7uxF"
  },

  {
    id: "habit-3",
    category: "trackers",
    title: "Self-care Tracker Editable",
    price: "$16,99",
    originalPrice: "$21,99",
    description:
      "Editable self-care tracker with graphs to visualize your progress.",
    image: "/images/Self-Care-Tracker-Editable.png",
    images: [
      "/images/Self-Care-Tracker-Editable.png",
      "/images/previews/self-care-week-pr.png"
    ],
    priceId: "price_1T92Q3F0CcRCK1mZYX1VjtpF"
  },

  {
    id: "habit-4",
    category: "trackers",
    title: "Tracker for SEPTEMBER",
    price: "$0",
    description: "Monthly productivity tracker for September.",
    image: "/images/month-tracker.png",
    priceId: null,
    fileKey: "trackers/SEPTEMBER-2025.pdf"
  },

  {
    id: "habit-5",
    category: "trackers",
    title: "Tracker for OCTOBER",
    price: "$0",
    description: "Monthly productivity tracker for October.",
    image: "/images/month-tracker.png",
    priceId: null,
    fileKey: "trackers/OCTOBER-2025.pdf"
  },

  {
    id: "habit-6",
    category: "trackers",
    title: "Tracker for NOVEMBER",
    price: "$0",
    description: "Monthly productivity tracker for November.",
    image: "/images/month-tracker.png",
    priceId: null,
    fileKey: "trackers/NOVEMBER-2025.pdf"
  },

  {
    id: "habit-7",
    category: "trackers",
    title: "Forget Your EX Guide",
    price: "$3",
    originalPrice: "$4,99",
    description:
      "A motivational habit tracker to help you move on and rebuild confidence.",
    image: "/images/forget-ex.png",
    images: [
      "/images/forget-ex.png",
      "/images/previews/forget-ex-pr.png"
    ],
    priceId: "price_1T92Q5F0CcRCK1mZasLDd2H3"
  },

  {
    id: "habit-8",
    category: "trackers",
    title: "Budget Planner",
    price: "$21,99",
    originalPrice: "$26,99",
    description:
      "Monthly budget planner to track spending categories and percentages.",
    image: "/images/budget-planner.pdf.png",
    images: [
      "/images/budget-planner.pdf.png",
      "/images/previews/budget-planer-pr.png"
    ],
    priceId: "price_1T92Q3F0CcRCK1mZNXyxoSX1"
  },

  {
    id: "habit-9",
    category: "trackers",
    title: "Travel Calculator",
    price: "$8,99",
    originalPrice: "$13,99",
    description:
      "Travel spending calculator that breaks down your trip costs by category.",
    image: "/images/travel-calculator.png",
    images: [
      "/images/travel-calculator.png",
      "/images/previews/travel-pr.png"
    ],
    priceId: "price_1T92Q3F0CcRCK1mZh2ZyyDx9"
  },

  // COLORING BOOKS

  {
    id: "book-1",
    category: "coloring",
    title: "Mandala Coloring Pages",
    price: "$11,99",
    originalPrice: "$16,99",
    description:
      "Relax and reduce stress with beautiful mandala coloring pages.",
    image: "/images/mandala.png",
    images: [
      "/images/mandala.png",
      "/images/previews/mandala-pr.png"
    ],
    priceId: "price_1T92Q3F0CcRCK1mZrBcJ6dxR"
  },

  {
    id: "book-2",
    category: "coloring",
    title: "Coloring Book 15 Animals",
    price: "$11,99",
    originalPrice: "$16,99",
    description:
      "Fun and relaxing coloring book featuring 15 unique animals.",
    image: "/images/animal_children.png",
    images: [
      "/images/animal_children.png",
      "/images/previews/animal-pr.png"
    ],
    priceId: "price_1T92Q3F0CcRCK1mZGhdPGXDf"
  },

  {
    id: "book-3",
    category: "coloring",
    title: "Build My Better Self",
    price: "$11,99",
    originalPrice: "$16,99",
    description:
      "Coloring book with affirmations to boost confidence and positivity.",
    image: "/images/my-better-self.png",
    images: [
      "/images/my-better-self.png",
      "/images/previews/my-better-self-pr.png"
    ],
    priceId: "price_1T92Q5F0CcRCK1mZWAw9CepN"
  }

];


// ---------- BUNDLES ----------

export const bundles = [

  {
    id: "bundle-1",
    category: "bundles",
    title: "Fall Bundle",
    price: "$4,99",
    originalPrice: "$9,99",
    description:
      "September–November monthly trackers bundle.",
    image: "/images/month-tracker.png",
    images: [
      "/images/september-2025.png",
      "/images/october-2025.png",
      "/images/november-2025.png"
    ],
    priceId: "price_1T92Q7F0CcRCK1mZ8mU1Ye3A"
  },

  {
    id: "bundle-2",
    category: "bundles",
    title: "Astrology Professional",
    price: "$29,99",
    originalPrice: "$34,99",
    description:
      "Astrology bundle including cheat sheet, retrograde guide and moon journal.",
    image: "/images/previews/bundle-astro-pr.png",
    priceId: "price_1T92Q3F0CcRCK1mZHa7TJRyT"
  },

  {
    id: "bundle-3",
    category: "bundles",
    title: "Spendings Professional",
    price: "$24,99",
    originalPrice: "$29,99",
    description:
      "Budget planner + travel calculator bundle.",
    image: "/images/previews/bundle-travel-pr.png",
    priceId: "price_1T92Q5F0CcRCK1mZaAR7Fd6F"
  }

];


// ---------- AUTO GENERATED COLLECTIONS ----------

export const allProducts = [...products, ...bundles];

export const astrologyProducts = products.filter(p => p.category === "astrology");

export const trackerProducts = products.filter(p => p.category === "trackers");

export const coloringProducts = products.filter(p => p.category === "coloring");

export const freeProducts = products.filter(p => !p.priceId && p.fileKey);