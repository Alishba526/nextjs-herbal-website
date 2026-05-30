"use client";

import { useEffect, useState } from "react";
import { Product, DEFAULT_PRODUCTS, DEFAULT_CATEGORIES } from "./data";
import { supabase } from "./supabase";

export * from "./data";

export const currencySymbol = (_c?: "USD") => "$";
export const formatPrice = (n: number) => `$${n.toFixed(2)}`;

// ---- Dynamic store (Supabase & localStorage backed) ----
const PROD_KEY = "growzix-products-v2";
const CAT_KEY = "growzix-categories-v2";

const loadLocalProducts = (): Product[] => {
  if (typeof window === "undefined") return DEFAULT_PRODUCTS;
  let current = DEFAULT_PRODUCTS;
  try {
    const raw = localStorage.getItem(PROD_KEY);
    if (raw) {
      const stored: Product[] = JSON.parse(raw);
      // Merge: Stored products + any NEW defaults that aren't in stored
      const missingDefaults = DEFAULT_PRODUCTS.filter(dp => !stored.find(sp => sp.id === dp.id));
      current = [...stored, ...missingDefaults];
    }
  } catch {}
  return current;
};

const loadLocalCategories = () => {
  if (typeof window === "undefined") return DEFAULT_CATEGORIES;
  let current = DEFAULT_CATEGORIES;
  try {
    const raw = localStorage.getItem(CAT_KEY);
    if (raw) {
      const stored: typeof DEFAULT_CATEGORIES = JSON.parse(raw);
      // Merge: Stored categories + any NEW defaults
      const missingDefaults = DEFAULT_CATEGORIES.filter(dc => !stored.find(sc => sc.name === dc.name));
      current = [...stored, ...missingDefaults];
    }
  } catch {}
  return current;
};

export let PRODUCTS: Product[] = loadLocalProducts();
export let CATEGORY_LIST = loadLocalCategories();
export const CATEGORIES = CATEGORY_LIST;

// Initial sync from Supabase
export const syncFromSupabase = async () => {
  try {
    const { data: dbProducts } = await supabase.from('products').select('*');
    if (dbProducts && dbProducts.length > 0) {
      // Find default products missing from DB and upsert them
      const missingFromDB = DEFAULT_PRODUCTS.filter(dp => !dbProducts.find(p => p.id === dp.id));
      if (missingFromDB.length > 0) {
        await supabase.from('products').upsert(missingFromDB);
      }
      
      const finalProducts = [...dbProducts, ...missingFromDB];
      PRODUCTS = finalProducts;
      if (typeof window !== "undefined") localStorage.setItem(PROD_KEY, JSON.stringify(finalProducts));
    }

    const { data: dbCategories } = await supabase.from('categories').select('*');
    if (dbCategories && dbCategories.length > 0) {
      // Find default categories missing from DB and upsert them
      const missingFromDB = DEFAULT_CATEGORIES.filter(dc => !dbCategories.find(c => c.name === dc.name));
      if (missingFromDB.length > 0) {
        await supabase.from('categories').upsert(missingFromDB);
      }

      const finalCategories = [...dbCategories, ...missingFromDB];
      CATEGORY_LIST = finalCategories;
      if (typeof window !== "undefined") localStorage.setItem(CAT_KEY, JSON.stringify(finalCategories));
    }

    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("growzix-data-update"));
    }
  } catch (err) {
    console.error("Failed to sync from Supabase:", err);
  }
};

// Run sync on load if in browser
if (typeof window !== "undefined") {
  syncFromSupabase();
}

export const useProducts = () => {
  const [products, setProducts] = useState(PRODUCTS);
  const [categories, setCategories] = useState(CATEGORY_LIST);

  useEffect(() => {
    const handler = () => {
      setProducts([...PRODUCTS]);
      setCategories([...CATEGORY_LIST]);
    };
    window.addEventListener("growzix-data-update", handler);
    return () => window.removeEventListener("growzix-data-update", handler);
  }, []);

  return { products, categories };
};

export const saveProducts = async (list: Product[]) => {
  PRODUCTS = list;
  if (typeof window !== "undefined") localStorage.setItem(PROD_KEY, JSON.stringify(list));
  
  // Update Supabase
  try {
    const { error } = await supabase.from('products').upsert(list);
    if (error) throw error;
  } catch (err) {
    console.error("Supabase Save Error:", err);
  }

  window.dispatchEvent(new Event("growzix-data-update"));
};

export const saveCategories = async (list: typeof DEFAULT_CATEGORIES) => {
  CATEGORY_LIST = list;
  if (typeof window !== "undefined") localStorage.setItem(CAT_KEY, JSON.stringify(list));

  // Update Supabase
  try {
    const { error } = await supabase.from('categories').upsert(list);
    if (error) throw error;
  } catch (err) {
    console.error("Supabase Save Error:", err);
  }

  window.dispatchEvent(new Event("growzix-data-update"));
};

export const getProduct = (slug: string) => PRODUCTS.find(p => p.slug === slug);
