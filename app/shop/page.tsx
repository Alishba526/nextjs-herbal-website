"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS, CATEGORY_LIST } from "@/lib/products";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE = 9;

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [q, setQ] = useState(searchParams.get("q") || "");
  const [price, setPrice] = useState<number[]>([0, 100]);
  const [minRating, setMinRating] = useState(0);

  const category = searchParams.get("category") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const sort = searchParams.get("sort") || "featured";

  useEffect(() => { setQ(searchParams.get("q") || ""); }, [searchParams]);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter(p =>
      p.title.toLowerCase().includes(q.toLowerCase()) &&
      (!category || p.category === category) &&
      p.price >= price[0] && p.price <= price[1] &&
      p.rating >= minRating
    );
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [q, category, sort, price, minRating]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const updateSearch = (patch: any) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(patch).forEach(([key, value]) => {
      if (value) params.set(key, String(value));
      else params.delete(key);
    });
    params.set("page", "1");
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold font-serif mb-2">Herbal Shop</h1>
      <p className="text-muted-foreground mb-8">{filtered.length} products available{category && ` in ${category}`}</p>

      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="space-y-6">
          <div className="bg-card rounded-2xl p-5 border border-border">
            <h3 className="font-semibold mb-3">Search</h3>
            <form onSubmit={e => { e.preventDefault(); updateSearch({ q }); }} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search..." className="pl-9" />
            </form>
          </div>
          <div className="bg-card rounded-2xl p-5 border border-border">
            <h3 className="font-semibold mb-3">Categories</h3>
            <ul className="space-y-1.5 text-sm max-h-64 overflow-y-auto">
              <li><button onClick={() => updateSearch({ category: "" })} className={`hover:text-primary ${!category ? "text-primary font-semibold" : ""}`}>All</button></li>
              {CATEGORY_LIST.map((c: any) => (
                <li key={c.name}><button onClick={() => updateSearch({ category: c.name })} className={`hover:text-primary text-left ${category === c.name ? "text-primary font-semibold" : ""}`}>{c.name}</button></li>
              ))}
            </ul>
          </div>
          <div className="bg-card rounded-2xl p-5 border border-border">
            <h3 className="font-semibold mb-3">Price: ${price[0]} – ${price[1]}</h3>
            <Slider value={price} onValueChange={setPrice} min={0} max={100} step={1} />
          </div>
          <div className="bg-card rounded-2xl p-5 border border-border">
            <h3 className="font-semibold mb-3">Minimum Rating</h3>
            <div className="flex flex-wrap gap-2">
              {[0, 3, 4, 4.5].map(r => (
                <button key={r} onClick={() => setMinRating(r)} className={`px-3 py-1 rounded-full text-xs border ${minRating === r ? "bg-primary text-primary-foreground border-primary" : "border-border"}`}>
                  {r === 0 ? "All" : `${r}+`}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <p className="text-sm text-muted-foreground">Showing {paged.length} of {filtered.length}</p>
            <select value={sort}
              onChange={e => updateSearch({ sort: e.target.value })}
              className="bg-card border border-border rounded-full px-4 py-2 text-sm">
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {paged.length === 0 ? (
            <div className="text-center py-20 bg-card rounded-2xl border border-border">
              <p className="text-muted-foreground">No products match your filters.</p>
              <Button variant="link" onClick={() => router.push("/shop")}>Reset filters</Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {paged.map(p => <ProductCard key={p.id} product={p} compact />)}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <Button variant="outline" size="icon" disabled={currentPage === 1}
                onClick={() => updateSearch({ page: currentPage - 1 })}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <Button key={i} variant={currentPage === i + 1 ? "default" : "outline"} size="sm"
                  onClick={() => updateSearch({ page: i + 1 })}>
                  {i + 1}
                </Button>
              ))}
              <Button variant="outline" size="icon" disabled={currentPage === totalPages}
                onClick={() => updateSearch({ page: currentPage + 1 })}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-12"><p>Loading...</p></div>}>
      <ShopContent />
    </Suspense>
  );
}
