"use client"

import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, ArrowUpRight, Clock } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";

function LineIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <rect width="40" height="40" rx="8" fill="#06C755" />
      <path d="M20 10C13.373 10 8 14.477 8 20c0 4.477 4.03 8.19 9.5 8.89.37.08.88.25 1.01.57.12.3.08.77.04 1.07l-.16 1.01c-.05.3-.23 1.18 1.04.64 1.27-.54 6.8-4.01 9.29-6.87C32 24.477 32 20 32 20c0-5.523-5.373-10-12-10z" fill="#fff" />
    </svg>
  )
}

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-[#070708] text-[#E8E6E1] relative overflow-hidden">
      {/* Gold top line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C5A880]/50 to-transparent"></div>
      
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{backgroundImage: `repeating-linear-gradient(0deg, #C5A880 0 1px, transparent 1px 80px), repeating-linear-gradient(90deg, #C5A880 0 1px, transparent 1px 80px)`}}></div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8 pt-16 pb-8">
        {/* Top CTA bar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-12 border-b border-white/[0.06] mb-12">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#C5A880] mb-3">Begin Your Journey</p>
            <h3 className="text-3xl font-light leading-none" style={{fontFamily: 'Cormorant Garamond, serif'}}>Acquire. Consign. <span className="italic text-[#C5A880]">Experience.</span></h3>
          </div>
          <Link href="/contact" className="inline-flex items-center gap-3 bg-[#C5A880] text-[#070708] px-8 py-4 text-[11px] tracking-[0.16em] uppercase font-semibold hover:bg-[#D4B896] transition-colors">
            Private Consultation <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#C5A880]/30 bg-white flex items-center justify-center">
                <Image src="/logo.jpeg" alt="Global Jidosha" width={40} height={40} className="object-cover w-10 h-10" />
              </div>
              <div>
                <span className="block text-[17px] tracking-[0.14em] uppercase font-light" style={{fontFamily: 'Cormorant Garamond, serif'}}>Global Jidosha <span className="text-[#C5A880] font-medium">LLC</span></span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/40">Atelier • Est. 2010 • Tokyo</span>
              </div>
            </div>
            <p className="text-[14px] leading-7 text-white/60 max-w-md mb-8 font-light">
              Japan&apos;s distinguished automotive atelier. We curate, authenticate and discreetly place exceptional motor cars for collectors and connoisseurs worldwide.
            </p>
            <div className="flex gap-3">
              {[
                { href: "https://www.facebook.com/share/1EDvocHHvd/?mibextid=wwXIfr", icon: Facebook, label: "Facebook" },
                { href: "https://twitter.com/", icon: Twitter, label: "Twitter" },
                { href: "https://instagram.com/", icon: Instagram, label: "Instagram" },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="w-10 h-10 border border-white/10 hover:border-[#C5A880]/50 flex items-center justify-center hover:bg-[#C5A880] hover:text-[#070708] text-white/60 transition-all duration-300 group">
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
              <a href="https://line.me/ti/p/EkPpp8Teqj" target="_blank" rel="noopener noreferrer" aria-label="LINE" className="w-10 h-10 border border-white/10 hover:border-[#C5A880]/50 flex items-center justify-center hover:bg-white text-white/60 transition-all">
                <LineIcon className="h-5 w-5" />
              </a>
              <a href="https://wa.me/818022815656" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-10 h-10 border border-white/10 hover:border-[#C5A880]/50 flex items-center justify-center hover:bg-[#C5A880] hover:text-[#070708] text-white/60 transition-all">
                <FaWhatsapp className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-[#C5A880] mb-6">Atelier</h4>
            <ul className="space-y-3.5">
              {[
                { href: "/", label: t("nav.home") },
                { href: "/about", label: t("nav.about") },
                { href: "/services", label: t("nav.services") },
                { href: "/gallery", label: "Collection" },
                { href: "/contact", label: t("nav.contact") },
              ].map(l => (
                <li key={l.href}><Link href={l.href} className="text-[13px] tracking-wide text-white/60 hover:text-[#C5A880] transition-colors inline-flex items-center gap-2 group"><span className="w-0 h-px bg-[#C5A880] group-hover:w-4 transition-all duration-300"></span> {l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-[#C5A880] mb-6">Concierge</h4>
            <div className="space-y-4 text-[13px]">
              <a href="tel:07039910710" className="flex items-center gap-3 text-white/70 hover:text-[#C5A880] transition-colors">
                <span className="w-8 h-8 border border-white/10 flex items-center justify-center"><Phone className="h-3.5 w-3.5" /></span> 070-3991-0710
              </a>
              <a href="tel:0433713707" className="flex items-center gap-3 text-white/70 hover:text-[#C5A880] transition-colors">
                <span className="w-8 h-8 border border-white/10 flex items-center justify-center"><Phone className="h-3.5 w-3.5" /></span> 043-371-3707
              </a>
              <a href="https://wa.me/818022815656" className="flex items-center gap-3 text-white/70 hover:text-[#C5A880] transition-colors">
                <span className="w-8 h-8 border border-white/10 flex items-center justify-center"><FaWhatsapp className="h-3.5 w-3.5 text-[#C5A880]" /></span> +81 80-2281-5656 — WhatsApp
              </a>
              <a href="mailto:info@globaljidosha.com" className="flex items-center gap-3 text-white/70 hover:text-[#C5A880] transition-colors">
                <span className="w-8 h-8 border border-white/10 flex items-center justify-center"><Mail className="h-3.5 w-3.5" /></span> info@globaljidosha.com
              </a>
              <div className="flex items-start gap-3 text-white/50 pt-2 border-t border-white/5 mt-4">
                <MapPin className="h-3.5 w-3.5 text-[#C5A880] mt-1 flex-shrink-0" />
                <span className="leading-6 text-[13px]">Global Jidosha LLC — Tokyo, Yokohama, Nagoya. Administrative office by appointment. <br /><a href="https://www.globaljidosha.com/" className="text-[#C5A880] hover:underline">globaljidosha.com</a></span>
              </div>
              <div className="flex items-center gap-3 text-white/40 text-[11px] tracking-wide">
                <Clock className="h-3.5 w-3.5 text-[#C5A880]/60" /> Mon — Sat 09:00–18:00 JST • Sun by appointment
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.06] mt-12 pt-8 flex flex-col md:flex-row justify-between gap-4 text-[11px] tracking-[0.1em] uppercase">
          <p className="text-white/30">© {new Date().getFullYear()} Global Jidosha LLC. All rights reserved. Crafted for connoisseurs.</p>
          <div className="flex gap-6 text-white/30">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Imprint</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
