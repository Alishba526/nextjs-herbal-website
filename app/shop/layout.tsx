import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Herbal Shop — Buy Organic & Natural Herbal Products for Hair Growth",
  description: "Browse our collection of 100% organic herbal products. Find the best essential oils for natural hair growth and natural hair growth oil. Pakistan's top-rated herbal wellness store.",
  keywords: [
    "herbal products store",
    "buy herbal products online",
    "organic herbal products Pakistan",
    "herbal wellness products",
    "natural beauty products shop",
    "herbal hair care products store",
    "essential oils for natural hair growth",
    "natural hair oil",
    "natural hair growth oil",
    "best natural oils for hair growth",
    "natural oils that help hair growth",
    "best oil for natural hair",
    "all natural hair oil"
  ],
  alternates: {
    canonical: "https://growzixnatural.com/shop/",
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
