"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProduct, PRODUCTS, currencySymbol, Product, useProducts } from "@/lib/products";
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

export function ProductDetail({ slug }: { slug: string }) {
  const { products } = useProducts();
  const product = products.find(p => p.slug === slug);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [qty, setQty] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);
  const { currentUser } = useStore();
  const [selectedVars, setSelectedVars] = useState<Record<string, string>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="p-20 text-center text-muted-foreground">Loading product...</div>;

  if (!product) {
    return (
      <div className="p-20 text-center">
        <h1 className="text-2xl font-serif">Product not found</h1>
        <Link href="/shop" className="text-primary hover:underline mt-4 inline-block">Back to shop</Link>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.image];
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

      <div className="grid lg:grid-cols-[minmax(0,400px)_1fr] gap-10">
        <div>
          <div className="aspect-[4/3] bg-secondary rounded-2xl overflow-hidden mb-3 group max-w-[400px] p-4 md:p-6 flex items-center justify-center">
            <Image src={images[imgIdx]} alt={product.title} width={400} height={300} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {images.map((img, i) => (
              <button key={i} onClick={() => setImgIdx(i)}
                className={`w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden border-2 p-1 transition ${i === imgIdx ? "border-primary" : "border-border hover:border-primary/50"}`}>
                <Image src={img} alt="" width={56} height={56} className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-primary font-semibold uppercase tracking-wider">{product.category}</p>
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
            {product.oldPrice && <span className="text-muted-foreground line-through text-lg">{cur}{fmt(product.oldPrice)}</span>}
            {currentTier && currentTier.price !== product.price && (
              <span className="text-xs bg-gold/15 text-gold px-2 py-0.5 rounded-full font-semibold">Bulk price</span>
            )}
          </div>
          <p className={`text-sm mt-2 font-medium ${product.stock > 0 ? "text-green-600" : "text-destructive"}`}>
            {product.stock > 0 ? `✓ In Stock (${product.stock} units left)` : "Out of Stock"}
          </p>

          {product.variations && product.variations.length > 0 && (
            <div className="mt-6 space-y-4">
              {product.variations.map(v => (
                <div key={v.label}>
                  <p className="text-sm font-semibold mb-2">
                    {v.label}: <span className="font-normal text-muted-foreground">{selectedVars[v.label] ?? <span className="text-destructive">Select...</span>}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {v.options.map(opt => {
                      const mult = v.label === "Weight" ? (WEIGHT_MULTIPLIER[opt] ?? 1) : 1;
                      const showPrice = v.label === "Weight";
                      return (
                        <button key={opt} onClick={() => setSelectedVars(s => ({ ...s, [v.label]: opt }))}
                          className={`px-4 py-2 rounded-full text-xs font-medium border transition ${selectedVars[v.label] === opt ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}>
                          {opt}{showPrice && <span className="ml-1 opacity-80">· {cur}{fmt(product.price * mult)}</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
              {!allSelected && <p className="text-xs text-destructive/80 italic flex items-center gap-1"><Lock className="w-3 h-3" /> Please select all options to continue.</p>}
            </div>
          )}

          <p className="text-muted-foreground mt-6 leading-relaxed text-sm md:text-base">{product.description}</p>

          <div className="flex items-center gap-4 mt-8">
            <div className="flex items-center bg-secondary rounded-full p-1">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-background rounded-full transition"><Minus className="w-4 h-4" /></button>
              <span className="w-10 text-center font-bold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-background rounded-full transition"><Plus className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <Button size="lg" disabled={!allSelected} className="rounded-full flex-1 h-12 text-base font-bold shadow-soft" onClick={doAddToCart}>
              {allSelected ? "Add to Cart" : "Select Options"}
            </Button>
            <Button size="lg" variant="secondary" disabled={!allSelected} className="rounded-full flex-1 h-12 text-base font-bold shadow-soft" onClick={doBuyNow}>
              Buy It Now
            </Button>
            <Button size="lg" variant="outline" className="rounded-full h-12 w-12 p-0" onClick={() => { store.toggleWishlist(product); alert.success("Added to wishlist"); }}>
              <Heart className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-8 pt-8 border-t border-border text-[10px] md:text-xs">
            {[[Truck, "Free Shipping"], [ShieldCheck, "Secure Checkout"], [Award, "100% Organic"]].map(([Icon, t]: any, i) => (
              <div key={i} className="flex flex-col items-center gap-2 text-center text-muted-foreground"><Icon className="w-6 h-6 text-primary" /><span>{t}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16">
        <Tabs defaultValue="desc" className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto flex-nowrap h-auto p-1 bg-secondary/50 rounded-xl scrollbar-hide border border-border/50">
            <TabsTrigger value="desc" className="rounded-lg py-2.5 px-6 data-[state=active]:shadow-soft">Description</TabsTrigger>
            <TabsTrigger value="benefits" className="rounded-lg py-2.5 px-6 data-[state=active]:shadow-soft">Benefits</TabsTrigger>
            <TabsTrigger value="ingredients" className="rounded-lg py-2.5 px-6 data-[state=active]:shadow-soft">Ingredients</TabsTrigger>
            <TabsTrigger value="usage" className="rounded-lg py-2.5 px-6 data-[state=active]:shadow-soft">Usage</TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-lg py-2.5 px-6 data-[state=active]:shadow-soft">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="desc" className="prose max-w-none mt-8 text-muted-foreground leading-relaxed animate-in fade-in duration-500">{product.description}</TabsContent>
          <TabsContent value="benefits" className="mt-8 animate-in slide-in-from-bottom-4 duration-500"><ul className="grid sm:grid-cols-2 gap-4">{product.benefits.map((b: string) => <li key={b} className="flex items-start gap-3 bg-secondary/30 p-4 rounded-xl text-sm"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" />{b}</li>)}</ul></TabsContent>
          <TabsContent value="ingredients" className="mt-8 animate-in fade-in duration-500"><div className="flex flex-wrap gap-3">{product.ingredients.map((i: string) => <span key={i} className="bg-secondary px-4 py-2 rounded-full text-sm font-medium border border-border/50">{i}</span>)}</div></TabsContent>
          <TabsContent value="usage" className="mt-8 text-muted-foreground leading-relaxed animate-in fade-in duration-500 bg-secondary/20 p-6 rounded-2xl italic border-l-4 border-primary">{product.usage}</TabsContent>
          <TabsContent value="reviews" className="mt-8 animate-in fade-in duration-500"><ReviewsTab productId={product.id} /></TabsContent>
        </Tabs>
      </div>

      <div className="mt-20">
        <h2 className="text-2xl md:text-3xl font-bold font-serif mb-8 text-center">You May Also Like</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {products.filter(p => p.id !== product.id).slice(0, 4).map(p => <ProductCard key={p.id} product={p} compact />)}
        </div>
      </div>
    </div>
  );
}

function CheckCircle2(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle-2"><path d="M12 22c5.523 0 9-4.477 9-10S17.523 2 12 2 3 6.477 3 12s3.477 10 9 10z"/><path d="m9 12 2 2 4-4"/></svg>;
}

function ReviewsTab({ productId }: { productId: string }) {
  const reviews = useReviews(productId);
  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div className="space-y-6">
        <h3 className="font-bold text-xl flex items-center gap-2">Customer Feedback <span className="text-sm font-normal text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{reviews.length}</span></h3>
        {reviews.length === 0 && <p className="text-sm text-muted-foreground italic bg-secondary/20 p-6 rounded-2xl border border-dashed border-border">No reviews yet. Be the first to share your experience!</p>}
        <div className="space-y-4 overflow-y-auto max-h-[600px] pr-2 scrollbar-hide">
          {reviews.map(r => (
            <div key={r.id} className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-300">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-bold text-sm flex items-center gap-1">{r.name} {r.verified && <CheckCircle2 className="w-3.5 h-3.5 text-primary" />}</p>
                  <p className="text-[10px] text-muted-foreground">{new Date(r.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex">{Array.from({ length: 5 }).map((_, j) => <Star key={j} className={`w-3.5 h-3.5 ${j < r.rating ? "fill-gold text-gold" : "text-muted"}`} />)}</div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed italic">"{r.text}"</p>
              {r.image && <div className="mt-4 rounded-xl overflow-hidden border border-border inline-block"><Image src={r.image} alt="" width={128} height={128} className="w-32 h-32 object-cover hover:scale-110 transition duration-500" /></div>}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-secondary/10 p-6 md:p-8 rounded-3xl border border-border/50">
        <ReviewForm productId={productId} />
      </div>
    </div>
  );
}
