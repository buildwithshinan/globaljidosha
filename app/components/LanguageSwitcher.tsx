"use client"

import { useLanguage } from "../contexts/LanguageContext"
import { Button } from "../../components/ui/button"
import { useState } from "react"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <div className="relative">
      {/* Mobile: Dropdown */}
      <div className="flex lg:hidden">
        <Button
          variant="outline"
          size="sm"
          className="w-full flex items-center justify-between px-4 py-2 text-[11px] tracking-[0.12em] uppercase rounded-none border-[#E8D9B8]/30 bg-white"
          onClick={() => setDropdownOpen((open) => !open)}
          aria-label="Select language"
        >
          {language === "en" ? "EN" : "日本語"}
          <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </Button>
        {dropdownOpen && (
          <div className="absolute left-0 mt-2 w-32 bg-white shadow-xl z-50 border border-[#E8D9B8]/30">
            <button onClick={() => { setLanguage("en"); setDropdownOpen(false) }} className={`block w-full text-left px-4 py-3 text-sm transition-colors ${language === "en" ? "bg-[#0A0A0B] text-[#C5A880]" : "hover:bg-[#F5F0E8]"}`}>EN</button>
            <button onClick={() => { setLanguage("ja"); setDropdownOpen(false) }} className={`block w-full text-left px-4 py-3 text-sm transition-colors ${language === "ja" ? "bg-[#0A0A0B] text-[#C5A880]" : "hover:bg-[#F5F0E8]"}`}>日本語</button>
          </div>
        )}
      </div>
      {/* Desktop: Inline */}
      <div className="hidden lg:flex items-center gap-0 border border-white/10 p-1 bg-white/5 backdrop-blur">
        <button onClick={() => setLanguage("en")} className={`px-4 py-1.5 text-[11px] tracking-[0.12em] uppercase font-medium transition-all ${language === "en" ? "bg-[#C5A880] text-[#070708]" : "text-white/60 hover:text-white hover:bg-white/10"}`}>EN</button>
        <button onClick={() => setLanguage("ja")} className={`px-4 py-1.5 text-[11px] tracking-[0.12em] uppercase font-medium transition-all ${language === "ja" ? "bg-[#C5A880] text-[#070708]" : "text-white/60 hover:text-white hover:bg-white/10"}`}>日本語</button>
      </div>
    </div>
  )
}
