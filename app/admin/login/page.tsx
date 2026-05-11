"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { alert } from "@/lib/alert";
import { store } from "@/lib/store";
import Link from "next/link";
import Image from "next/image";

export default function AdminLogin() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("admin@growzix.com");
  const [password, setPassword] = useState("Admin@1234");
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = store.loginAdmin(email, password);
    if (r.ok) {
      alert.success("Admin login successful!");
      router.push("/admin");
    }
    else alert.error(r.error || "Invalid admin credentials");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/20 px-4">
      <div className="max-w-md w-full">
        <div className="bg-card border border-border rounded-3xl p-8 shadow-glow">
          <div className="flex justify-center mb-4">
            <Image src="/assets/logo.png" alt="Growzix" width={80} height={80} className="h-20 w-auto object-contain" />
          </div>
          <h1 className="text-2xl font-bold font-serif text-center">Admin Panel</h1>
          <p className="text-sm text-muted-foreground text-center mb-6">Login to manage Growzix</p>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label className="mb-2 block">Email</Label>
              <Input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@growzix.com"
                required
              />
            </div>
            <div>
              <Label className="mb-2 block">Password</Label>
              <div className="relative">
                <Input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full rounded-full" size="lg">
              Sign In
            </Button>
          </form>

          <div className="mt-6 p-4 bg-secondary/50 rounded-xl">
            <p className="text-xs font-semibold mb-2">🔑 Default Admin Credentials</p>
            <p className="text-xs text-muted-foreground">Email: admin@growzix.com</p>
            <p className="text-xs text-muted-foreground">Password: Admin@1234</p>
          </div>

          <div className="mt-4 text-center">
            <Link href="/" className="text-sm text-primary hover:underline">
              ← Back to website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
