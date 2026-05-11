"use client";

import { useState, useEffect } from "react";

export type Review = {
  id: string;
  productId: string;
  name: string;
  rating: number;
  text: string;
  image?: string;
  verified: boolean;
  createdAt: number;
};

const KEY = "growzix-reviews-v1";

const loadReviews = (): Review[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
};

let reviews: Review[] = loadReviews();

export const addReview = (r: Omit<Review, "id" | "createdAt">) => {
  const review: Review = { ...r, id: crypto.randomUUID(), createdAt: Date.now() };
  reviews = [review, ...reviews];
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(reviews));
  window.dispatchEvent(new Event("growzix-reviews-update"));
  return review;
};

export const useReviews = (productId: string) => {
  const [list, setList] = useState(reviews.filter(r => r.productId === productId));
  useEffect(() => {
    const update = () => setList(reviews.filter(r => r.productId === productId));
    window.addEventListener("growzix-reviews-update", update);
    return () => window.removeEventListener("growzix-reviews-update", update);
  }, [productId]);
  return list;
};
