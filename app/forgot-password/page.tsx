"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { alert } from "@/lib/alert";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mocking an API call
    setTimeout(() => {
      alert.success("If an account exists with this email, you will receive a reset link shortly.");
      setLoading(false);
      setEmail("");
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-card border border-border rounded-3xl p-8 shadow-soft">
        <div className="flex justify-center mb-4">
          <Image src="/assets/logo.png" alt="Growzix" width={80} height={80} className="h-20 w-auto object-contain" />
        </div>
        <h1 className="text-2xl font-bold font-serif text-center">Forgot Password?</h1>
        <p className="text-sm text-muted-foreground text-center mb-6">Enter your email and we&apos;ll send you a link to reset your password.</p>
        
        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label className="mb-2 block">Email Address</Label>
            <Input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="you@email.com" 
              required 
            />
          </div>
          <Button type="submit" className="w-full rounded-full" size="lg" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/login" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
