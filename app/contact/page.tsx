"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { alert } from "@/lib/alert";

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-serif">Get in Touch</h1>
        <p className="text-muted-foreground mt-2">We&apos;d love to hear from you</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="space-y-4">
          {[
            { icon: MapPin, t: "Address", d: "850 Will Clayton Pkwy, Humble, Texas, 77338" },
            { icon: Phone, t: "Phone", d: "+1 281 802 1541" },
            { icon: Mail, t: "Email", d: "hello@growzixnatural.com" },
          ].map(c => (
            <div key={c.t} className="bg-card border border-border rounded-2xl p-6 flex gap-4">
              <div className="w-12 h-12 rounded-full gradient-card flex items-center justify-center"><c.icon className="w-5 h-5 text-primary" /></div>
              <div><p className="font-semibold">{c.t}</p><p className="text-sm text-muted-foreground">{c.d}</p></div>
            </div>
          ))}
        </div>
        <form 
          onSubmit={e => { 
            e.preventDefault(); 
            const fd = new FormData(e.currentTarget);
            const name = fd.get("name");
            const email = fd.get("email");
            const message = fd.get("message");
            const phone = "12818021541";
            const text = `*New Contact Inquiry*\n\n*Name:* ${name}\n*Email:* ${email}\n*Message:* ${message}`;
            window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank");
            alert.success("Opening WhatsApp..."); 
          }} 
          className="bg-card border border-border rounded-2xl p-6 space-y-4"
        >
          <div><Label className="mb-2 block">Name</Label><Input name="name" required /></div>
          <div><Label className="mb-2 block">Email</Label><Input name="email" type="email" required /></div>
          <div><Label className="mb-2 block">Message</Label><Textarea name="message" rows={5} required /></div>
          <Button className="w-full rounded-full" size="lg">Send via WhatsApp</Button>
        </form>
      </div>
    </div>
  );
}
