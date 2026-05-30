import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Growzix Natural — Pakistan's Best Organic Herbal Products Store",
  description: "Discover Growzix Natural, Pakistan's leading brand for 100% organic herbal products. We specialize in essential oils for natural hair growth and chemical-free beauty solutions.",
  keywords: [
    "herbal products manufacturer",
    "organic herbal products brand",
    "natural herbal remedies Pakistan",
    "herbal hair care mission",
    "best organic herbal hair products",
    "natural beauty products Pakistan",
    "chemical-free hair treatments",
    "herbal shampoo for hair fall",
    "essential oils for natural hair growth",
    "natural hair oil for hair growth"
  ],
  alternates: {
    canonical: "https://growzixnatural.com/about/",
  },
};

import { Leaf, Heart, Award, Users } from "lucide-react";
import Image from "next/image";

function AboutContent() {
  return (
    <div>
      <div className="relative h-[40vh] min-h-[300px]">
        <Image src="/assets/hero-1.jpg" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 h-full flex items-center justify-center text-center text-background px-4">
          <div>
            <h1 className="text-5xl font-bold font-serif">About Growzix Natural</h1>
            <p className="mt-3 opacity-90">Your Trusted Source for Organic Herbal Products</p>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-16 prose prose-lg">
        <p className="text-lg leading-relaxed text-muted-foreground">Growzix Natural is Pakistan&apos;s leading destination for <strong>pure, organic herbal products</strong>. As a dedicated <strong>herbal product manufacturer</strong>, we blend traditional wisdom with modern quality standards. Every product, from our <strong>herbal hair care range</strong> to our <strong>natural skin care solutions</strong>, is chemical-free, ethically sourced, and carefully tested for purity.</p>
        <div className="grid sm:grid-cols-2 gap-6 mt-12 not-prose">
          {[
            { icon: Leaf, t: "Our Mission", d: "Bring the timeless wisdom of herbal healing and organic products to every home." },
            { icon: Heart, t: "Our Promise", d: "100% natural, no shortcuts, no synthetic chemicals — ever." },
            { icon: Award, t: "Premium Quality", d: "Each batch of herbal extracts tested for purity and potency." },
            { icon: Users, t: "Community", d: "The preferred herbal products store for 50,000+ happy customers." },
          ].map(c => (
            <div key={c.t} className="bg-card border border-border rounded-2xl p-6">
              <c.icon className="w-9 h-9 text-primary mb-3" />
              <h3 className="font-bold text-lg">{c.t}</h3>
              <p className="text-sm text-muted-foreground mt-2">{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return <AboutContent />;
}
