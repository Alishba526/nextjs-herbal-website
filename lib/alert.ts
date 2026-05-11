"use client";

import Swal from "sweetalert2";

export const alert = {
  success: (title: string, text?: string) => Swal.fire({
    icon: "success", title, text, timer: 1800, showConfirmButton: false,
    background: "var(--background)", color: "var(--foreground)",
  }),
  error: (title: string, text?: string) => Swal.fire({
    icon: "error", title, text,
    background: "var(--background)", color: "var(--foreground)",
  }),
  cart: (name: string) => Swal.fire({
    icon: "success", title: "Added to Cart", text: name,
    timer: 1500, showConfirmButton: false, toast: true, position: "top-end",
    background: "var(--background)", color: "var(--foreground)",
  }),
};
