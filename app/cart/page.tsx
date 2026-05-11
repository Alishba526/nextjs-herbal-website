"use client";

import Link from "next/link";
import { Trash2, Minus, Plus, Truck } from "lucide-react";
import { store, useStore } from "@/lib/store";
import { formatPrice } from "@/lib/products";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Cart() {
  const { cart } = useStore();
  const subtotal = cart.reduce((a, c) => a + c.product.price * c.qty, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="text-7xl mb-4">🛒</div>
        <h1 className="text-3xl font-bold font-serif">Your cart is empty</h1>
        <p className="text-muted-foreground mt-2">Discover our herbal collection.</p>
        <Link href="/shop"><Button size="lg" className="mt-6 rounded-full">Shop Now</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold font-serif mb-8">Shopping Cart</h1>
      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item.product.id} className="bg-card border border-border rounded-2xl p-4 flex gap-4 items-center">
              <Image src={item.product.image} alt={item.product.title} width={96} height={96} className="w-24 h-24 object-cover rounded-xl" />
              <div className="flex-1">
                <Link href={`/product/${item.product.slug}`} className="font-semibold hover:text-primary line-clamp-1">{item.product.title}</Link>
                <p className="text-xs text-muted-foreground">{item.product.category}</p>
                <p className="text-primary font-bold mt-1">{formatPrice(item.product.price)}</p>
              </div>
              <div className="flex items-center bg-secondary rounded-full">
                <button onClick={() => store.setQty(item.product.id, item.qty - 1)} className="w-9 h-9 flex items-center justify-center"><Minus className="w-4 h-4" /></button>
                <span className="w-8 text-center font-semibold">{item.qty}</span>
                <button onClick={() => store.setQty(item.product.id, item.qty + 1)} className="w-9 h-9 flex items-center justify-center"><Plus className="w-4 h-4" /></button>
              </div>
              <Button variant="ghost" size="icon" onClick={() => store.removeFromCart(item.product.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
            </div>
          ))}
        </div>
        <aside className="bg-card border border-border rounded-2xl p-6 h-fit sticky top-24">
          <h3 className="font-bold text-lg mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between text-primary"><span className="flex items-center gap-1"><Truck className="w-4 h-4" /> Shipping</span><span className="font-semibold">FREE</span></div>
            <div className="border-t border-border pt-3 mt-3 flex justify-between font-bold text-base"><span>Total</span><span className="text-primary">{formatPrice(subtotal)}</span></div>
          </div>
          <Link href="/checkout"><Button className="w-full mt-5 rounded-full" size="lg">Proceed to Checkout</Button></Link>
        </aside>
      </div>
    </div>
  );
}
