"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProduct, PRODUCTS, currencySymbol } from "@/lib/products";
import { store, useStore } from "@/lib/store";
import { alert } from "@/lib/alert";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/ProductCard";
import { ReviewForm } from "@/components/ReviewForm";
import { useReviews } from "@/lib/reviews";
import { Star, Heart, Minus, Plus, ShieldCheck, Truck, Award, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const WEIGHT_MULTIPLIER: Record<string, number> = {
  "1000 mL": 1, "500 mL": 0.5, "250 mL": 0.25,
};

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProduct(slug);
  const router = useRouter();

  const [qty, setQty] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);
  const { currentUser } = useStore();

  if (!product) {
    return (
      <div className="p-20 text-center">
        <h1 className="text-2xl">Product not found</h1>
        <Link href="/shop" className="text-primary">Back to shop</Link>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.image, product.image, product.image];
  const [selectedVars, setSelectedVars] = useState<Record<string, string>>({});
  const allSelected = (product.variations ?? []).every(v => selectedVars[v.label]);
  const weightMult = selectedVars["Weight"] ? (WEIGHT_MULTIPLIER[selectedVars["Weight"]] ?? 1) : 1;
  const currentTier = product.tierPricing?.slice().reverse().find(t => qty >= t.min);
  const basePrice = currentTier?.price ?? product.price;
  const unitPrice = +(basePrice * weightMult).toFixed(2);
  const cur = currencySymbol(product.currency);
  const fmt = (n: number) => n.toFixed(2);

  const requireSelectMsg = !allSelected ? "Please select all options first" : null;

  const doAddToCart = () => {
    if (requireSelectMsg) { alert.error(requireSelectMsg); return; }
    const variant = { ...product, price: unitPrice, title: product.title + (selectedVars["Weight"] ? ` — ${selectedVars["Weight"]}` : "") + (selectedVars["Color"] ? ` (${selectedVars["Color"]})` : "") };
    store.addToCart(variant, qty);
    alert.cart(variant.title);
  };
  const doBuyNow = () => {
    if (requireSelectMsg) { alert.error(requireSelectMsg); return; }
    if (!currentUser) { alert.error("Please login first", "Sign in to place an order"); router.push("/login"); return; }
    const variant = { ...product, price: unitPrice, title: product.title + (selectedVars["Weight"] ? ` — ${selectedVars["Weight"]}` : "") + (selectedVars["Color"] ? ` (${selectedVars["Color"]})` : "") };
    store.addToCart(variant, qty);
    router.push("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <nav className="text-xs text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">Home</Link> / <Link href="/shop" className="hover:text-primary">Shop</Link> / <span>{product.title}</span>
      </nav>

      <div className="grid lg:grid-cols-[minmax(0,420px)_1fr] gap-10">
        <div>
          <div className="aspect-square bg-secondary rounded-2xl overflow-hidden mb-3 group max-w-[420px]">
            <Image src={images[imgIdx]} alt={product.title} width={420} height={420} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          </div>
          <div className="flex gap-2">
            {images.map((img, i) => (
              <button key={i} onClick={() => setImgIdx(i)}
                className={`w-14 h-14 rounded-lg overflow-hidden border-2 ${i === imgIdx ? "border-primary" : "border-border"}`}>
                <Image src={img} alt="" width={56} height={56} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-primary font-semibold uppercase">{product.category}</p>
          <h1 className="text-3xl md:text-4xl font-bold font-serif mt-2">{product.title}</h1>
          <div className="flex items-center gap-3 mt-3">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? "fill-gold text-gold" : "text-muted"}`} />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">{product.rating} • {product.reviews} reviews</span>
          </div>

          <div className="flex items-baseline gap-3 mt-5">
            <span className="text-3xl font-bold text-primary">{cur}{fmt(unitPrice)}</span>
            {product.oldPrice && <span className="text-muted-foreground line-through">{cur}{fmt(product.oldPrice)}</span>}
            {currentTier && currentTier.price !== product.price && (
              <span className="text-xs bg-gold/15 text-gold px-2 py-0.5 rounded-full font-semibold">Bulk price</span>
            )}
          </div>
          <p className={`text-sm mt-2 ${product.stock > 0 ? "text-primary" : "text-destructive"}`}>
            {product.stock > 0 ? `✓ In Stock (${product.stock} left)` : "Out of Stock"}
          </p>

          {product.variations && (
            <div className="mt-5 space-y-3">
              {product.variations.map(v => (
                <div key={v.label}>
                  <p className="text-sm font-semibold mb-1.5">
                    {v.label}: <span className="font-normal text-muted-foreground">{selectedVars[v.label] ?? <span className="text-destructive">Please select</span>}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {v.options.map(opt => {
                      const mult = v.label === "Weight" ? (WEIGHT_MULTIPLIER[opt] ?? 1) : 1;
                      const showPrice = v.label === "Weight";
                      return (
                        <button key={opt} onClick={() => setSelectedVars(s => ({ ...s, [v.label]: opt }))}
                          className={`px-3 py-1.5 rounded-full text-xs border transition ${selectedVars[v.label] === opt ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}>
                          {opt}{showPrice && <span className="ml-1 opacity-80">· {cur}{fmt(product.price * mult)}</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
              {!allSelected && <p className="text-xs text-destructive">⚠ Please select all options before adding to cart.</p>}
            </div>
          )}

          <p className="text-muted-foreground mt-5 leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center bg-secondary rounded-full">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center"><Minus className="w-4 h-4" /></button>
              <span className="w-10 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center"><Plus className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-5">
            <Button size="lg" disabled={!allSelected} className="rounded-full flex-1 min-w-[160px]" onClick={doAddToCart}>
              {allSelected ? "Add to Cart" : <><Lock className="w-4 h-4 mr-1" /> Select options</>}
            </Button>
            <Button size="lg" variant="secondary" disabled={!allSelected} className="rounded-full flex-1 min-w-[160px]" onClick={doBuyNow}>
              Buy Now
            </Button>
            <Button size="lg" variant="outline" className="rounded-full" onClick={() => { store.toggleWishlist(product); alert.success("Added to wishlist"); }}>
              <Heart className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-7 pt-6 border-t border-border text-xs">
            {[[Truck, "Free Shipping"], [ShieldCheck, "Secure Pay"], [Award, "100% Organic"]].map(([Icon, t]: any, i) => (
              <div key={i} className="flex items-center gap-2"><Icon className="w-5 h-5 text-primary" /><span>{t}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-14">
        <Tabs defaultValue="desc" className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto flex-nowrap h-auto p-1 bg-secondary/50 rounded-xl scrollbar-hide">
            <TabsTrigger value="desc" className="rounded-lg py-2 px-4">Description</TabsTrigger>
            <TabsTrigger value="benefits" className="rounded-lg py-2 px-4">Benefits</TabsTrigger>
            <TabsTrigger value="ingredients" className="rounded-lg py-2 px-4">Ingredients</TabsTrigger>
            <TabsTrigger value="usage" className="rounded-lg py-2 px-4">Usage</TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-lg py-2 px-4">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="desc" className="prose max-w-none mt-6 text-muted-foreground leading-relaxed">{product.description}</TabsContent>
          <TabsContent value="benefits" className="mt-6"><ul className="space-y-2">{product.benefits.map((b: string) => <li key={b} className="flex gap-2"><span className="text-primary">✓</span>{b}</li>)}</ul></TabsContent>
          <TabsContent value="ingredients" className="mt-6"><div className="flex flex-wrap gap-2">{product.ingredients.map((i: string) => <span key={i} className="bg-secondary px-3 py-1 rounded-full text-sm">{i}</span>)}</div></TabsContent>
          <TabsContent value="usage" className="mt-6 text-muted-foreground">{product.usage}</TabsContent>
          <TabsContent value="reviews" className="mt-6"><ReviewsTab productId={product.id} /></TabsContent>
        </Tabs>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold font-serif mb-6">You May Also Like</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.filter(p => p.id !== product.id).slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}

function ReviewsTab({ productId }: { productId: string }) {
  const reviews = useReviews(productId);
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Customer Reviews ({reviews.length})</h3>
        {reviews.length === 0 && <p className="text-sm text-muted-foreground">No reviews yet. Be the first!</p>}
        {reviews.map(r => (
          <div key={r.id} className="bg-card border border-border rounded-2xl p-5">
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold text-sm">{r.name} {r.verified && <span className="text-[10px] text-primary ml-1">✓ Verified</span>}</p>
              <div className="flex">{Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-gold text-gold" />)}</div>
            </div>
            <p className="text-sm text-muted-foreground">{r.text}</p>
            {r.image && <Image src={r.image} alt="" width={128} height={128} className="mt-3 w-32 h-32 object-cover rounded-lg" />}
            <p className="text-[10px] text-muted-foreground mt-2">{new Date(r.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
      <ReviewForm productId={productId} />
    </div>
  );
}








































































































































