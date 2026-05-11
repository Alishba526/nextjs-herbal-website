"use client";

import Link from "next/link";
import { CATEGORY_LIST, PRODUCTS } from "@/lib/products";
import Image from "next/image";

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold font-serif text-center mb-3">Shop by Category</h1>
      <p className="text-muted-foreground text-center mb-10">Explore our complete range of 100% natural herbal products</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {CATEGORY_LIST.map((cat: any) => {
          const count = PRODUCTS.filter(p => p.category === cat.name).length;
          return (
            <Link key={cat.name} href={`/shop?category=${cat.name}`}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-glow hover:-translate-y-1 transition-all">
              <div className="aspect-square overflow-hidden bg-secondary">
                <Image src={cat.image} alt={cat.name} width={300} height={300} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-3 text-center">
                <h3 className="font-semibold text-sm">{cat.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{count || cat.count} items</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
