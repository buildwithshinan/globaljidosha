"use client"

import Image from "next/image"
import { useLanguage } from "../contexts/LanguageContext"
import dynamic from "next/dynamic"
const GSAPWrapper = dynamic(() => import("../components/GSAPWrapper"), { ssr: false })
import GallerySection from "../components/GallerySection"
import Banner from "../components/Banner"

export default function About() {
  const { t } = useLanguage()

  const milestones = [
    { year: "2010", event: "Global Jidosha LLC Founded" },
    { year: "2015", event: "Expanded to 3 Locations" },
    { year: "2018", event: "Launched Online Platform" },
    { year: "2020", event: "10,000+ Cars Sold" },
    { year: "2023", event: "Premium Service Launch" },
  ]

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section - Luxury */}
      <section className="pt-32 pb-16 bg-[#070708] text-white w-full relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage: `linear-gradient(#C5A880 1px, transparent 1px), linear-gradient(90deg, #C5A880 1px, transparent 1px)`, backgroundSize: '80px 80px'}}></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-[#C5A880]/10 blur-[120px] rounded-full"></div>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 w-full relative z-10">
          <GSAPWrapper animation="slideUp">
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#C5A880] mb-4 flex items-center justify-center gap-3"><span className="w-8 h-px bg-[#C5A880]"></span> Heritage Since 2010 <span className="w-8 h-px bg-[#C5A880]"></span></p>
            <h1 className="text-3xl sm:text-6xl font-light text-center mb-4 tracking-[-0.02em]" style={{fontFamily: 'Cormorant Garamond, serif'}}>{t("about.title")}</h1>
            <p className="text-center text-white/60 max-w-2xl mx-auto font-light">A private atelier built on provenance, discretion, and fifteen years of devoted stewardship.</p>
          </GSAPWrapper>
        </div>
      </section>

      {/* Banner Section */}
      <Banner text="Welcome to Global Jidosha LLC! Your trusted partner for quality cars and premium service. 🚗✨" />

      {/* Gallery Section */}
      <GallerySection
        title="Our Journey in Pictures"
        items={[
          {
            id: "1",
            title: "Company Founding - 2010",
            description: "The humble beginnings of Global Jidosha LLC with our first small showroom.",
            image: "/placeholder.svg?height=400&width=600&text=Company+Founding+2010",
            category: "history",
            featured: true,
          },
          {
            id: "2",
            title: "First Expansion - 2015",
            description: "Opening our second location and expanding our team of experts.",
            image: "/placeholder.svg?height=400&width=600&text=First+Expansion+2015",
            category: "history",
          },
          {
            id: "3",
            title: "Digital Innovation - 2018",
            description: "Launching our online platform and digital customer experience.",
            image: "/placeholder.svg?height=400&width=600&text=Digital+Innovation+2018",
            category: "innovation",
          },
          {
            id: "4",
            title: "Premium Service Launch - 2023",
            description: "Introducing our premium concierge service for VIP customers.",
            image: "/placeholder.svg?height=400&width=600&text=Premium+Service+2023",
            category: "innovation",
            featured: true,
          },
        ]}
        categories={["history", "innovation"]}
      />

      {/* History Section */}
      <section className="py-8 sm:py-16 bg-white w-full">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-12 items-center w-full">
            <GSAPWrapper animation="slideLeft">
              <div>
                <h2 className="text-lg sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-6">{t("about.history.title")}</h2>
                <p className="text-gray-600 text-sm sm:text-lg leading-relaxed">{t("about.history.desc")}</p>
              </div>
            </GSAPWrapper>

            <GSAPWrapper animation="slideRight">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Global Jidosha LLC Building"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl w-full h-auto max-w-xs sm:max-w-full mx-auto"
              />
            </GSAPWrapper>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-8 sm:py-16 bg-gray-50 w-full">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-12 w-full">
            <GSAPWrapper animation="slideUp" delay={0.2}>
              <div className="card w-full max-w-sm mx-auto">
                <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4">{t("about.mission.title")}</h3>
                <p className="text-gray-600 text-sm sm:text-lg leading-relaxed">{t("about.mission.desc")}</p>
              </div>
            </GSAPWrapper>

            <GSAPWrapper animation="slideUp" delay={0.4}>
              <div className="card w-full max-w-sm mx-auto">
                <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4">{t("about.vision.title")}</h3>
                <p className="text-gray-600 text-sm sm:text-lg leading-relaxed">{t("about.vision.desc")}</p>
              </div>
            </GSAPWrapper>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-8 sm:py-16 bg-white w-full">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 w-full">
          <GSAPWrapper animation="slideUp">
            <h2 className="text-lg sm:text-3xl font-bold text-center text-gray-900 mb-6 sm:mb-12">Our Journey</h2>
          </GSAPWrapper>

          <div className="relative w-full">
            <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary"></div>
            <div className="flex flex-col gap-4 sm:gap-6 w-full">
              {milestones.map((milestone, index) => (
                <GSAPWrapper key={index} animation="slideUp" delay={index * 0.2}>
                  <div className={`flex flex-col sm:flex-row items-center mb-0 sm:mb-8 w-full ${index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                    <div className={`w-full sm:w-1/2 ${index % 2 === 0 ? "sm:pr-8 sm:text-right" : "sm:pl-8"}`}>
                      <div className="card mb-2 sm:mb-0 max-w-sm mx-auto w-full">
                        <h4 className="text-base sm:text-xl font-bold text-primary mb-1 sm:mb-2">{milestone.year}</h4>
                        <p className="text-gray-600 text-xs sm:text-base">{milestone.event}</p>
                      </div>
                    </div>
                    <div className="hidden sm:block w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg z-10"></div>
                    <div className="w-0 sm:w-1/2"></div>
                  </div>
                </GSAPWrapper>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Owner Section */}
      <section className="py-8 sm:py-16 bg-gray-50 w-full">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-12 items-center w-full">
            <GSAPWrapper animation="slideLeft">
              <Image
                src="/images/hero.png"
                alt="Owner"
                width={400}
                height={500}
                className="rounded-2xl shadow-2xl mx-auto w-full max-w-xs sm:max-w-full h-auto"
              />
            </GSAPWrapper>

            <GSAPWrapper animation="slideRight">
              <div className="card max-w-sm mx-auto w-full">
                <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4">Meet Our Founder</h3>
                <p className="text-gray-600 text-sm sm:text-lg leading-relaxed mb-2 sm:mb-6">
                  "At Global Jidosha LLC, we believe that buying or selling a car should be a transparent, enjoyable
                  experience. Our commitment to quality and customer satisfaction has been the foundation of our success
                  for over a decade."
                </p>
                <p className="text-primary font-semibold">- Shafri Ahamed, Founder & CEO</p>
              </div>
            </GSAPWrapper>
          </div>
        </div>
      </section>
    </div>
  )
}
