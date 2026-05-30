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

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "100", slug: "meidu-black-hair-dye-shampoo",
    title: "MEIDU Black Hair Dye Shampoo 3-in-1 (500 mL)",
    category: "Hair Care",
    description: "MEIDU 3-in-1 Black Hair Dye Shampoo — colors gray hair naturally in just 5 minutes. This revolutionary formula acts as a natural black hair oil that makes hair black naturally. Infused with Ginseng, Black Sesame, Ganoderma & Fo-ti herbal extracts for shine, moisturizing care and healthy hair.",
    price: 18.99, oldPrice: 24.99,
    image: "/assets/hairdye-a.png", images: ["/assets/hairdye-a.png", "/assets/hairdye-b.png"],
    rating: 4.8, reviews: 326, stock: 500, badge: "Hot", currency: "USD",
    benefits: ["Perfect grey coverage", "Colors in just 5 minutes", "3-in-1: Shine + Moisturize + Heal", "Natural black hair oil benefits", "Long lasting up to 30 days", "No mixing required", "Pleasant herbal scent"],
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
    description: "Professional Keratin Hair Mask enriched with Brazilian Keratin & Oil Complex. As one of the best natural oils for hair growth, it deeply nourishes damaged hair, repairs frizz, and restores smooth shiny salon-quality results. Perfect for those seeking a natural hair oil for growth.",
    price: 22.99, oldPrice: 29.99,
    image: "/assets/keratin-a.png", images: ["/assets/keratin-a.png", "/assets/keratin-b.png", "/assets/keratin-c.png", "/assets/keratin-d.png"],
    rating: 4.9, reviews: 412, stock: 1200, badge: "New", currency: "USD",
    benefits: ["Deeply nourishes damaged hair", "Natural hair oil for growth", "+128% smoother", "+200% shinier hair", "2x repair power", "Strengthens hair elasticity", "24h lasting fragrance"],
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
    description: "Moisturizing & Refreshing Avocado Oil Shampoo with Collagen. Harnessing essential oils for natural hair growth, it helps restore hair's optimum moisture balance for healthy sleek looks. This avocado oil for natural black hair repairs damaged hair and wakes up hair vitality.",
    price: 29.99, oldPrice: 39.99,
    image: "/assets/avocado-a.png", images: ["/assets/avocado-a.png", "/assets/avocado-b.png", "/assets/avocado-c.png", "/assets/avocado-d.png"],
    rating: 4.8, reviews: 207, stock: 800, badge: "Sale", currency: "USD",
    benefits: ["Deep clean & dandruff free", "Essential oils for natural hair growth", "Refreshing scalp care", "+138% smoother hair", "+200% shinier hair", "Collagen & avocado oil enriched", "24h lasting fragrance"],
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
    image: "/assets/black coffee.jpeg", images: ["/assets/black coffee.jpeg", "/assets/coffee-b.png"],
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
  {
    id: "104", slug: "woodys-3-n-1-shampoo-conditioner-body-wash",
    title: "3-N-1 Shampoo Conditioner Body Wash (32 fl oz)",
    category: "Shampoo",
    description: "Total Confidence Wash: Using boatloads of grooming products is just not your thing. We know! That's why we got everything you need in this total hair and body package. This bad boy does it all, saving you time and effort. Keeps you looking fresh and feeling fly without the hassle!",
    price: 24.29, oldPrice: 26.99,
    image: "/assets/body1.png", images: ["/assets/body1.png", "/assets/body2.png"],
    rating: 5.0, reviews: 109, stock: 500, badge: "Sale", currency: "USD",
    benefits: [
      "3-in-1: Shampoo, Conditioner, and Body Wash",
      "Infused with Sea Kelp and Aloe Vera",
      "Paraben and Sulfate-free",
      "Massive 32 fl oz advantage for long-lasting use",
      "Instant everyday freshness from head to toe",
    ],
    ingredients: ["Sea Kelp", "Brown Algae", "Cucumber Fruit Extract", "Aloe Vera"],
    usage: "Apply all over, scrub and massage, then rinse to feel that burst of freshness. Perfect for daily use.",
    variations: [
      { label: "Volume", options: ["32 fl oz"] },
    ],
  },
  {
    id: "105", slug: "woodys-shave-relief-balm",
    title: "Woody's Shave Relief Balm (6 fl oz)",
    category: "Mens Grooming",
    description: "Cool Aftershave Experience: Our Woody's Shave Relief Balm is the post-shave power-up you've been looking for. Halt razor burns, redness, and discomfort. A soothing, refreshing experience that puts you over the top. Packed with Horse Chestnut Extract, Aloe Leaf Juice, Vitamin E, and other skin-enhancing elements. Woody's Shave Relief Balm restores moisture balance and kicks razor irritation to the curb. Lightweight, non-greasy, and absorbs like a champ.",
    price: 9.89, oldPrice: 10.99,
    image: "/assets/b3.webp", images: ["/assets/b3.webp", "/assets/b4.webp", "/assets/b5.jpg"],
    rating: 4.9, reviews: 97, stock: 450, badge: "Sale", currency: "USD",
    benefits: [
      "Halts razor burns and redness",
      "Restores skin moisture balance",
      "Infused with Aloe, Vitamin E & Horse Chestnut",
      "Lightweight and non-greasy formula",
      "Fast absorbing for instant comfort",
    ],
    ingredients: ["Horse Chestnut Extract", "Aloe Leaf Juice", "Vitamin E", "Skin-enhancing botanicals"],
    usage: "Apply a small amount to the palms and distribute evenly over face and neck after shaving. Perfect for daily use or after gym.",
    variations: [
      { label: "Volume", options: ["6 fl oz"] },
    ],
  },
  {
    id: "106", slug: "woodys-aftershave-comfort",
    title: "Woody's Aftershave Comfort (5 fl oz)",
    category: "Mens Grooming",
    description: "Aftershave Excellence: Revolutionize your post-shave routine with Woody's Aftershave Comfort. No more dryness, irritation, and wasted time. Restore your skin's mojo, keeping it cool, calm, and fresh! Packed with powerful natural ingredients like Chamomile, Calendula, and Shea Butter. Lightning fast skin refresher that rolls with you on your adventures. Comes in a super handy 5 fl oz tube.",
    price: 8.99, oldPrice: 9.99,
    image: "/assets/b5.webp", images: ["/assets/b5.webp", "/assets/b6.webp"],
    rating: 5.0, reviews: 1, stock: 300, badge: "Sale", currency: "USD",
    benefits: [
      "Revolutionary post-shave routine",
      "Ends dryness and irritation",
      "Infused with Chamomile, Calendula & Shea Butter",
      "Lightning fast skin refresher",
      "Handy travel-friendly 5 fl oz size",
    ],
    ingredients: ["Chamomile", "Calendula", "Shea Butter", "Natural essences"],
    usage: "Apply directly to face and neck after shaving for instant cooling and comfort. Absorbs quickly without grease.",
    variations: [
      { label: "Volume", options: ["5 fl oz"] },
    ],
  },
  {
    id: "107", slug: "woodys-shave-lather",
    title: "Woody's Shave Lather (6 fl oz)",
    category: "Mens Grooming",
    description: "Lather Brilliance: Get ready for a shaving experience like no other with our Woody's Shave Lather! This radical new shave technology brings you a rich and luxurious foam that transforms into a self-lathering cream. Crafted with expert care, combining natural ingredients with cutting-edge technology to soothe your skin and create the perfect canvas for the ultimate shave. Effortless and precise glide for a comfortable routine.",
    price: 9.89, oldPrice: 10.99,
    image: "/assets/b7.webp", images: ["/assets/b7.webp", "/assets/b8.webp"],
    rating: 5.0, reviews: 1, stock: 0, badge: "Limited", currency: "USD",
    benefits: [
      "Radical self-lathering technology",
      "Transforms from foam to rich cream",
      "Soothes skin for the ultimate shave",
      "Effortless glide and bold coverage",
      "Invigorating macho scent",
    ],
    ingredients: ["Natural Extracts", "Boosting Essences", "Smooth Glide Formula"],
    usage: "Apply a small amount to palms, work into a lather on damp skin, shave, and rinse. A little goes a long way.",
    variations: [
      { label: "Volume", options: ["6 fl oz"] },
    ],
  },
  {
    id: "108", slug: "woodys-beard-balm",
    title: "Woody's Beard Balm (2 oz)",
    category: "Mens Grooming",
    description: "Beard Balm Secret: It's time to take control and unleash your beard's true potential with our Woody's Beard Balm. The ultimate grooming companion! No more dryness, frizz and stiff pastes. Just a healthy shine and impeccable control. Crafted with a unique blend of coconut oil and beneficial essences for maximum nourishment. Invigorating fresh cooling grapefruit scent keeps you refined in minutes.",
    price: 8.99, oldPrice: 9.99,
    image: "/assets/b9.webp", 
    images: [
      "/assets/b9.webp", "/assets/b10.webp", "/assets/b11.webp", "/assets/b12.webp", 
      "/assets/b13.webp", "/assets/b14.webp", "/assets/b15.webp", "/assets/b16.webp", 
      "/assets/b17.webp", "/assets/b18.webp"
    ],
    rating: 4.4, reviews: 40, stock: 250, badge: "Hot", currency: "USD",
    benefits: [
      "Healthy shine and impeccable control",
      "Eliminates dryness and frizz",
      "Infused with Coconut Oil for deep nourishment",
      "Lightweight creamy texture for full coverage",
      "Fresh cooling grapefruit scent",
    ],
    ingredients: ["Coconut Oil", "Essential Essences", "Natural Extracts", "Grapefruit Scent"],
    usage: "Take a small amount, rub between palms, and apply evenly through beard. Style as desired. Handy 2 oz tub is perfect for on-the-go.",
    variations: [
      { label: "Weight", options: ["2 oz"] },
    ],
  },
  {
    id: "109", slug: "woodys-beard-wash",
    title: "Woody's Energizing Beard Wash (6.5 fl oz)",
    category: "Mens Grooming",
    description: "Energizing Beard Wash: Tired of a dull and tired beard that doesn't match your energy? Here's our Woody's Energizing Beard Beard Wash, your ultimate solution to cleansing and conditioning your facial hair like never before. No more wiry beards and parched skin. Get a brand new confidence with every wash and shower! Woody's Beard Wash is packed with a carefully selected lineup of powerhouse ingredients! We've harnessed the goodness of Vitamin B5, and Aloe Vera to nourish your beard from the root to the tip. Gives you a healthy shine and fresh feel right off the bat. A generous 6.5 fl oz of premium-grade wash ready to become your best friend! Gives you a refreshing grapefruit sensation that lingers.",
    price: 8.99, oldPrice: 9.99,
    image: "/assets/b19.webp", images: ["/assets/b19.webp", "/assets/b20.webp"],
    rating: 4.79, reviews: 9, stock: 200, badge: "Sale", currency: "USD",
    benefits: [
      "Cleanses and conditions facial hair like never before",
      "Nourishes from root to tip with Vitamin B5 & Aloe",
      "Eliminates wiry texture and parched skin",
      "Refreshing grapefruit sensation that lingers",
      "Effortless freshness in a 6.5 fl oz premium bottle",
    ],
    ingredients: ["Vitamin B5", "Aloe Vera", "Grapefruit Scent", "Beneficial Botanicals"],
    usage: "Apply to wet beard, massage into a rich lather, and rinse thoroughly. Use daily for a fresh, energized feel.",
    variations: [
      { label: "Volume", options: ["6.5 fl oz"] },
    ],
  },
  {
    id: "110", slug: "woodys-after-shave-tonic",
    title: "Woody's After Shave Tonic (6.3 fl oz)",
    category: "Mens Grooming",
    description: "Tonic Power: Our Woody's After Shave Tonic is not just your ordinary after shave—it's a high-octane fuel for your face that'll soothe, repair, and refresh like nothing else. Give yourself an exhilarating blast of cooling goodness that kicks your confidence to overdrive. Intense Skin Revival: Loaded with the power of Aloe Vera, Calendula, Chamomile, and Monoi Oil. Works together to give you some serious moisturizing and repairing that leaves skin calm and cool! Ultimate Freshness Boost: Each classic bottle holds 6.3 fl oz of unbeatable freshness! A formula that's lightweight, fast-absorbing, and leaves no greasy residue behind. With its signature bold fragrance, it leaves you smelling like a champ.",
    price: 6.29, oldPrice: 6.99,
    image: "/assets/b21.webp", images: ["/assets/b21.webp", "/assets/b22.webp"],
    rating: 4.67, reviews: 15, stock: 150, badge: "Sale", currency: "USD",
    benefits: [
      "High-octane fuel to soothe, repair, and refresh",
      "Intense skin revival with Aloe, Calendula & Chamomile",
      "Monoi Oil for deep moisturizing and repairing",
      "Lightweight, fast-absorbing, and non-greasy",
      "Signature bold fragrance for ultimate confidence",
    ],
    ingredients: ["Aloe Vera", "Calendula", "Chamomile", "Monoi Oil", "Vitamin E"],
    usage: "Apply liberally to face and neck after shaving for an instant cooling sensation and skin repair.",
    variations: [
      { label: "Volume", options: ["6.3 fl oz"] },
    ],
  },
  {
    id: "111", slug: "woodys-shave-butter",
    title: "Woody's Shave Butter (1.7 fl oz)",
    category: "Mens Grooming",
    description: "Shave Butter Sensation: Set your grooming routine to turbo mode with our Woody's Shave Butter! Hydrates and lubricates skin super effectively for the smoothest, cleanest shave without razor drag. The Secret to Smoothness: Packed with the skin-boosting goodness of Aloe Vera, Vitamin E, and Chamomile. Shea Butter and Cocoa Seed Butter, the moisturizing dream team that'll leave you feeling smooth as a freshly waxed surfboard. Ultimate Easy Shave: Comes in a handy 1.7 fl oz squeeze tube. Perfect consistency that lets you work it into your beard for outstanding results. Freshness Redefined: Features a classic minty grapefruit scent that sends your senses to the stratosphere.",
    price: 10.79, oldPrice: 11.99,
    image: "/assets/b23.webp", images: ["/assets/b23.webp", "/assets/b24.webp"],
    rating: 4.03, reviews: 24, stock: 180, badge: "Sale", currency: "USD",
    benefits: [
      "Turbo-mode grooming for the smoothest shave",
      "Hydrates and lubricates to eliminate razor drag",
      "Skin-boosting Aloe Vera, Vitamin E & Chamomile",
      "Moisturizing Shea & Cocoa Seed Butter",
      "Classic minty grapefruit scent for total control",
    ],
    ingredients: ["Aloe Vera", "Vitamin E", "Chamomile", "Shea Butter", "Cocoa Seed Butter"],
    usage: "Work a small amount into your beard and skin to create a rich lather. Shave and rinse for a smooth finish.",
    variations: [
      { label: "Volume", options: ["1.7 fl oz"] },
    ],
  },
  {
    id: "112", slug: "mode-styling-gel",
    title: "Johnny B. Mode Styling Gel",
    category: "Mens Grooming",
    description: "We didn’t reinvent it. We perfected it. Easily identified by its signature scent and blue color, Mode Styling Gel is now thicker than ever, making it easier to control and tame any style. It spreads evenly through most hair types, won’t separate, and delivers the high-shine, strong hold you expect without alcohol, flaking, or buildup. Reactivate with water and keep styling all day. Perfect for Classic Slick-Back, Side Part, and Wet Look styles.",
    price: 10.80, oldPrice: 12.00,
    image: "/assets/b25.webp", images: ["/assets/b25.webp", "/assets/b26.webp", "/assets/b27.webp", "/assets/b28.webp"],
    rating: 4.8, reviews: 114, stock: 300, badge: "Hot", currency: "USD",
    benefits: [
      "Strong hold (6/10) with high shine (8/10)",
      "Alcohol-free formula — no flaking or buildup",
      "Thicker formula for better control and taming",
      "Reactivate with water for all-day styling",
      "Spreads evenly through most hair types",
    ],
    ingredients: ["Alcohol-Free", "Water-Based", "Signature Scent", "Iconic Blue Formula"],
    usage: "Apply a small amount to damp or dry hair. Style as desired. To restyle throughout the day, simply reactivate with a bit of water.",
    variations: [
      { label: "Size", options: ["3.3 oz", "6.7 oz", "16 oz", "16 oz Bundle", "32 oz", "64 oz"] },
    ],
  },
  {
    id: "113", slug: "woodys-daily-shampoo",
    title: "Woody's Daily Shampoo",
    category: "Shampoo",
    description: "Shampoo for Success: Kickstart your day with hair that's as fresh as a crisp morning breeze! Woody's Daily Shampoo is your ultimate wingman, ready to amp up your hair game. Your go-to gear for no-nonsense hair care! Whether you're shredding waves or nailing that presentation at the office, you'll be clean, confident, and ready to take charge! Nourishment You Need: Packed with a blend of the finest proven ingredients like Aloe, Ginger, Pro Vitamin B5 and Vitamin E to keep hair healthy and strong. Pure Hair Power Up: Squeaky clean with banging volume with each use. The ultimate hair sidekick for your always-on-the-go lifestyle!",
    price: 8.09, oldPrice: 8.99,
    image: "/assets/b29.webp", images: ["/assets/b29.webp", "/assets/b30.webp", "/assets/b31.webp"],
    rating: 4.4, reviews: 14, stock: 250, badge: "Sale", currency: "USD",
    benefits: [
      "Ultimate wingman for fresh, clean hair",
      "No-nonsense care for an active lifestyle",
      "Infused with Aloe, Ginger, Vitamin E & B5",
      "Delivers squeaky clean hair with banging volume",
      "Simple, one-step hair revival formula",
    ],
    ingredients: ["Aloe Vera", "Ginger Extract", "Pro Vitamin B5", "Vitamin E", "Natural Botanicals"],
    usage: "Apply to wet hair, massage into a lather, and rinse thoroughly. Perfect for daily use after the gym or a long day.",
    variations: [
      { label: "Size", options: ["12 fl oz", "32 oz"] },
    ],
  },
];

export const DEFAULT_CATEGORIES = [
  { name: "Hair Care", image: "/assets/cat-hair.jpg", count: 3 },
  { name: "Coffee", image: "/assets/black coffee.jpeg", count: 1 },
  { name: "Shampoo", image: "/assets/body1.png", count: 2 },
  { name: "Mens Grooming", image: "/assets/b3.webp", count: 8 },
];
