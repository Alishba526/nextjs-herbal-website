"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const SLIDES = [
  { img: "/assets/hero-slide-1.jpg", eyebrow: "100% Organic • Chemical Free", title: "Pure Natural\nWellness Rituals", desc: "Crafted by nature, perfected for your healthy lifestyle." },
  { img: "/assets/hero-slide-2.jpg", eyebrow: "Glow • Confidence • Beauty", title: "Beauty That\nStarts Within", desc: "Premium herbal care for radiant skin and shiny hair." },
  { img: "/assets/hero-slide-3.jpg", eyebrow: "Aloe • Herbs • Essential Oils", title: "Pure Botanical\nGoodness", desc: "Hand-picked herbs blended for daily vitality." },
];

export function HeroSlider() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

  return (
    <section className="relative overflow-hidden">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {SLIDES.map((s, i) => (
            <div key={i} className="relative flex-[0_0_100%] min-w-0 h-[80vh] min-h-[520px] max-h-[760px]">
              <Image src={s.img} alt="" fill priority={i === 0} className="object-cover" />
              <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
                <div className="max-w-xl text-background animate-fade-in">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest bg-primary/80 backdrop-blur px-4 py-1.5 rounded-full">
                    <Sparkles className="w-3.5 h-3.5" /> {s.eyebrow}
                  </span>
                  <h1 className="text-5xl md:text-7xl font-bold mt-5 leading-[1.05] whitespace-pre-line">
                    {s.title}
                  </h1>
                  <p className="mt-5 text-lg opacity-90">{s.desc}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href="/shop"><Button size="lg" className="rounded-full shadow-glow"><ShoppingBag className="w-4 h-4 mr-2" /> Shop Now</Button></Link>
                    <Link href="/shop"><Button size="lg" variant="secondary" className="rounded-full">Explore Products</Button></Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => embla?.scrollPrev()} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={() => embla?.scrollNext()} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition">
        <ChevronRight className="w-5 h-5" />
      </button>
    </section>
  );
}
