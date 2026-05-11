"use client";

import Link from "next/link";
import { ShoppingCart, Heart, User, Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
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
  const cartCount = cart.reduce((a, c) => a + c.qty, 0);

  return (
    <header className="sticky top-0 z-50 glass border-b border-border">
      <div className="bg-primary text-primary-foreground text-xs py-2 text-center px-4">
        🌿 Premium Herbal Hair Care — Free Shipping on Every Order
      </div>
      <nav className="max-w-7xl mx-auto px-4 h-24 md:h-28 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/assets/logo.png" alt="Growzix Natural" width={96} height={96} className="h-20 md:h-24 w-auto object-contain" />
        </Link>

        <ul className="hidden lg:flex items-center gap-7 ml-4">
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

        <div className="flex items-center gap-1 ml-auto">
          <Button variant="ghost" size="icon" onClick={() => store.toggleDark()} aria-label="Theme">
            {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          <Link href="/wishlist" className="relative p-2 rounded-md hover:bg-accent">
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{wishlist.length}</span>}
          </Link>
          <Link href="/cart" className="relative p-2 rounded-md hover:bg-accent">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>}
          </Link>
          {currentUser ? (
            <button onClick={() => store.logout()} className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-secondary text-xs font-medium hover:bg-accent" title={`Logged in as ${currentUser.name}`}>
              <User className="w-4 h-4" /> {currentUser.name.split(" ")[0]}
            </button>
          ) : (
            <Link href="/login" className="p-2 rounded-md hover:bg-accent hidden sm:block">
              <User className="w-5 h-5" />
            </Link>
          )}
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </nav>
      {open && (
        <div className="lg:hidden border-t border-border bg-background px-4 py-4 space-y-3">
          {NAV.map(n => (
            <Link key={n.to} href={n.to} onClick={() => setOpen(false)} className="block py-2 text-sm font-medium">
              {n.label}
            </Link>
          ))}
          <SearchBar />
        </div>
      )}
    </header>
  );
}
