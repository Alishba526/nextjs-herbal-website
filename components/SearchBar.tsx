"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PRODUCTS } from "@/lib/products";
import Image from "next/image";

export function SearchBar({ className = "", autoFocus = false }: { className?: string; autoFocus?: boolean }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const results = q.trim()
    ? PRODUCTS.filter(p =>
        p.title.toLowerCase().includes(q.toLowerCase()) ||
        p.category.toLowerCase().includes(q.toLowerCase())
      ).slice(0, 6)
    : [];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) {
      router.push(`/shop?q=${encodeURIComponent(q.trim())}`);
      setOpen(false);
    }
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <form onSubmit={submit}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          autoFocus={autoFocus}
          value={q}
          onChange={e => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Search herbal products..."
          className="pl-9 pr-9 rounded-full bg-secondary border-0"
        />
        {q && (
          <button type="button" onClick={() => { setQ(""); setOpen(false); }}
            className="absolute right-3 top-1/2 -translate-y-1/2">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </form>
      {open && q.trim() && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-2xl shadow-glow overflow-hidden z-50 max-h-[400px] overflow-y-auto">
          {results.length === 0 ? (
            <div className="p-4 text-sm text-muted-foreground text-center">No products found for &quot;{q}&quot;</div>
          ) : (
            <>
              {results.map(p => (
                <Link key={p.id} href={`/product/${p.slug}`}
                  onClick={() => { setQ(""); setOpen(false); }}
                  className="flex items-center gap-3 p-3 hover:bg-secondary border-b border-border last:border-0">
                  <Image src={p.image} alt={p.title} width={48} height={48} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{p.title}</p>
                    <p className="text-xs text-muted-foreground">{p.category}</p>
                  </div>
                  <p className="font-bold text-primary text-sm">${p.price.toFixed(2)}</p>
                </Link>
              ))}
              <button onClick={submit} className="w-full p-3 text-center text-sm text-primary font-semibold hover:bg-secondary">
                See all results →
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
