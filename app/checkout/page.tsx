"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { store, useStore } from "@/lib/store";
import { formatPrice } from "@/lib/products";
import { alert } from "@/lib/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Truck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Checkout() {
  const { cart, currentUser } = useStore();
  const router = useRouter();
  const subtotal = cart.reduce((a, c) => a + c.product.price * c.qty, 0);
  const total = subtotal;
  const [payment, setPayment] = useState("cod");

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="bg-card border border-border rounded-3xl p-8 shadow-soft">
          <h1 className="text-2xl font-bold font-serif mb-2">Login Required</h1>
          <p className="text-sm text-muted-foreground mb-6">Please sign in or create an account to place your order.</p>
          <div className="flex gap-3">
            <Link href="/login"><Button className="flex-1 rounded-full">Login</Button></Link>
            <Link href="/register"><Button variant="outline" className="flex-1 rounded-full">Register</Button></Link>
          </div>
        </div>
      </div>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) { alert.error("Cart is empty"); return; }
    const f = new FormData(e.target as HTMLFormElement);
    const order = store.placeOrder({
      customerEmail: (f.get("email") as string) || currentUser?.email || "guest@local",
      customerName: f.get("name") as string,
      phone: f.get("phone") as string,
      address: f.get("address") as string,
      city: f.get("city") as string,
      items: cart.map(c => ({ id: c.product.id, title: c.product.title, price: c.product.price, qty: c.qty, image: c.product.image })),
      total,
      payment,
    });

    const wa = (store.get().settings.whatsappNumber || "923158454839").replace(/\D/g, "");
    if (wa) {
      const lines = [
        `🛒 *NEW ORDER* — ${order.id}`,
        ``,
        `*Customer:* ${order.customerName}`,
        `*Phone:* ${order.phone}`,
        `*Email:* ${order.customerEmail}`,
        `*Address:* ${order.address}, ${order.city}`,
        ``,
        `*Items:*`,
        ...order.items.map(it => `• ${it.title} × ${it.qty} = ${formatPrice(it.price * it.qty)}`),
        ``,
        `*Total:* ${formatPrice(order.total)}`,
        `*Payment:* ${order.payment.toUpperCase()}`,
      ].join("\n");
      const url = `https://wa.me/${wa}?text=${encodeURIComponent(lines)}`;
      window.open(url, "_blank");
    }

    alert.success("Order Placed!", `Order ${order.id} confirmed. We'll contact you soon.`);
    router.push("/");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold font-serif mb-8">Checkout</h1>
      <form onSubmit={submit} className="grid lg:grid-cols-[1fr_380px] gap-8">
        <div className="space-y-8">
          <Section title="Shipping Information">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field name="name" label="Full Name" required defaultValue={currentUser?.name} />
              <Field name="phone" label="Phone" required />
              <Field name="email" label="Email" type="email" className="sm:col-span-2" required defaultValue={currentUser?.email} />
              <Field name="address" label="Address" className="sm:col-span-2" required />
              <Field name="city" label="City" required />
              <Field name="postal" label="Postal Code" />
            </div>
          </Section>

          <Section title="Delivery Method">
            <div className="flex items-center gap-3 p-4 border border-primary bg-primary/5 rounded-xl">
              <Truck className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-semibold">Free Shipping</p>
                <p className="text-xs text-muted-foreground">Free delivery on every order — 3-5 business days</p>
              </div>
              <span className="text-primary font-bold">FREE</span>
            </div>
          </Section>

          <Section title="Payment Method">
            <RadioGroup value={payment} onValueChange={setPayment} className="grid sm:grid-cols-2 gap-3">
              {[["cod", "💵 Cash on Delivery"], ["card", "💳 Card Payment"], ["paypal", "🅿️ PayPal"], ["bank", "🏦 Bank Transfer"]].map(([v, l]) => (
                <label key={v} className="flex items-center gap-3 p-4 border border-border rounded-xl cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <RadioGroupItem value={v} /><span className="text-sm">{l}</span>
                </label>
              ))}
            </RadioGroup>
          </Section>
        </div>

        <aside className="bg-card border border-border rounded-2xl p-6 h-fit sticky top-24">
          <h3 className="font-bold text-lg mb-4">Order Summary</h3>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {cart.map(c => (
              <div key={c.product.id} className="flex gap-3 text-sm">
                <Image src={c.product.image} alt="" width={48} height={48} className="w-12 h-12 rounded object-cover" />
                <div className="flex-1">
                  <p className="font-medium line-clamp-1">{c.product.title}</p>
                  <p className="text-muted-foreground text-xs">Qty: {c.qty}</p>
                </div>
                <p className="font-semibold">{formatPrice(c.product.price * c.qty)}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between text-primary"><span>Shipping</span><span className="font-semibold">FREE</span></div>
            <div className="flex justify-between font-bold text-base pt-2 border-t border-border"><span>Total</span><span className="text-primary">{formatPrice(total)}</span></div>
          </div>
          <Button type="submit" size="lg" className="w-full mt-5 rounded-full">Place Order</Button>
        </aside>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h3 className="font-bold text-lg mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, className = "", ...rest }: any) {
  return (
    <div className={className}>
      <Label className="mb-2 block text-sm">{label}</Label>
      <Input {...rest} />
    </div>
  );
}
