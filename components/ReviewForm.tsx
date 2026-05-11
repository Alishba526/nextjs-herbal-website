"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addReview } from "@/lib/reviews";
import { alert } from "@/lib/alert";
import { Star } from "lucide-react";

export function ReviewForm({ productId }: { productId: string }) {
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) {
      alert.error("Please fill all fields");
      return;
    }
    addReview({ productId, name: name.trim(), rating, text: text.trim(), verified: false });
    alert.success("Review submitted!");
    setName("");
    setText("");
    setRating(5);
  };

  return (
    <form onSubmit={submit} className="bg-card border border-border rounded-2xl p-6 space-y-4">
      <h3 className="font-semibold text-lg">Write a Review</h3>
      <div>
        <Label className="mb-2 block">Rating</Label>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <button key={i} type="button" onClick={() => setRating(i + 1)}>
              <Star className={`w-6 h-6 ${i < rating ? "fill-gold text-gold" : "text-muted"}`} />
            </button>
          ))}
        </div>
      </div>
      <div>
        <Label className="mb-2 block">Name</Label>
        <Input value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div>
        <Label className="mb-2 block">Review</Label>
        <Textarea value={text} onChange={e => setText(e.target.value)} rows={4} required />
      </div>
      <Button type="submit" className="w-full rounded-full">Submit Review</Button>
    </form>
  );
}
