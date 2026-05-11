"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import Image from "next/image";

export function Footer() {
  const { settings } = useStore();
  return (
    <footer className="bg-secondary/50 border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 py-14 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-4">
            <Image src="/assets/logo.png" alt="Growzix Natural" width={64} height={64} className="h-16 w-auto object-contain" />
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Pure natural herbal products. 100% organic, chemical free, crafted for a healthy lifestyle.
          </p>
          <div className="flex gap-2 mt-4">
            <a href={settings.social.facebook || "#"} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition text-sm">f</a>
            <a href={settings.social.twitter || "#"} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition text-sm">𝕏</a>
            <a href={settings.social.instagram || "#"} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition text-sm">📷</a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[["Home","/"],["Shop","/shop"],["Categories","/categories"],["Contact","/contact"]].map(([l,h]) => (
              <li key={h}><Link href={h} className="hover:text-primary">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />{settings.contactAddress}</li>
            <li className="flex gap-2"><Phone className="w-4 h-4 mt-0.5 shrink-0 text-primary" />{settings.contactPhone}</li>
            <li className="flex gap-2"><Mail className="w-4 h-4 mt-0.5 shrink-0 text-primary" />{settings.contactEmail}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Newsletter</h4>
          <p className="text-sm text-muted-foreground mb-3">Get herbal tips and exclusive offers.</p>
          <form className="flex gap-2" onSubmit={e => e.preventDefault()}>
            <Input placeholder="Your email" className="bg-background" />
            <Button type="submit">Join</Button>
          </form>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Growzix Natural. All rights reserved.
      </div>
    </footer>
  );
}
