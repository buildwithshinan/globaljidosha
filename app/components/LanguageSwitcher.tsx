"use client"

import { useLanguage } from "../contexts/LanguageContext"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const isEn = language === "en"

  return (
    <div
      role="group"
      aria-label="Language toggle — English / 日本語"
      className="relative inline-flex items-center"
    >
      {/* Luxury toggle track */}
      <div className="relative flex items-center p-1 bg-white/[0.06] backdrop-blur-md border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
        {/* Sliding luxury gold indicator */}
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

      {/* Luxury micro label for desktop */}
      <span className="hidden xl:inline-flex ml-3 text-[10px] tracking-[0.18em] uppercase text-white/30 border-l border-white/10 pl-3">
        {isEn ? "English" : "日本語"}
      </span>
    </div>
  )
}
