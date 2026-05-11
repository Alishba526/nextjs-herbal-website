"use client";

import Link from "next/link";
import { ShoppingCart, Heart, User, Menu, Moon, Sun, X, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { store, useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/SearchBar";
import Image from "next/image";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const { cart, wishlist, dark, currentUser } = useStore();
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cartCount = cart.reduce((a, c) => a + c.qty, 0);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [open]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="bg-primary text-primary-foreground text-[10px] md:text-xs py-1.5 md:py-2 overflow-hidden whitespace-nowrap border-b border-primary/20">
          <div className="flex animate-marquee">
            <div className="flex shrink-0 items-center gap-10 px-4 font-medium tracking-wide">
              <span>🌿 PREMIUM HERBAL HAIR CARE — FREE SHIPPING ON EVERY ORDER</span>
              <span>🌿 100% ORGANIC & CHEMICAL FREE PRODUCTS</span>
              <span>🌿 LUXURY BOTANICAL SOLUTIONS FOR HEALTHY HAIR</span>
              <span>🌿 PREMIUM HERBAL HAIR CARE — FREE SHIPPING ON EVERY ORDER</span>
            </div>
            <div className="flex shrink-0 items-center gap-10 px-4 font-medium tracking-wide">
              <span>🌿 PREMIUM HERBAL HAIR CARE — FREE SHIPPING ON EVERY ORDER</span>
              <span>🌿 100% ORGANIC & CHEMICAL FREE PRODUCTS</span>
              <span>🌿 LUXURY BOTANICAL SOLUTIONS FOR HEALTHY HAIR</span>
              <span>🌿 PREMIUM HERBAL HAIR CARE — FREE SHIPPING ON EVERY ORDER</span>
            </div>
          </div>
        </div>
        <nav className="max-w-7xl mx-auto px-4 h-16 md:h-28 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image src="/assets/logo.png" alt="Growzix Natural" width={96} height={96} className="h-12 md:h-24 w-auto object-contain" />
          </Link>

          <ul className="hidden lg:flex items-center gap-7">
            {NAV.map(n => (
              <li key={n.to}>
                <Link href={n.to} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:block flex-1 max-w-md mx-auto">
            <SearchBar />
          </div>

          <div className="flex items-center gap-1">
            {/* Desktop Icons */}
            <div className="hidden md:flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={() => store.toggleDark()} aria-label="Theme">
                {mounted && (dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />)}
              </Button>
              <Link href="/wishlist" className="relative p-2 rounded-md hover:bg-accent">
                <Heart className="w-5 h-5" />
                {mounted && wishlist.length > 0 && <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{wishlist.length}</span>}
              </Link>
              <Link href="/cart" className="relative p-2 rounded-md hover:bg-accent">
                <ShoppingCart className="w-5 h-5" />
                {mounted && cartCount > 0 && <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>}
              </Link>
            </div>

            {mounted && currentUser ? (
              <button onClick={() => store.logout()} className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-secondary text-xs font-medium hover:bg-accent" title={`Logged in as ${currentUser.name}`}>
                <User className="w-4 h-4" /> {currentUser.name.split(" ")[0]}
              </button>
            ) : mounted ? (
              <Link href="/login" className="p-2 rounded-md hover:bg-accent hidden md:block">
                <User className="w-5 h-5" />
              </Link>
            ) : null}

            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)}>
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </nav>

        {/* Mobile Search Overlay */}
        {showSearch && (
          <div className="md:hidden p-4 bg-background border-b border-border animate-in slide-in-from-top duration-300">
            <SearchBar />
          </div>
        )}

        {/* Mobile Sidebar Menu */}
        {open && (
          <div className="fixed inset-0 top-[calc(64px+33px)] md:top-[calc(112px+40px)] z-40 lg:hidden bg-background/95 backdrop-blur-md">
            <div className="p-6 space-y-6">
              {NAV.map(n => (
                <Link key={n.to} href={n.to} onClick={() => setOpen(false)} className="block text-2xl font-serif font-bold text-foreground hover:text-primary transition-colors border-b border-border/50 pb-4">
                  {n.label}
                </Link>
              ))}
              <div className="pt-4">
                {mounted && currentUser ? (
                  <Button variant="outline" className="w-full justify-start gap-2 h-12" onClick={() => { store.logout(); setOpen(false); }}>
                    <User className="w-5 h-5" /> Logout ({currentUser.name})
                  </Button>
                ) : mounted ? (
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <Button variant="outline" className="w-full justify-start gap-2 h-12">
                      <User className="w-5 h-5" /> Login / Register
                    </Button>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-background/80 backdrop-blur-lg border-t border-border px-6 py-2 flex items-center justify-between pb-safe-area-inset-bottom">
        <button onClick={() => setShowSearch(!showSearch)} className={`flex flex-col items-center gap-1 transition-colors ${showSearch ? 'text-primary' : 'text-muted-foreground'}`}>
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-medium">Search</span>
        </button>

        <Link href={mounted && currentUser ? "/login" : "/login"} className="flex flex-col items-center gap-1 text-muted-foreground">
          <User className="w-5 h-5" />
          <span className="text-[10px] font-medium">{mounted && currentUser ? currentUser.name.split(" ")[0] : "Login"}</span>
        </Link>

        <Link href="/wishlist" className="flex flex-col items-center gap-1 text-muted-foreground">
          <div className="relative">
            <Heart className="w-5 h-5" />
            {mounted && wishlist.length > 0 && <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{wishlist.length}</span>}
          </div>
          <span className="text-[10px] font-medium">Wishlist</span>
        </Link>

        <Link href="/cart" className="flex flex-col items-center gap-1 text-muted-foreground">
          <div className="relative">
            <ShoppingCart className="w-5 h-5" />
            {mounted && cartCount > 0 && <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
          </div>
          <span className="text-[10px] font-medium">Cart</span>
        </Link>

        <button onClick={() => store.toggleDark()} className="flex flex-col items-center gap-1 text-muted-foreground">
          {mounted && (dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />)}
          <span className="text-[10px] font-medium">{mounted ? (dark ? "Light" : "Dark") : "..."}</span>
        </button>
      </div>
    </>
  );
}
