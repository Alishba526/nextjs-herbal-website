"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useProducts } from "@/lib/products";
import Image from "next/image";

export function CircleMarquee() {
  const { products } = useProducts();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || products.length === 0) return null;

  const items = [...products, ...products, ...products, ...products];
  return (
    <section className="py-10 bg-gradient-to-r from-secondary/40 via-background to-secondary/40 border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
        <p className="text-xs uppercase tracking-widest text-primary font-semibold">Featured</p>
        <h3 className="text-xl md:text-2xl font-bold font-serif">Our Bestsellers</h3>
      </div>
      <div className="relative">
        <div className="flex gap-6 animate-marquee whitespace-nowrap">
          {items.map((p, i) => (
            <Link key={i} href={`/product/${p.slug}`} className="shrink-0 group">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-card shadow-md ring-2 ring-primary/20 group-hover:ring-primary group-hover:scale-105 transition">
                <Image src={p.image} alt={p.title} width={112} height={112} className="w-full h-full object-cover" />
              </div>
              <p className="text-[10px] text-center mt-2 max-w-[112px] truncate text-muted-foreground">{p.title.split("—")[0]}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
