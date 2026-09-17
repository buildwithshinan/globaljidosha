"use client"

import { useLanguage } from "../contexts/LanguageContext"
import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const isEn = language === "en"
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click / ESC
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onDown)
    window.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDown)
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <>
      {/* Desktop — Luxury toggle pill */}
      <div
        role="group"
        aria-label="Language toggle — English / 日本語"
        className="hidden lg:inline-flex relative items-center"
      >
        <div className="relative flex items-center p-1 bg-white/[0.06] backdrop-blur-md border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          <div
            aria-hidden="true"
            className="absolute top-1 bottom-1 bg-[#C5A880] shadow-[0_2px_12px_rgba(197,168,128,0.4)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
            style={{
              width: "calc(50% - 4px)",
              left: isEn ? "4px" : "calc(50% + 2px)",
            }}
          />
          <button
            onClick={() => setLanguage("en")}
            aria-pressed={isEn}
            aria-label="Switch to English"
            className={`relative z-10 min-w-[56px] px-5 py-2 text-[11px] tracking-[0.16em] uppercase font-semibold transition-colors duration-300 flex items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880]/50 ${
              isEn ? "text-[#070708]" : "text-white/55 hover:text-white"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage("ja")}
            aria-pressed={!isEn}
            aria-label="日本語に切り替え"
            className={`relative z-10 min-w-[72px] px-5 py-2 text-[11px] tracking-[0.16em] uppercase font-semibold transition-colors duration-300 flex items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880]/50 ${
              !isEn ? "text-[#070708]" : "text-white/55 hover:text-white"
            }`}
          >
            日本語
          </button>
        </div>
        <span className="hidden xl:inline-flex ml-3 text-[10px] tracking-[0.18em] uppercase text-white/30 border-l border-white/10 pl-3">
          {isEn ? "English" : "日本語"}
        </span>
      </div>

      {/* Mobile — Small luxury dropdown to fix navbar width */}
      <div ref={ref} className="lg:hidden relative">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label="Select language"
          className="inline-flex items-center gap-1.5 bg-white/[0.06] backdrop-blur-md border border-white/15 hover:border-[#C5A880]/30 text-white px-3 py-1.5 text-[11px] tracking-[0.12em] uppercase font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880] h-8 min-w-[64px] justify-between"
        >
          <span className="flex items-center gap-1">
            <span className={`w-1 h-1 rounded-full ${isEn ? "bg-[#C5A880]" : "bg-white/40"}`} />
            {isEn ? "EN" : "日本語"}
          </span>
          <ChevronDown className={`h-3 w-3 text-white/50 transition-transform duration-300 ${open ? "rotate-180 text-[#C5A880]" : ""}`} />
        </button>

        {/* Dropdown menu */}
        <div
          role="menu"
          aria-hidden={!open}
          className={`absolute right-0 mt-2 w-28 bg-[#070708] border border-white/10 shadow-[0_12px_32px_rgba(0,0,0,0.45)] overflow-hidden z-50 transition-all duration-300 origin-top-right ${
            open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
          }`}
        >
          <button
            role="menuitem"
            onClick={() => {
              setLanguage("en")
              setOpen(false)
            }}
            className={`w-full text-left px-3 py-2.5 text-[11px] tracking-[0.14em] uppercase font-medium transition-colors flex items-center justify-between ${
              isEn ? "bg-[#C5A880] text-[#070708]" : "text-white/70 hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            EN
            {isEn && <span className="w-1 h-1 rounded-full bg-[#070708]" />}
          </button>
          <div className="h-px bg-white/[0.06]" />
          <button
            role="menuitem"
            onClick={() => {
              setLanguage("ja")
              setOpen(false)
            }}
            className={`w-full text-left px-3 py-2.5 text-[11px] tracking-[0.14em] uppercase font-medium transition-colors flex items-center justify-between ${
              !isEn ? "bg-[#C5A880] text-[#070708]" : "text-white/70 hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            日本語
            {!isEn && <span className="w-1 h-1 rounded-full bg-[#070708]" />}
          </button>
        </div>
      </div>
    </>
  )
}
