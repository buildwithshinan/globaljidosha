"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Phone, Mail, ArrowUpRight } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"
import LanguageSwitcher from "./LanguageSwitcher"
import Image from "next/image";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/services", label: t("nav.services") },
    { href: "/gallery", label: "Collection" },
    { href: "/contact", label: t("nav.contact") },
  ]

  return (
    <>
      {/* Top Bar - Luxury */}
      <div className="bg-[#070708] text-[#E8E6E1] py-2.5 px-4 text-[11px] tracking-[0.14em] uppercase font-medium border-b border-[#C5A880]/15 relative z-50">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6 md:gap-8">
            <a href="tel:+818022815656" className="flex items-center gap-2 hover:text-[#C5A880] transition-colors">
              <Phone className="h-3 w-3 text-[#C5A880]" />
              <span className="hidden sm:inline">+81 80-2281-5656</span>
              <span className="sm:hidden">Call</span>
            </a>
            <a href="mailto:info@globaljidosha.com" className="hidden md:flex items-center gap-2 hover:text-[#C5A880] transition-colors">
              <Mail className="h-3 w-3 text-[#C5A880]" />
              <span>info@globaljidosha.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden lg:block text-[#E8E6E1]/60">Mon — Sat 9:00 — 18:00 JST</span>
            <span className="hidden md:block w-px h-3 bg-[#C5A880]/20"></span>
            <span className="text-[#C5A880] hidden md:block">Tokyo • Yokohama • Nagoya</span>
            <a href="https://line.me/ti/p/EkPpp8Teqj" target="_blank" className="hidden sm:inline-flex items-center gap-1.5 text-[#C5A880] hover:text-white transition-colors border border-[#C5A880]/30 px-3 py-1">
              LINE Concierge <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation - Luxury Transparent */}
      <nav
        className={`fixed left-0 right-0 z-40 transition-all duration-700 border-b ${isScrolled ? "bg-[#070708]/95 backdrop-blur-2xl border-[#C5A880]/10 shadow-[0_8px_40px_rgba(0,0,0,0.4)] top-0" : "bg-gradient-to-b from-[#070708]/60 to-transparent backdrop-blur-[2px] border-transparent top-[36px]"} w-full`}
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-8">
          <div className="flex justify-between items-center h-[84px]">
            {/* Logo - Luxury */}
            <Link href="/" className="flex items-center gap-4 group min-w-0">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#C5A880]/30 group-hover:border-[#C5A880]/60 transition-all duration-500 bg-white flex items-center justify-center">
                <Image
                  src="/logo.jpeg"
                  alt="Global Jidosha"
                  width={44}
                  height={44}
                  className="object-cover w-11 h-11"
                />
              </div>
              <div className="flex flex-col">
                <span className={`text-[18px] font-light tracking-[0.14em] uppercase leading-none ${isScrolled ? 'text-white' : 'text-white'} `} style={{fontFamily: 'Cormorant Garamond, serif'}}>
                  Global Jidosha <span className="font-semibold text-[#C5A880]">LLC</span>
                </span>
                <span className={`text-[10px] tracking-[0.22em] uppercase mt-1 ${isScrolled ? 'text-white/50' : 'text-white/60'}`}>
                  Atelier • Est. 2010
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} prefetch={true} className={`relative text-[11px] tracking-[0.18em] uppercase font-medium transition-colors duration-300 ${isScrolled ? 'text-white/75 hover:text-[#C5A880]' : 'text-white/85 hover:text-[#C5A880]'} ${pathname === item.href ? '!text-[#C5A880]' : ''}`}>
                  {item.label}
                  {pathname === item.href && <span className="absolute -bottom-1 left-0 w-full h-px bg-[#C5A880]"></span>}
                </Link>
              ))}
              <div className="w-px h-6 bg-white/10"></div>
              <LanguageSwitcher />
              <Link href="/contact" className="inline-flex items-center gap-2 bg-[#C5A880] hover:bg-[#D4B896] text-[#070708] px-7 py-3 text-[11px] tracking-[0.14em] uppercase font-semibold transition-all duration-300 hover:tracking-[0.16em]">
                Private Consultation
              </Link>
            </div>

            {/* Mobile */}
            <div className="lg:hidden flex items-center gap-3">
              <button
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-11 h-11 flex items-center justify-center border transition-all duration-300 ${isScrolled ? 'border-white/10 text-white hover:border-[#C5A880]/50' : 'border-white/20 text-white bg-white/5 backdrop-blur'} `}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div id="mobile-menu" className="lg:hidden pb-8 animate-slide-down border-t border-white/10 mt-4 pt-6">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block py-4 text-[13px] tracking-[0.18em] uppercase font-medium border-b border-white/[0.04] transition-colors ${pathname === item.href ? "text-[#C5A880]" : "text-white/80 hover:text-[#C5A880]"}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-6 flex flex-col gap-3">
                  <Link href="/contact" className="bg-[#C5A880] text-[#070708] py-4 text-center text-[12px] tracking-[0.14em] uppercase font-semibold" onClick={() => setIsOpen(false)}>
                    Private Consultation
                  </Link>
                  <div className="flex justify-center pt-2">
                    <LanguageSwitcher />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
