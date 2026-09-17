"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, DollarSign, Search, FileCheck, Truck, CheckCircle } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"
import dynamic from "next/dynamic"
const GSAPWrapper = dynamic(() => import("../components/GSAPWrapper"), { ssr: false })
import GallerySection from "../components/GallerySection"

export default function Services() {
  const { t } = useLanguage()

  const buySteps = [
    { icon: Search, title: "Browse Inventory", desc: "Explore our curated selection" },
    { icon: FileCheck, title: "Inspection", desc: "Detailed vehicle inspection" },
    { icon: DollarSign, title: "Financing", desc: "Flexible payment options" },
    { icon: Truck, title: "Delivery", desc: "Safe delivery to your location" },
  ]

  const sellSteps = [
    { icon: Search, title: "Free Evaluation", desc: "Professional vehicle assessment" },
    { icon: FileCheck, title: "Documentation", desc: "Handle all paperwork" },
    { icon: DollarSign, title: "Best Price", desc: "Competitive market pricing" },
    { icon: CheckCircle, title: "Quick Sale", desc: "Fast and secure transaction" },
  ]

  return (
    <div className="min-h-screen w-full bg-[#FCFBF9]">
      {/* Hero Section - Luxury */}
      <section className="pt-32 pb-16 bg-[#070708] text-white w-full relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage: `linear-gradient(#C5A880 1px, transparent 1px), linear-gradient(90deg, #C5A880 1px, transparent 1px)`, backgroundSize: '80px 80px'}}></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-[#C5A880]/10 blur-[120px] rounded-full"></div>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 w-full relative z-10">
          <GSAPWrapper animation="slideUp">
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#C5A880] mb-4 flex items-center justify-center gap-3"><span className="w-8 h-px bg-[#C5A880]"></span> Bespoke Services <span className="w-8 h-px bg-[#C5A880]"></span></p>
            <h1 className="text-3xl sm:text-6xl font-light text-center mb-4 tracking-[-0.02em]" style={{fontFamily: 'Cormorant Garamond, serif'}}>
              {t("services.title")}
            </h1>
            <p className="text-center text-white/60 max-w-2xl mx-auto font-light">Acquisition, consignment, and stewardship — managed with atelier precision.</p>
          </GSAPWrapper>
        </div>
      </section>
      {/* Main Services */}
      <section className="py-8 sm:py-16 bg-white w-full">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 w-full">
            {/* Buy Cars Service */}
            <GSAPWrapper animation="slideLeft">
              <div className="card h-full max-w-sm mx-auto w-full bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 group">
                <div className="relative mb-3 sm:mb-6 w-full overflow-hidden rounded-xl">
                  <Image
                    src="/buycars.png"
                    alt="Buy Cars"
                    width={500}
                    height={300}
                    className="rounded-xl w-full h-auto max-w-xs sm:max-w-full mx-auto group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-primary text-white p-2 sm:p-3 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4 group-hover:text-primary transition-colors duration-300">
                  {t("services.buy.title")}
                </h3>
                <p className="text-gray-600 mb-2 sm:mb-6 text-sm sm:text-lg">
                  {t("services.buy.desc")}
                </p>
                <Link
                  href="/gallery"
                  className="btn-primary w-full sm:w-auto text-center py-3 px-6 rounded-xl font-semibold shadow-md hover:scale-105 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300"
                  aria-label={t("services.get.started")}
                >
                  {t("services.get.started")}
                </Link>
              </div>
            </GSAPWrapper>

            {/* Sell Cars Service */}
            <GSAPWrapper animation="slideRight">
              <div className="card h-full max-w-sm mx-auto w-full bg-gradient-to-br from-accent/10 to-secondary/10 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 group">
                <div className="relative mb-3 sm:mb-6 w-full overflow-hidden rounded-xl">
                  <Image
                    src="/sellcars.png"
                    alt="Sell Cars"
                    width={500}
                    height={300}
                    className="rounded-xl w-full h-auto max-w-xs sm:max-w-full mx-auto group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-accent text-white p-2 sm:p-3 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <DollarSign className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4 group-hover:text-accent transition-colors duration-300">
                  {t("services.sell.title")}
                </h3>
                <p className="text-gray-600 mb-2 sm:mb-6 text-sm sm:text-lg">
                  {t("services.sell.desc")}
                </p>
                <Link
                  href="/contact"
                  className="btn-accent w-full sm:w-auto text-center py-3 px-6 rounded-xl font-semibold shadow-md hover:scale-105 hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-all duration-300"
                  aria-label={t("services.get.started")}
                >
                  {t("services.get.started")}
                </Link>
              </div>
            </GSAPWrapper>
          </div>
        </div>
      </section>

      {/* Buy Process */}
      <section className="py-8 sm:py-16 bg-gray-50 w-full">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 w-full">
          <GSAPWrapper animation="slideUp">
            <h2 className="text-lg sm:text-3xl font-bold text-center text-gray-900 mb-6 sm:mb-12 tracking-tight">
              How to Buy a Car
            </h2>
          </GSAPWrapper>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 w-full">
            {buySteps.map((step, index) => (
              <GSAPWrapper key={index} animation="slideUp" delay={index * 0.2}>
                <div className="card text-center max-w-xs mx-auto w-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 group">
                  <div className="bg-primary text-white p-3 sm:p-4 rounded-full w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-2 sm:mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                  </div>
                  <h4 className="text-sm sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2 group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {step.desc}
                  </p>
                </div>
              </GSAPWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Sell Process */}
      <section className="py-8 sm:py-16 bg-white w-full">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 w-full">
          <GSAPWrapper animation="slideUp">
            <h2 className="text-lg sm:text-3xl font-bold text-center text-gray-900 mb-6 sm:mb-12 tracking-tight">
              How to Sell Your Car
            </h2>
          </GSAPWrapper>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 w-full">
            {sellSteps.map((step, index) => (
              <GSAPWrapper key={index} animation="slideUp" delay={index * 0.2}>
                <div className="card text-center max-w-xs mx-auto w-full bg-gradient-to-br from-accent/5 to-secondary/5 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 group">
                  <div className="bg-accent text-white p-3 sm:p-4 rounded-full w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-2 sm:mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                  </div>
                  <h4 className="text-sm sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2 group-hover:text-accent transition-colors duration-300">
                    {step.title}
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {step.desc}
                  </p>
                </div>
              </GSAPWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-16 bg-gradient-to-r from-primary to-secondary text-white w-full rounded-t-3xl shadow-lg mt-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 text-center w-full">
          <GSAPWrapper animation="slideUp">
            <h2 className="text-lg sm:text-3xl font-bold mb-3 sm:mb-6 drop-shadow-lg">Ready to Get Started?</h2>
            <p className="text-sm sm:text-xl mb-4 sm:mb-8 text-gray-200">Contact us today for a free consultation</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center w-full">
              <Link
                href="/contact"
                className="btn-accent w-full sm:w-auto text-center py-3 px-6 rounded-xl font-semibold shadow-md hover:scale-105 hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-all duration-300"
                aria-label="Contact Us"
              >
                Contact Us
              </Link>
              <Link
                href="/gallery"
                className="bg-white text-primary px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-gray-100 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 w-full sm:w-auto text-center"
                aria-label="View Inventory"
              >
                View Inventory
              </Link>
            </div>
          </GSAPWrapper>
        </div>
      </section>
    </div>
  )
}
