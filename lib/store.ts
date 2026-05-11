"use client";

import { useEffect, useState } from "react";
import type { Product } from "./products";

type CartItem = { product: Product; qty: number };

export type Customer = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: number;
};

export type OrderStatus = "pending" | "confirmed" | "shipping" | "delivered" | "cancelled";

export type Order = {
  id: string;
  customerEmail: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  items: { id: string; title: string; price: number; qty: number; image: string }[];
  total: number;
  payment: string;
  status: OrderStatus;
  createdAt: number;
};

export type Offer = {
  id: string;
  title: string;
  description: string;
  discount: string;
  createdAt: number;
  notifiedCount?: number;
};

export type SiteSettings = {
  whatsappNumber: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  social: { facebook: string; twitter: string; instagram: string };
};

type State = {
  cart: CartItem[];
  wishlist: Product[];
  dark: boolean;
  currentUser: Customer | null;
  isAdmin: boolean;
  customers: Customer[];
  orders: Order[];
  offers: Offer[];
  settings: SiteSettings;
};

const KEY = "growzix-store-v3";
const ADMIN_EMAIL = "admin@growzix.com";
const ADMIN_PASSWORD = "Admin@1234";

const DEFAULT_SETTINGS: SiteSettings = {
  whatsappNumber: "12818021541",
  contactPhone: "+1 281 802 1541",
  contactEmail: "hello@growzixnatural.com",
  contactAddress: "850 Will Clayton Pkwy, Humble, Texas, 77338",
  social: { facebook: "#", twitter: "#", instagram: "#" },
};

let state: State = {
  cart: [], wishlist: [], dark: false,
  currentUser: null, isAdmin: false,
  customers: [], orders: [], offers: [],
  settings: DEFAULT_SETTINGS,
};
const listeners = new Set<() => void>();

if (typeof window !== "undefined") {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      state = { ...state, ...parsed, settings: { ...DEFAULT_SETTINGS, ...(parsed.settings || {}), social: { ...DEFAULT_SETTINGS.social, ...((parsed.settings && parsed.settings.social) || {}) } } };
    }
    if (state.dark) document.documentElement.classList.add("dark");
  } catch {}
}

const persist = () => {
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(state));
  listeners.forEach(l => l());
};

export const store = {
  subscribe: (l: () => void) => { listeners.add(l); return () => { listeners.delete(l); }; },
  get: () => state,

  addToCart: (product: Product, qty = 1) => {
    const existing = state.cart.find(c => c.product.id === product.id);
    if (existing) existing.qty += qty;
    else state.cart = [...state.cart, { product, qty }];
    state = { ...state }; persist();
  },
  removeFromCart: (id: string) => { state = { ...state, cart: state.cart.filter(c => c.product.id !== id) }; persist(); },
  setQty: (id: string, qty: number) => { state = { ...state, cart: state.cart.map(c => c.product.id === id ? { ...c, qty: Math.max(1, qty) } : c) }; persist(); },
  clearCart: () => { state = { ...state, cart: [] }; persist(); },

  toggleWishlist: (product: Product) => {
    const exists = state.wishlist.some(p => p.id === product.id);
    state = { ...state, wishlist: exists ? state.wishlist.filter(p => p.id !== product.id) : [...state.wishlist, product] };
    persist();
  },
  toggleDark: () => {
    state = { ...state, dark: !state.dark };
    if (typeof document !== "undefined") document.documentElement.classList.toggle("dark", state.dark);
    persist();
  },

  registerCustomer: (name: string, email: string, password: string): { ok: boolean; error?: string } => {
    if (state.customers.some(c => c.email.toLowerCase() === email.toLowerCase()))
      return { ok: false, error: "Email already registered" };
    const c: Customer = { id: crypto.randomUUID(), name, email, password, createdAt: Date.now() };
    state = { ...state, customers: [...state.customers, c], currentUser: c, isAdmin: false };
    persist();
    return { ok: true };
  },
  loginCustomer: (email: string, password: string): { ok: boolean; error?: string } => {
    const c = state.customers.find(c => c.email.toLowerCase() === email.toLowerCase() && c.password === password);
    if (!c) return { ok: false, error: "Invalid email or password" };
    state = { ...state, currentUser: c, isAdmin: false }; persist();
    return { ok: true };
  },
  logout: () => { state = { ...state, currentUser: null, isAdmin: false }; persist(); },

  loginAdmin: (email: string, password: string): { ok: boolean; error?: string } => {
    if (email.toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      state = { ...state, isAdmin: true, currentUser: null }; persist();
      return { ok: true };
    }
    return { ok: false, error: "Invalid admin credentials" };
  },

  placeOrder: (data: Omit<Order, "id" | "createdAt" | "status">): Order => {
    const order: Order = { ...data, id: "ORD-" + Date.now().toString(36).toUpperCase(), status: "pending", createdAt: Date.now() };
    state = { ...state, orders: [order, ...state.orders], cart: [] };
    persist();
    return order;
  },
  setOrderStatus: (id: string, status: OrderStatus) => {
    state = { ...state, orders: state.orders.map(o => o.id === id ? { ...o, status } : o) };
    persist();
  },
  deleteOrder: (id: string) => {
    state = { ...state, orders: state.orders.filter(o => o.id !== id) };
    persist();
  },

  createOffer: (title: string, description: string, discount: string): Offer => {
    const offer: Offer = { id: crypto.randomUUID(), title, description, discount, createdAt: Date.now() };
    state = { ...state, offers: [offer, ...state.offers] }; persist();
    return offer;
  },
  notifyOffer: (id: string): { count: number; mailto: string; emails: string[] } => {
    const count = state.customers.length;
    const offer = state.offers.find(o => o.id === id);
    state = { ...state, offers: state.offers.map(o => o.id === id ? { ...o, notifiedCount: count } : o) };
    persist();
    const emails = state.customers.map(c => c.email);
    const subject = encodeURIComponent(`🎉 New Offer: ${offer?.title || ""}`);
    const body = encodeURIComponent(`Hi,\n\nWe have a new offer for you on Growzix Natural!\n\n${offer?.title}\n${offer?.discount ? "Discount: " + offer.discount + "\n" : ""}\n${offer?.description}\n\nVisit our store now.\n\n— Growzix Natural`);
    const mailto = `mailto:?bcc=${emails.join(",")}&subject=${subject}&body=${body}`;
    return { count, mailto, emails };
  },
  deleteOffer: (id: string) => {
    state = { ...state, offers: state.offers.filter(o => o.id !== id) };
    persist();
  },

  updateSettings: (patch: Partial<SiteSettings>) => {
    state = { ...state, settings: { ...state.settings, ...patch, social: { ...state.settings.social, ...(patch.social || {}) } } };
    persist();
  },
};

export const ADMIN_CREDENTIALS = { email: ADMIN_EMAIL, password: ADMIN_PASSWORD };

export const useStore = () => {
  const [s, setS] = useState(state);
  useEffect(() => store.subscribe(() => setS({ ...store.get() })), []);
  return s;
};
