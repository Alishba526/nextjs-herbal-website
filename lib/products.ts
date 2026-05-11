"use client";

export type TierPrice = { min: number; max?: number; price: number };
export type Variation = { label: string; options: string[] };
export type Customization = {
  samplePrice?: number;
  options?: { label: string; minOrder: number }[];
  abilities?: string[];
  shippingNote?: string;
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string;
  images?: string[];
  rating: number;
  reviews: number;
  stock: number;
  badge?: "Sale" | "New" | "Hot" | "Limited";
  benefits: string[];
  ingredients: string[];
  usage: string;
  tierPricing?: TierPrice[];
  variations?: Variation[];
  customization?: Customization;
  currency?: "USD";
};

export const currencySymbol = (_c?: "USD") => "$";
export const formatPrice = (n: number) => `$${n.toFixed(2)}`;

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "100", slug: "meidu-black-hair-dye-shampoo",
    title: "MEIDU Black Hair Dye Shampoo 3-in-1 (500 mL)",
    category: "Hair Care",
    description: "MEIDU 3-in-1 Black Hair Dye Shampoo — colors gray hair naturally in just 5 minutes. Infused with Ginseng, Black Sesame, Ganoderma & Fo-ti herbal extracts for shine, moisturizing care and healthy hair.",
    price: 16.99, oldPrice: 22.99,
    image: "/assets/hairdye-a.png", images: ["/assets/hairdye-a.png", "/assets/hairdye-b.png"],
    rating: 4.8, reviews: 326, stock: 500, badge: "Hot", currency: "USD",
    benefits: ["Perfect grey coverage", "Colors in just 5 minutes", "3-in-1: Shine + Moisturize + Heal", "Long lasting up to 30 days", "No mixing required", "Pleasant herbal scent"],
    ingredients: ["Ginseng Extract", "Black Sesame Extract", "Ganoderma Lucidum Extract", "Saponin Extract", "Fo-ti Extract"],
    usage: "Step 1: Wash hair with shampoo. Step 2: Apply with gloves and wait 5 minutes. Step 3: Rinse with water.",
    variations: [
      { label: "Weight", options: ["500 mL"] },
      { label: "Color", options: ["Black", "Dark Brown", "Coffee", "Chestnut Brown", "Wine Red"] },
    ],
  },
  {
    id: "101", slug: "augeas-keratin-hair-mask",
    title: "Augeas Keratin Hair Mask — Damaged & Dry Hair Repair (1000 mL)",
    category: "Hair Care",
    description: "Professional Keratin Hair Mask enriched with Brazilian Keratin & Oil Complex. Deeply nourishes damaged hair, repairs frizz, and restores smooth shiny salon-quality results.",
    price: 17.99, oldPrice: 24.99,
    image: "/assets/keratin-a.png", images: ["/assets/keratin-a.png", "/assets/keratin-b.png", "/assets/keratin-c.png", "/assets/keratin-d.png"],
    rating: 4.9, reviews: 412, stock: 1200, badge: "New", currency: "USD",
    benefits: ["Deeply nourishes damaged hair", "+128% smoother", "+200% shinier hair", "2x repair power", "Strengthens hair elasticity", "24h lasting fragrance"],
    ingredients: ["Brazilian Keratin", "Moroccan Argan Oil", "Collagen Complex", "Vitamin E", "Hydrolyzed Protein"],
    usage: "After shampoo, apply generously to damp hair. Leave on for 5–10 minutes. Rinse thoroughly. Use 2–3 times per week.",
    variations: [
      { label: "Weight", options: ["1000 mL", "500 mL", "250 mL"] },
    ],
  },
  {
    id: "102", slug: "jiessia-avocado-hair-shampoo",
    title: "JIESSIA Avocado Oil Care Hair Shampoo (1000 mL)",
    category: "Hair Care",
    description: "Moisturizing & Refreshing Avocado Oil Shampoo with Collagen. Helps restore hair's optimum moisture balance for healthy sleek looks. Repairs damaged hair and wakes up hair vitality.",
    price: 20.99, oldPrice: 27.99,
    image: "/assets/avocado-a.png", images: ["/assets/avocado-a.png", "/assets/avocado-b.png", "/assets/avocado-c.png", "/assets/avocado-d.png"],
    rating: 4.8, reviews: 207, stock: 800, badge: "Sale", currency: "USD",
    benefits: ["Deep clean & dandruff free", "Refreshing scalp care", "+138% smoother hair", "+200% shinier hair", "Collagen & avocado oil enriched", "24h lasting fragrance"],
    ingredients: ["Avocado Oil", "Collagen", "Stearyl Alcohol", "Cyclopentasiloxane", "Hydroxyethylcellulose"],
    usage: "Wet hair, apply shampoo evenly, massage gently, then rinse with warm water. Use 2-3 times per week.",
    variations: [
      { label: "Volume", options: ["1000 mL"] },
      { label: "Function", options: ["Moisturizing", "Nourishing", "Damage Repair"] },
    ],
  },
  {
    id: "103", slug: "growzix-black-gourmet-instant-coffee",
    title: "Growzix Black — Gourmet Instant Coffee (350 g / 11.64 oz)",
    category: "Coffee",
    description: "Growzix Black Gourmet Instant Coffee is a premium dietary supplement coffee blend, infused with the powerful goodness of Ganoderma (Reishi mushroom), Collagen Type I & III, Biotin and Hyaluronic Acid. Each rich, smooth cup delivers the bold aroma and full body of a gourmet roast while supporting your skin elasticity, hair strength, healthy nails, immunity and natural energy throughout the day. Hand-crafted from carefully selected coffee beans and slow-dried for instant freshness — just add hot water for a velvety café-style experience at home or on the go. Caffeine-balanced, low acidity and 100% free from artificial flavors, colors or preservatives. Perfect for daily wellness, beauty-from-within routines, weight management support and post-workout recovery. Net Wt. 11.64 oz (350 g) resealable pouch keeps every scoop fresh.",
    price: 25.99, oldPrice: 34.99,
    image: "/assets/coffee-a.png", images: ["/assets/coffee-a.png", "/assets/coffee-b.png"],
    rating: 4.9, reviews: 158, stock: 600, badge: "New", currency: "USD",
    benefits: [
      "Infused with Ganoderma (Reishi) for immunity & vitality",
      "Collagen I & III for glowing skin and stronger hair",
      "Biotin & Hyaluronic Acid for beauty from within",
      "Smooth gourmet roast — rich aroma, low acidity",
      "Boosts natural energy & focus without the jitters",
      "Supports weight management & healthy metabolism",
      "100% natural — no artificial flavors or preservatives",
    ],
    ingredients: ["Premium Instant Coffee", "Ganoderma Lucidum (Reishi)", "Hydrolyzed Collagen Type I & III", "Biotin", "Hyaluronic Acid"],
    usage: "Add 1 teaspoon (about 2 g) of Growzix Black to a cup of hot water (180–200 ml). Stir well. Enjoy 1–2 cups daily — best in the morning or before workouts. Can be served black, with milk, or iced.",
    variations: [
      { label: "Pack", options: ["Pouch 350 g", "Single Sachet"] },
    ],
  },
];

export const DEFAULT_CATEGORIES = [
  { name: "Hair Care", image: "/assets/cat-hair.jpg", count: 3 },
  { name: "Coffee", image: "/assets/coffee-a.png", count: 1 },
];

// ---- Dynamic store (localStorage backed, editable from admin) ----
const PROD_KEY = "growzix-products-v1";
const CAT_KEY = "growzix-categories-v1";

const loadProducts = (): Product[] => {
  if (typeof window === "undefined") return DEFAULT_PRODUCTS;
  try {
    const raw = localStorage.getItem(PROD_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return DEFAULT_PRODUCTS;
};
const loadCategories = () => {
  if (typeof window === "undefined") return DEFAULT_CATEGORIES;
  try {
    const raw = localStorage.getItem(CAT_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return DEFAULT_CATEGORIES;
};

export let PRODUCTS: Product[] = loadProducts();
export let CATEGORY_LIST = loadCategories();
export const CATEGORIES = CATEGORY_LIST;

export const saveProducts = (list: Product[]) => {
  PRODUCTS = list;
  if (typeof window !== "undefined") localStorage.setItem(PROD_KEY, JSON.stringify(list));
  window.dispatchEvent(new Event("growzix-data-update"));
};
export const saveCategories = (list: typeof DEFAULT_CATEGORIES) => {
  CATEGORY_LIST = list;
  if (typeof window !== "undefined") localStorage.setItem(CAT_KEY, JSON.stringify(list));
  window.dispatchEvent(new Event("growzix-data-update"));
};

export const getProduct = (slug: string) => PRODUCTS.find(p => p.slug === slug);
