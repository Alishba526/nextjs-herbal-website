"use client";

import { HeroSlider } from "@/components/HeroSlider";
import { ProductCard } from "@/components/ProductCard";
import { FlashCountdown } from "@/components/FlashCountdown";
import { CircleMarquee } from "@/components/CircleMarquee";
import { GirlySlider } from "@/components/GirlySlider";
import { CATEGORY_LIST, PRODUCTS } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Award, Truck, ShieldCheck, Leaf, Star, Sparkles, Flame, ArrowRight, Coffee } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const FEATURES = [
  { icon: Leaf, title: "100% Organic", desc: "Chemical-free, natural ingredients" },
  { icon: Truck, title: "Free Shipping", desc: "Free delivery on every order" },
  { icon: ShieldCheck, title: "Secure Payments", desc: "COD, Card & online" },
  { icon: Award, title: "Herbal Certified", desc: "Premium tested quality" },
];

const REVIEWS = [
  { name: "Ayesha Khan", text: "MEIDU shampoo ne mere grey hair ko 5 minute me cover kar diya. Amazing!", rating: 5 },
  { name: "Hamza Ali", text: "Keratin mask use karne ke baad hair silky and shiny ho gaye.", rating: 5 },
  { name: "Sana Tariq", text: "Avocado shampoo bohot refreshing hai, scalp ko bhi healthy karta hai.", rating: 5 },
  { name: "Bilal Ahmed", text: "Quality top notch, packaging premium, delivery bhi fast thi.", rating: 5 },
];

export default function Home() {
  return (
    <>
      <HeroSlider />

      <CircleMarquee />

      <section className="max-w-7xl mx-auto px-4 -mt-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-card rounded-3xl p-6 shadow-glow border border-border">
          {FEATURES.map(f => (
            <div key={f.title} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl gradient-card flex items-center justify-center">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">{f.title}</p>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <SectionTitle eyebrow="Browse" title="Shop by Category" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mt-10 max-w-3xl mx-auto">
          {CATEGORY_LIST.map((c: any) => (
            <Link key={c.name} href={`/shop?category=${c.name}`}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover-lift">
              <div className="aspect-square overflow-hidden bg-secondary">
                <Image src={c.image} alt={c.name} width={300} height={300} loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-3 text-center">
                <h3 className="font-semibold text-sm text-foreground">{c.name}</h3>
                <p className="text-[10px] text-muted-foreground mt-0.5">{PRODUCTS.filter(p => p.category === c.name).length} products</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-16">
        <SectionTitle eyebrow="Top Picks" title="Best Selling Products" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
          {PRODUCTS.map(p => <ProductCard key={p.id} product={p} compact />)}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="relative rounded-3xl overflow-hidden h-64 md:h-80">
          <Image src="/assets/banner-mid.jpg" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/30 to-transparent" />
          <div className="relative h-full flex items-center px-8 md:px-14">
            <div className="text-background max-w-md">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest bg-background/15 backdrop-blur px-4 py-1.5 rounded-full">
                <Leaf className="w-3.5 h-3.5" /> Nature&apos;s Best
              </span>
              <h2 className="text-3xl md:text-5xl font-bold font-serif mt-4 leading-tight">
                Heal Naturally,<br />Live Beautifully
              </h2>
              <Link href="/shop"><Button size="lg" className="rounded-full mt-6">Shop Collection <ArrowRight className="w-4 h-4 ml-2" /></Button></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="gradient-hero rounded-3xl p-8 md:p-12 text-primary-foreground relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-background/10 blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-background/20 px-3 py-1 rounded-full text-xs font-semibold">
                <Flame className="w-4 h-4" /> FLASH SALE
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 font-serif">Up to 30% Off</h2>
              <p className="mt-3 opacity-90">Limited time offer on our hair care collection.</p>
              <div className="mt-6"><FlashCountdown /></div>
              <Link href="/shop"><Button size="lg" variant="secondary" className="mt-6 rounded-full">Shop the Sale</Button></Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {PRODUCTS.slice(0, 2).map(p => <ProductCard key={p.id} product={p} compact />)}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="relative rounded-3xl overflow-hidden h-56 group">
          <Image src="/assets/banner-mid2.jpg" alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 to-transparent" />
          <div className="relative h-full flex items-center p-8 text-background">
            <div>
              <p className="text-xs uppercase tracking-widest opacity-90">New Arrivals</p>
              <h3 className="text-2xl md:text-3xl font-bold font-serif mt-2">Premium Hair Care Range</h3>
              <Link href="/shop"><Button variant="secondary" size="sm" className="rounded-full mt-4">Explore</Button></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle eyebrow="Loved By Customers" title="What People Say" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="w-4 h-4 fill-gold text-gold" />)}
                </div>
                <p className="text-sm text-muted-foreground italic leading-relaxed">&quot;{r.text}&quot;</p>
                <div className="flex items-center gap-3 mt-5">
                  <div className="w-10 h-10 rounded-full gradient-hero text-primary-foreground flex items-center justify-center font-bold">
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{r.name}</p>
                    <p className="text-[11px] text-primary">✓ Verified Buyer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CoffeeSection />

      <GirlySlider />
    </>
  );
}

function CoffeeSection() {
  const coffeeProducts = PRODUCTS.filter(p => p.category === "Coffee");
  if (coffeeProducts.length === 0) return null;
  return (
    <section className="max-w-7xl mx-auto px-4 pb-16">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 text-amber-50">
        <Image src="/assets/coffee-banner.jpg" alt="" fill loading="lazy"
          className="object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-900/70 to-transparent" />
        <div className="relative grid md:grid-cols-2 gap-8 p-8 md:p-14 items-center">
          <div>
            <span className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur border border-amber-400/30 text-amber-200 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest">
              <Coffee className="w-3.5 h-3.5" /> Premium Coffee
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-serif mt-5 leading-tight">
              Growzix Black<br />
              <span className="text-amber-300">Gourmet Coffee</span>
            </h2>
            <p className="mt-4 text-amber-100/85 leading-relaxed max-w-md">
              Bold gourmet roast infused with Ganoderma, Collagen I &amp; III, Biotin and Hyaluronic Acid — energy, immunity and beauty in every cup.
            </p>
            <ul className="mt-5 space-y-1.5 text-sm text-amber-100/80">
              <li>☕ Smooth, low-acidity premium roast</li>
              <li>✨ Glowing skin &amp; stronger hair from within</li>
              <li>🌿 100% natural • No artificial flavors</li>
            </ul>
            <Link href="/shop?category=Coffee">
              <Button size="lg" className="rounded-full mt-7 bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold">
                Shop Coffee <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid sm:grid-cols-1 gap-4 max-w-sm justify-self-center md:justify-self-end w-full">
            {coffeeProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center">
      <span className="inline-flex items-center gap-2 text-primary font-semibold uppercase text-xs tracking-widest">
        <Sparkles className="w-3.5 h-3.5" /> {eyebrow}
      </span>
      <h2 className="text-3xl md:text-4xl font-bold mt-2 font-serif">{title}</h2>
    </div>
  );
}
