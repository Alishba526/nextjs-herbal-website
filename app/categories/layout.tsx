import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop by Category — Organic Herbal Collections | Growzix Natural",
  description: "Browse our diverse categories of 100% natural herbal products. From premium hair care and essential oils to gourmet coffee and men's grooming.",
  keywords: [
    "herbal product categories",
    "natural hair care collection",
    "organic skincare categories",
    "herbal wellness shop",
    "essential oils category",
    "men's grooming herbal products"
  ],
  alternates: {
    canonical: "https://growzixnatural.com/categories/",
  },
};

export default function CategoriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
