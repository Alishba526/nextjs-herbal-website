"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const SLIDES = [
  { img: "/assets/banner1.png", eyebrow: "Growzix Natural", title: "Nature's Purest\nHerbal Secrets", desc: "Pure Natural Products for a Healthy and Refreshing Lifestyle. Discover the power of authentic botanical extracts." },
  { img: "/assets/banner-mid2.jpg", eyebrow: "Premium Quality • Natural Care", title: "Authentic Healing\nFrom Within", desc: "Hand-picked herbs and spices blended perfectly for your health and beauty." },
];

export function HeroSlider() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

  return (
    <section className="relative overflow-hidden">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {SLIDES.map((s, i) => (
            <div key={i} className="relative flex-[0_0_100%] min-w-0 h-[35vh] sm:h-[45vh] md:h-[55vh] min-h-[250px] md:min-h-[400px] max-h-[550px]">
              <Image src={s.img} alt="" fill priority={i === 0} className="object-cover" />
              
              {/* Soft Modern Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />

              <div className="relative z-20 max-w-7xl mx-auto px-6 h-full flex items-center">
                <div className="max-w-2xl text-white">
                  <div className="overflow-hidden mb-2">
                    <span className="inline-flex items-center gap-2 text-[9px] md:text-xs font-bold uppercase tracking-[0.2em] bg-primary/90 backdrop-blur-md px-3 py-1.5 rounded-full animate-slide-up">
                      <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5" /> {s.eyebrow}
                    </span>
                  </div>
                  
                  <h1 className="text-2xl md:text-5xl lg:text-6xl font-black font-serif mb-3 md:mb-5 leading-[1.1] animate-fade-in-up delay-200">
                    {s.title.split('\n').map((line, idx) => (
                      <span key={idx} className="block">{line}</span>
                    ))}
                  </h1>

                  <p className="text-xs md:text-base opacity-90 mb-4 md:mb-6 max-w-lg leading-relaxed animate-fade-in-up delay-500 font-light tracking-wide line-clamp-2 md:line-clamp-none">
                    {s.desc}
                  </p>

                  <div className="flex flex-wrap gap-3 animate-fade-in-up delay-700">
                    <Link href="/shop">
                      <Button size="sm" className="rounded-full h-10 md:h-12 px-6 md:px-8 bg-primary hover:bg-primary/90 text-white border-0 shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 text-xs md:text-sm">
                        <ShoppingBag className="w-3.5 h-3.5 md:w-4 h-4 mr-2" /> Shop Collection
                      </Button>
                    </Link>
                    <Link href="/shop">
                      <Button size="sm" variant="outline" className="rounded-full h-10 md:h-12 px-6 md:px-8 border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all hover:scale-105 active:scale-95 text-xs md:text-sm">
                        Discover More
                      </Button>
                    </Link>
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
