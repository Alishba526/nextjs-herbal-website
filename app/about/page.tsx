"use client";

import { Leaf, Heart, Award, Users } from "lucide-react";
import Image from "next/image";

export default function About() {
  return (
    <div>
      <div className="relative h-[40vh] min-h-[300px]">
        <Image src="/assets/hero-1.jpg" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 h-full flex items-center justify-center text-center text-background px-4">
          <div>
            <h1 className="text-5xl font-bold font-serif">About HerbaInn</h1>
            <p className="mt-3 opacity-90">Rooted in nature. Crafted with care.</p>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-16 prose prose-lg">
        <p className="text-lg leading-relaxed text-muted-foreground">HerbaInn is Pakistan&apos;s leading destination for pure, organic herbal products. From traditional remedies passed down through generations to modern wellness essentials, every product is chemical-free, ethically sourced, and carefully tested.</p>
        <div className="grid sm:grid-cols-2 gap-6 mt-12 not-prose">
          {[
            { icon: Leaf, t: "Our Mission", d: "Bring the timeless wisdom of herbal healing to every home." },
            { icon: Heart, t: "Our Promise", d: "100% natural, no shortcuts, no synthetic chemicals — ever." },
            { icon: Award, t: "Premium Quality", d: "Each batch tested for purity and potency." },
            { icon: Users, t: "Community", d: "Trusted by 50,000+ happy customers nationwide." },
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
