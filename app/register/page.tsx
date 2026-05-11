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

export default function Register() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = store.registerCustomer(name, email, password);
    if (r.ok) { alert.success("Account created!"); router.push("/"); }
    else alert.error(r.error || "Registration failed");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-card border border-border rounded-3xl p-8 shadow-soft">
        <div className="flex justify-center mb-4">
          <Image src="/assets/logo.png" alt="Growzix" width={80} height={80} className="h-20 w-auto object-contain" />
        </div>
        <h1 className="text-2xl font-bold font-serif text-center">Create Account</h1>
        <p className="text-sm text-muted-foreground text-center mb-6">Join our herbal community</p>
        <form onSubmit={submit} className="space-y-4">
          <div><Label className="mb-2 block">Full Name</Label><Input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required /></div>
          <div><Label className="mb-2 block">Email</Label><Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" required /></div>
          <div>
            <Label className="mb-2 block">Password</Label>
            <div className="relative">
              <Input type={show ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2">{show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
            </div>
          </div>
          <Button type="submit" className="w-full rounded-full" size="lg">Create Account</Button>
          <p className="text-sm text-center text-muted-foreground">Already have an account? <Link href="/login" className="text-primary font-semibold">Login</Link></p>
        </form>
      </div>
    </div>
  );
}
