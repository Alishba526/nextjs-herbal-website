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

export default function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = store.loginCustomer(email, password);
    if (r.ok) { alert.success("Welcome back!"); router.push("/"); }
    else alert.error(r.error || "Login failed");
  };

  return (
    <AuthShell title="Welcome Back" subtitle="Login to continue shopping naturally">
      <form onSubmit={submit} className="space-y-4">
        <div><Label className="mb-2 block">Email</Label><Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" required /></div>
        <div>
          <Label className="mb-2 block">Password</Label>
          <div className="relative">
            <Input type={show ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2">{show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
          </div>
        </div>
        <div className="text-right text-sm"><Link href="/forgot-password" className="text-primary hover:underline">Forgot password?</Link></div>
        <Button type="submit" className="w-full rounded-full" size="lg">Sign In</Button>
        <p className="text-sm text-center text-muted-foreground">Don&apos;t have an account? <Link href="/register" className="text-primary font-semibold">Register</Link></p>
      </form>

      <div className="mt-6 pt-6 border-t border-border text-center">
        <Link href="/admin/login" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
          🔐 Admin Login
        </Link>
      </div>
    </AuthShell>
  );
}

function AuthShell({ title, subtitle, children }: any) {
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-card border border-border rounded-3xl p-8 shadow-soft">
        <div className="flex justify-center mb-4">
          <Image src="/assets/logo.png" alt="Growzix" width={80} height={80} className="h-20 w-auto object-contain" />
        </div>
        <h1 className="text-2xl font-bold font-serif text-center">{title}</h1>
        <p className="text-sm text-muted-foreground text-center mb-6">{subtitle}</p>
        {children}
      </div>
    </div>
  );
}
