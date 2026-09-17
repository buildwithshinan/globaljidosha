import type React from "react"
import type { Metadata } from "next"
import { Inter, Cormorant_Garamond, Playfair_Display } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "./contexts/LanguageContext"
import Navigation from "./components/Navigation"
import Footer from "./components/Footer"
import FloatingActionButton from "./components/FloatingActionButton"

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' })
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300","400","500","600","700"], variable: '--font-cormorant' })
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: "Global Jidosha LLC — Curated Luxury Automobiles | Tokyo, Japan",
  description:
    "Japan's distinguished luxury automobile atelier. Private collection of meticulously curated prestige vehicles. Bespoke acquisition & concierge service in Tokyo.",
    generator: 'v0.dev',
    icons: {
      icon: "/favicon.ico",
    },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${cormorant.variable} ${playfair.variable} ${inter.className} bg-[#FCFBF9] antialiased`}>
        <LanguageProvider>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <FloatingActionButton />
        </LanguageProvider>
      </body>
    </html>
  )
}
