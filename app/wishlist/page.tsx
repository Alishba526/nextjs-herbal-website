"use client";

import Link from "next/link";
import { useStore, store } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import { alert } from "@/lib/alert";
import Image from "next/image";

export default function Wishlist() {
  const { wishlist } = useStore();
  if (wishlist.length === 0) return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <div className="text-7xl mb-4">💚</div>
      <h1 className="text-3xl font-bold font-serif">Your wishlist is empty</h1>
      <Link href="/shop"><Button size="lg" className="mt-6 rounded-full">Discover Products</Button></Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold font-serif mb-8">My Wishlist</h1>
      <div className="space-y-4">
        {wishlist.map(p => (
          <div key={p.id} className="bg-card border border-border rounded-2xl p-4 flex gap-4 items-center">
            <Image src={p.image} alt={p.title} width={80} height={80} className="w-20 h-20 object-cover rounded-xl" />
            <div className="flex-1">
              <Link href={`/product/${p.slug}`} className="font-semibold hover:text-primary">{p.title}</Link>
              <p className="text-primary font-bold mt-1">${p.price.toFixed(2)}</p>
              <p className={`text-xs ${p.stock > 0 ? "text-primary" : "text-destructive"}`}>{p.stock > 0 ? "In Stock" : "Out of Stock"}</p>
            </div>
            <Button onClick={() => { store.addToCart(p); alert.cart(p.title); }} className="rounded-full"><ShoppingCart className="w-4 h-4 mr-2" />Add</Button>
            <Button variant="ghost" size="icon" onClick={() => store.toggleWishlist(p)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
          </div>
        ))}
      </div>
    </div>
  );
}
