"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import Link from "next/link";
import Image from "next/image";

export function GirlySlider() {
  const [ref, embla] = useEmblaCarousel({ loop: true, align: "center" }, [Autoplay({ delay: 3500 })]);
  const slides = PRODUCTS.flatMap(p => (p.images ?? [p.image]).map(img => ({ img, p })));

  return (
    <section className="py-16 bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50 dark:from-pink-950/30 dark:via-rose-950/20 dark:to-amber-950/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 text-pink-600 dark:text-pink-300 font-semibold uppercase text-xs tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> Glow Gallery
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 font-serif">Beauty in Every Bottle</h2>
          <p className="text-sm text-muted-foreground mt-2">A soft showcase of our premium hair care line</p>
        </div>

        <div className="relative">
          <div ref={ref} className="overflow-hidden">
            <div className="flex">
              {slides.map((s, i) => (
                <div key={i} className="flex-[0_0_85%] sm:flex-[0_0_50%] md:flex-[0_0_33%] lg:flex-[0_0_28%] min-w-0 px-3">
                  <Link href={`/product/${s.p.slug}`}
                    className="block group relative rounded-3xl overflow-hidden bg-card shadow-md hover:shadow-2xl transition aspect-[3/4] border-2 border-pink-100 dark:border-pink-900/30">
                    <Image src={s.img} alt={s.p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/80 to-transparent p-4 text-background">
                      <p className="text-xs uppercase tracking-widest opacity-90">{s.p.category}</p>
                      <p className="font-semibold text-sm line-clamp-2">{s.p.title.split("—")[0]}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => embla?.scrollPrev()} aria-label="Prev"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/90 shadow-md flex items-center justify-center hover:bg-card">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => embla?.scrollNext()} aria-label="Next"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/90 shadow-md flex items-center justify-center hover:bg-card">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
