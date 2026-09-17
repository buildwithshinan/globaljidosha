"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Phone, Mail, ArrowUpRight } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"
import LanguageSwitcher from "./LanguageSwitcher"
import Image from "next/image"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Lock scroll when menu open + ESC to close
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsOpen(false)
      }
      window.addEventListener("keydown", onKey)
      return () => {
        document.body.style.overflow = ""
        window.removeEventListener("keydown", onKey)
      }
    } else {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/services", label: t("nav.services") },
    { href: "/gallery", label: "Collection" },
    { href: "/contact", label: t("nav.contact") },
  ]

  return (
    <>
      {/* Top Utility Bar — Luxury */}
      <div className="hidden md:block bg-[#070708] text-[#E8E6E1] py-2.5 px-4 text-[11px] tracking-[0.14em] uppercase font-medium border-b border-[#C5A880]/15 relative z-50">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6 lg:gap-8">
            <a
              href="tel:+818022815656"
              className="flex items-center gap-2 hover:text-[#C5A880] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880]"
            >
              <Phone className="h-3 w-3 text-[#C5A880]" />
              <span>+81 80-2281-5656</span>
            </a>
            <a
              href="mailto:info@globaljidosha.com"
              className="hidden lg:flex items-center gap-2 hover:text-[#C5A880] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880]"
            >
              <Mail className="h-3 w-3 text-[#C5A880]" />
              <span>info@globaljidosha.com</span>
            </a>
            <span className="hidden xl:block text-white/30">—</span>
            <span className="hidden xl:block text-white/40 normal-case tracking-wide">Mon — Sat 9:00 — 18:00 JST</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden lg:block text-[#C5A880] tracking-[0.12em]">Tokyo • Yokohama • Nagoya</span>
            <span className="hidden lg:block w-px h-3 bg-[#C5A880]/20" />
            <a
              href="https://line.me/ti/p/EkPpp8Teqj"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#C5A880] hover:text-white transition-colors border border-[#C5A880]/30 px-3 py-1 text-[11px] hover:border-[#C5A880]/60 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880]"
            >
              LINE Concierge <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation — Luxury, easy to access */}
      <nav
        className={`fixed left-0 right-0 z-40 transition-all duration-500 border-b w-full ${
          isScrolled
            ? "bg-[#070708]/95 backdrop-blur-2xl border-[#C5A880]/15 shadow-[0_8px_40px_rgba(0,0,0,0.45)] top-0"
            : "bg-[#070708]/85 backdrop-blur-xl border-white/[0.07] shadow-[0_4px_24px_rgba(0,0,0,0.3)] md:top-[36px] top-0"
        }`}
        role="navigation"
        aria-label="Main Navigation"
      >
        {/* Gold hairline top accent when scrolled */}
        <div
          className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C5A880]/50 to-transparent transition-opacity duration-500 ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[64px] lg:h-[72px]">
            {/* Logo — Luxury */}
            <Link
              href="/"
              className="flex items-center gap-3 sm:gap-4 group min-w-0 flex-shrink-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880]"
              aria-label="Global Jidosha LLC — Home"
            >
              <div className="relative w-10 h-10 lg:w-11 lg:h-11 rounded-full overflow-hidden border border-[#C5A880]/30 group-hover:border-[#C5A880]/60 transition-all duration-500 bg-white flex items-center justify-center shadow-[0_2px_12px_rgba(0,0,0,0.15)] flex-shrink-0">
                <Image src="/logo.jpeg" alt="Global Jidosha" width={44} height={44} className="object-cover w-10 h-10 lg:w-11 lg:h-11" priority />
              </div>
              <div className="flex flex-col min-w-0">
                <span
                  className="text-[15px] sm:text-[16px] lg:text-[18px] font-light tracking-[0.13em] uppercase leading-none text-white whitespace-nowrap"
                  style={{ fontFamily: "Cormorant Garamond, serif" }}
                >
                  Global Jidosha <span className="font-semibold text-[#C5A880]">LLC</span>
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.22em] uppercase mt-1 text-white/50 hidden sm:block">
                  Atelier • Est. 2010
                </span>
              </div>
            </Link>

            {/* Desktop Navigation — spacious, luxury */}
            <div className="hidden lg:flex items-center gap-7 xl:gap-8">
              <div className="flex items-center gap-6 xl:gap-8">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      prefetch
                      className={`relative py-6 text-[11px] tracking-[0.18em] uppercase font-medium transition-colors duration-300 focus:outline-none focus-visible:text-[#C5A880] ${
                        isActive ? "text-[#C5A880]" : "text-white/75 hover:text-[#C5A880]"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                      <span
                        className={`absolute left-0 right-0 -bottom-1 h-px bg-[#C5A880] transition-all duration-300 origin-left ${
                          isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-100"
                        }`}
                      />
                      {isActive && <span className="absolute -bottom-1 left-0 w-full h-px bg-[#C5A880]" />}
                    </Link>
                  )
                })}
              </div>

              <div className="w-px h-6 bg-white/10 hidden xl:block" />

              {/* Luxury Toggle — always visible on desktop */}
              <LanguageSwitcher />

              <Link
                href="/contact"
                className="hidden xl:inline-flex items-center gap-2 bg-[#C5A880] hover:bg-[#D4B896] text-[#070708] px-6 py-3 text-[11px] tracking-[0.14em] uppercase font-semibold transition-all duration-300 shadow-[0_4px_16px_rgba(197,168,128,0.25)] hover:shadow-[0_6px_20px_rgba(197,168,128,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070708]"
              >
                Private Consultation
              </Link>
            </div>

            {/* Mobile — small dropdown to fix navbar */}
            <div className="lg:hidden flex items-center gap-2">
              <LanguageSwitcher />
              <button
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-8 flex items-center justify-center border border-white/15 text-white hover:border-[#C5A880]/50 hover:text-[#C5A880] hover:bg-white/[0.04] backdrop-blur transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880] flex-shrink-0"
              >
                {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation — Luxury Drawer */}
          <div
            id="mobile-menu"
            className={`lg:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              isOpen ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0"
            }`}
            aria-hidden={!isOpen}
          >
            <div className="border-t border-white/10 mt-0 pt-2 pb-6">
              {/* Nav links — large tap targets, luxury typography */}
              <div className="space-y-0 py-2">
                {navItems.map((item, idx) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center justify-between py-4 text-[13px] tracking-[0.18em] uppercase font-medium border-b border-white/[0.05] transition-colors focus:outline-none focus-visible:text-[#C5A880] ${
                        isActive ? "text-[#C5A880]" : "text-white/80 hover:text-[#C5A880]"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-[10px] tracking-[0.2em] text-white/25 group-hover:text-[#C5A880]/60 transition-colors">
                          0{idx + 1}
                        </span>
                        {item.label}
                      </span>
                      <ArrowUpRight
                        className={`h-4 w-4 transition-all duration-300 ${
                          isActive ? "text-[#C5A880] translate-x-0 opacity-100" : "text-white/20 group-hover:text-[#C5A880] group-hover:translate-x-0.5"
                        }`}
                      />
                    </Link>
                  )
                })}
              </div>

              {/* Luxury CTA + contact */}
              <div className="pt-6 flex flex-col gap-3">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="bg-[#C5A880] hover:bg-[#D4B896] text-[#070708] py-4 text-center text-[12px] tracking-[0.14em] uppercase font-semibold transition-colors flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880]"
                >
                  Private Consultation <ArrowUpRight className="h-4 w-4" />
                </Link>

                <a
                  href="tel:+818022815656"
                  className="flex items-center justify-center gap-2 border border-white/10 hover:border-[#C5A880]/30 hover:bg-white/[0.03] text-white/80 py-3.5 text-[12px] tracking-wide transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-[#C5A880]" /> +81 80-2281-5656
                </a>

                <div className="flex items-center justify-center gap-4 pt-4 text-[11px] tracking-wide text-white/30">
                  <span>Tokyo</span>
                  <span className="w-1 h-1 rounded-full bg-[#C5A880]/40" />
                  <span>Yokohama</span>
                  <span className="w-1 h-1 rounded-full bg-[#C5A880]/40" />
                  <span>Nagoya</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
