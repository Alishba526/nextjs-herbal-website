import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Get Expert Herbal Consultation | Growzix Natural",
  description: "Have questions about our organic herbal products? Contact Growzix Natural for support, consultations, and inquiries. We're here to help you naturally.",
  keywords: [
    "contact Growzix Natural",
    "herbal products support",
    "natural hair care consultation",
    "organic product inquiries",
    "Growzix Natural phone number",
    "herbal store customer service"
  ],
  alternates: {
    canonical: "https://growzixnatural.com/contact/",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
