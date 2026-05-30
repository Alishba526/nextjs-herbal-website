"use client";

import Link from "next/link";
import { Heart, ShoppingCart, Eye, Star } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";
import { store, useStore } from "@/lib/store";
import { alert } from "@/lib/alert";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { wishlist } = useStore();
  const fav = wishlist.some(p => p.id === product.id);
  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

  const isCoffee = product.category === "Coffee";
  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-soft hover-lift border border-border flex flex-col">
      <div className={`relative overflow-hidden bg-secondary p-3 ${compact ? "aspect-[4/3]" : "aspect-[4/3]"}`}>
        <Link href={`/product/${product.slug}`} className="w-full h-full flex items-center justify-center">
          <Image src={product.image} alt={product.title} width={400} height={300} loading="lazy"
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
        </Link>
        {product.badge && (
          <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-full font-semibold">
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-[10px] px-2 py-0.5 rounded-full font-semibold">
            -{discount}%
          </span>
        )}
        <div className="absolute inset-x-2 bottom-2 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
          <Button size="icon" variant="secondary" className="rounded-full shadow-soft h-8 w-8" onClick={() => { store.toggleWishlist(product); }}>
            <Heart className={`w-3.5 h-3.5 ${fav ? "fill-primary text-primary" : ""}`} />
          </Button>
          <Link href={`/product/${product.slug}`} className="flex-1">
            <Button size="sm" variant="secondary" className="w-full rounded-full shadow-soft h-8 text-xs"><Eye className="w-3.5 h-3.5 mr-1" /> View</Button>
          </Link>
        </div>
      </div>
      <div className={`${compact ? "p-3 space-y-1" : "p-4 space-y-2"} flex-1 flex flex-col`}>
        <p className="text-[10px] text-primary font-semibold uppercase tracking-wide">{product.category}</p>
        <Link href={`/product/${product.slug}`}>
          <h3 className={`font-semibold text-foreground line-clamp-1 hover:text-primary transition ${compact ? "text-sm" : ""}`}>{product.title}</h3>
        </Link>
        <div className="flex items-center gap-1 text-xs">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`${compact ? "w-3 h-3" : "w-3.5 h-3.5"} ${i < Math.round(product.rating) ? "fill-gold text-gold" : "text-muted"}`} />
          ))}
          <span className="text-muted-foreground ml-1 text-[10px]">({product.reviews})</span>
        </div>
        <div className="flex items-end justify-between pt-1 mt-auto">
          <div>
            <p className={`font-bold text-foreground ${compact ? "text-base" : "text-lg"}`}>{formatPrice(product.price)}</p>
            {product.oldPrice && <p className="text-[10px] text-muted-foreground line-through">{formatPrice(product.oldPrice)}</p>}
          </div>
          <Button size="sm" className="rounded-full h-8 w-8 p-0" onClick={() => { store.addToCart(product); alert.cart(product.title); }}>
            <ShoppingCart className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
