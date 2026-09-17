"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Shield, Users, Award, ArrowRight, ArrowUpRight, TrendingUp, Heart, Share2, X, Copy, Check, Play, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { useLanguage } from "./contexts/LanguageContext"
import dynamic from "next/dynamic"
const GSAPWrapper = dynamic(() => import("./components/GSAPWrapper"), { ssr: false })
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function Home() {
  const { t } = useLanguage()
  const heroRef = useRef<HTMLDivElement>(null)

  const vehicleData = [
    {
      id: 1,
      filename: "0ae9fd3f-8a70-4534-9ef8-1e323eb5b2f9.jpg",
      name: "Toyota Camry Hybrid",
      slug: "toyota-camry-hybrid",
      year: 2022,
      price: "¥3,200,000",
      mileage: "15,000 km",
      fuel: "Hybrid",
      transmission: "CVT",
      status: "available",
      location: "Tokyo",
      rating: 4.8,
      views: 1247,
      featured: true,
      category: "sedan",
      images: ["0ae9fd3f-8a70-4534-9ef8-1e323eb5b2f9.jpg","1.jpeg","2.jpeg","3bb1a247-0d8f-4679-8617-6c47cd27d69c.jpg"]
    },
    {
      id: 2,
      filename: "1.jpeg",
      name: "Honda Civic Type R",
      slug: "honda-civic-type-r",
      year: 2023,
      price: "¥4,500,000",
      mileage: "8,500 km",
      fuel: "Gasoline",
      transmission: "Manual",
      status: "available",
      location: "Osaka",
      rating: 4.9,
      views: 2156,
      featured: true,
      category: "sports",
      images: ["1.jpeg","2.jpeg","3bb1a247-0d8f-4679-8617-6c47cd27d69c.jpg","445abda8-2982-4292-ab86-0d0c7035ab59.jpg"]
    },
    {
      id: 3,
      filename: "10d80668-de14-4bb7-98df-0919a56b4634.jpg",
      name: "Nissan Leaf",
      slug: "nissan-leaf",
      year: 2023,
      price: "¥3,800,000",
      mileage: "12,000 km",
      fuel: "Electric",
      transmission: "Automatic",
      status: "sold",
      location: "Yokohama",
      rating: 4.7,
      views: 1893,
      featured: false,
      category: "electric",
      images: ["10d80668-de14-4bb7-98df-0919a56b4634.jpg","2fb6b4fc-c8a3-48a7-958d-16f355e92f04.jpg","5886d67d-6c33-4d1c-8b08-72cc3692e816.jpg","7ef881f8-678f-42f0-9e1c-5b008f25163b.jpg"]
    },
    {
      id: 4,
      filename: "12.jpeg",
      name: "Mazda CX-5",
      slug: "mazda-cx-5",
      year: 2022,
      price: "¥3,600,000",
      mileage: "18,000 km",
      fuel: "Gasoline",
      transmission: "Automatic",
      status: "available",
      location: "Nagoya",
      rating: 4.6,
      views: 1567,
      featured: false,
      category: "suv",
      images: ["12.jpeg","13.jpeg","14.jpeg","18.jpeg"]
    },
    {
      id: 5,
      filename: "14.jpeg",
      name: "Lexus RX 450h",
      slug: "lexus-rx-450h",
      year: 2022,
      price: "¥6,800,000",
      mileage: "16,000 km",
      fuel: "Hybrid",
      transmission: "Automatic",
      status: "available",
      location: "Tokyo",
      rating: 4.9,
      views: 2789,
      featured: true,
      category: "luxury",
      images: ["18.jpeg","19.jpeg","2.jpeg","2fb6b4fc-c8a3-48a7-958d-16f355e92f04.jpg"]
    },
    {
      id: 6,
      filename: "445abda8-2982-4292-ab86-0d0c7035ab59.jpg",
      name: "Mercedes C-Class",
      slug: "mercedes-benz-c-class",
      year: 2023,
      price: "¥6,200,000",
      mileage: "12,000 km",
      fuel: "Gasoline",
      transmission: "Automatic",
      status: "available",
      location: "Tokyo",
      rating: 4.9,
      views: 2897,
      featured: true,
      category: "luxury",
      images: ["445abda8-2982-4292-ab86-0d0c7035ab59.jpg","5886d67d-6c33-4d1c-8b08-72cc3692e816.jpg","7ef881f8-678f-42f0-9e1c-5b008f25163b.jpg"]
    },
  ]

  const [selectedVehicle, setSelectedVehicle] = useState<typeof vehicleData[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [vehicleShareUrl, setVehicleShareUrl] = useState("")

  const testimonials = [
    { name: "Takeshi Yamamoto", text: "An atelier, not a dealership. The curation, the discretion, the obsessive attention to provenance — this is how collecting should feel.", rating: 5, position: "Entrepreneur • Tokyo", initials: "TY" },
    { name: "Sarah Johnson", text: "From first viewing to delivery, every touchpoint felt bespoke. Transparent, unhurried, and impeccably presented.", rating: 5, position: "Creative Director • Singapore", initials: "SJ" },
    { name: "Hiroshi Tanaka", text: "They achieved a record price for my collection car within 72 hours. Network, presentation, and negotiation — simply world-class.", rating: 5, position: "Collector • Osaka", initials: "HT" },
  ]

  const stats = [
    { number: "10,000+", label: "Cars Placed", sub: "Since 2010" },
    { number: "15+", label: "Years", sub: "Atelier Heritage" },
    { number: "98%", label: "Client Retention", sub: "Referral Only" },
    { number: "24H", label: "Concierge", sub: "White-Glove" },
  ]

  const banners = [
    "/images/baners/000.jpeg",
    "/images/baners/images (7).jpeg",
    "/images/baners/images (9).jpeg",
    "/images/baners/Untitled.jpg",
    "/images/baners/Untitled(1).jpg",
  ]

  const [currentBanner, setCurrentBanner] = useState(0)
  const bannerCount = banners.length
  const bannerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    bannerIntervalRef.current = setInterval(() => { setCurrentBanner((prev) => (prev + 1) % bannerCount) }, 4500)
    return () => { if (bannerIntervalRef.current) clearInterval(bannerIntervalRef.current) }
  }, [bannerCount])

  const goToBanner = (idx: number) => setCurrentBanner(idx)
  const openModal = (vehicle: typeof vehicleData[0]) => { setSelectedVehicle(vehicle); setCurrentImageIndex(0); setIsModalOpen(true) }
  const closeModal = () => { setIsModalOpen(false); setSelectedVehicle(null) }
  const openContactModal = () => { setContactForm({ name: "", email: "", phone: "", message: "" }); setIsContactModalOpen(true) }
  const closeContactModal = () => { setIsContactModalOpen(false); setContactForm({ name: "", email: "", phone: "", message: "" }) }
  const openShareModal = () => setIsShareModalOpen(true)
  const closeShareModal = () => { setIsShareModalOpen(false); setIsCopied(false); setVehicleShareUrl("") }
  const toggleFavorite = (vehicleId: number) => { setFavorites(prev => prev.includes(vehicleId) ? prev.filter(id => id !== vehicleId) : [...prev, vehicleId]) }
  const nextImage = () => { if (selectedVehicle) setCurrentImageIndex((prev) => prev === selectedVehicle.images.length - 1 ? 0 : prev + 1) }
  const prevImage = () => { if (selectedVehicle) setCurrentImageIndex((prev) => prev === 0 ? selectedVehicle.images.length - 1 : prev - 1) }
  const selectImage = (index: number) => setCurrentImageIndex(index)
  const shareVehicle = (vehicle: typeof vehicleData[0]) => { const vehicleUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/gallery?vehicle=${vehicle.slug}`; setVehicleShareUrl(vehicleUrl); openShareModal() }
  const handleContactSubmit = async (e: React.FormEvent) => { e.preventDefault(); setIsSubmitting(true); await new Promise(resolve => setTimeout(resolve, 1000)); setIsSubmitting(false); closeContactModal(); alert("Thank you for your inquiry — our concierge will respond within 2 hours.") }
  const copyGalleryLink = async () => { try { const urlToCopy = vehicleShareUrl || (typeof window !== 'undefined' ? window.location.href : ''); await navigator.clipboard.writeText(urlToCopy); setIsCopied(true); setTimeout(() => setIsCopied(false), 2000) } catch (err) { console.error(err) } }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen || !selectedVehicle) return
      if (e.key === 'ArrowLeft') { e.preventDefault(); prevImage() }
      if (e.key === 'ArrowRight') { e.preventDefault(); nextImage() }
      if (e.key === 'Escape') { e.preventDefault(); closeModal() }
    }
    if (isModalOpen) { document.addEventListener('keydown', handleKeyDown); return () => document.removeEventListener('keydown', handleKeyDown) }
  }, [isModalOpen, selectedVehicle, currentImageIndex])

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)
      if (heroRef.current) {
        const tl = gsap.timeline()
        tl.fromTo(heroRef.current.querySelector(".hero-eyebrow"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
          .fromTo(heroRef.current.querySelector(".hero-title"), { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" }, "-=0.6")
          .fromTo(heroRef.current.querySelector(".hero-line"), { width: 0, opacity: 0 }, { width: "100%", opacity: 1, duration: 1.2, ease: "power2.inOut" }, "-=0.5")
          .fromTo(heroRef.current.querySelector(".hero-subtitle"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }, "-=0.8")
          .fromTo(heroRef.current.querySelector(".hero-cta"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.5")
          .fromTo(heroRef.current.querySelector(".hero-stats"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }, "-=0.4")
        gsap.to(heroRef.current.querySelector(".hero-bg"), { yPercent: -10, ease: "none", scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true } })
      }
      gsap.fromTo(".featured-car", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power2.out", scrollTrigger: { trigger: ".featured-section", start: "top 80%" } })
      gsap.fromTo(".benefit-card", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: ".benefits-section", start: "top 75%" } })
    }
    loadGSAP()
  }, [])

  return (
    <div className="min-h-screen w-full bg-[#FCFBF9]">
      {/* HERO - LUXURY EDITORIAL */}
      <section ref={heroRef} className="relative min-h-[96vh] flex items-center overflow-hidden w-full bg-[#070708]">
        <div className="absolute inset-0 z-0">
          <Image src="/images/hd.jpeg" alt="Luxury automobiles" fill className="hero-bg object-cover object-center" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-[#070708]/65 to-[#070708]/35"></div>
          <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage: `linear-gradient(#C5A880 1px, transparent 1px), linear-gradient(90deg, #C5A880 1px, transparent 1px)`, backgroundSize: '80px 80px'}}></div>
        </div>

        {/* Side vertical text */}
        <div className="hidden xl:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-8">
          <span className="text-[10px] tracking-[0.32em] uppercase text-white/30 rotate-90 whitespace-nowrap">Tokyo • Since 2010</span>
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-[#C5A880]/50 to-transparent"></div>
          <span className="text-[10px] tracking-[0.32em] uppercase text-white/30 rotate-90 whitespace-nowrap">Private Atelier</span>
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-8 pt-[88px]">
          <div className="max-w-4xl">
            <GSAPWrapper animation="fadeIn">
              <p className="hero-eyebrow inline-flex items-center gap-3 text-[11px] tracking-[0.32em] uppercase text-[#C5A880] mb-6 border border-[#C5A880]/20 px-4 py-2 bg-[#070708]/40 backdrop-blur">
                <span className="w-6 h-px bg-[#C5A880]"></span> Est. 2010 • Japan&apos;s Private Atelier • By Appointment
              </p>
            </GSAPWrapper>

            <h1 className="hero-title text-white leading-[0.85] tracking-[-0.03em] font-light" style={{fontFamily: 'Cormorant Garamond, serif'}}>
              <span className="block text-[14px] sm:text-[16px] tracking-[0.28em] uppercase font-medium text-[#C5A880] mb-4" style={{fontFamily: 'Inter, sans-serif'}}>The Art of Exceptional</span>
              <span className="block text-[52px] sm:text-[68px] lg:text-[92px]">Curated</span>
              <span className="block text-[52px] sm:text-[68px] lg:text-[92px] italic font-light text-[#E8D9B8]">Automobiles</span>
            </h1>

            <div className="hero-line h-px bg-gradient-to-r from-[#C5A880] via-[#C5A880]/40 to-transparent my-7 max-w-xl"></div>

            <p className="hero-subtitle text-[15px] sm:text-[18px] leading-8 text-white/70 max-w-[560px] font-light">
              Discreet acquisition & consignment for collectors who demand provenance, presentation, and absolute precision. A gallery, not a showroom.
            </p>

            <div className="hero-cta flex flex-col sm:flex-row gap-4 mt-10">
              <Link href="/gallery" className="group inline-flex items-center justify-center gap-3 bg-[#C5A880] hover:bg-[#D4B896] text-[#070708] px-9 py-4 text-[12px] tracking-[0.16em] uppercase font-semibold transition-all duration-300">
                Discover Collection <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button onClick={openContactModal} className="inline-flex items-center justify-center gap-3 border border-white/15 hover:border-[#C5A880]/50 hover:bg-white/[0.04] text-white px-9 py-4 text-[12px] tracking-[0.16em] uppercase font-medium backdrop-blur transition-all">
                Private Consultation
              </button>
              <Link href="/gallery" className="hidden sm:inline-flex items-center justify-center w-14 h-[52px] border border-white/10 hover:border-[#C5A880]/30 text-white/60 hover:text-[#C5A880] transition-colors">
                <Play className="h-4 w-4 ml-0.5" />
              </Link>
            </div>

            {/* Hero stats - luxury minimal */}
            <div className="hero-stats grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 mt-14 pt-8 border-t border-white/10 max-w-3xl">
              {stats.map((s) => (
                <div key={s.label} className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-light text-white tracking-tight" style={{fontFamily: 'Cormorant Garamond, serif'}}>{s.number}</div>
                  <div className="text-[11px] tracking-[0.14em] uppercase text-[#C5A880] font-medium">{s.label}</div>
                  <div className="text-[11px] text-white/40 tracking-wide">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-3">
          <span className="text-[10px] tracking-[0.2em] uppercase text-white/30">Explore</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent animate-pulse"></div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-[#070708] border-y border-[#C5A880]/10 py-6">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 flex flex-wrap items-center justify-between gap-6">
          <p className="text-[11px] tracking-[0.2em] uppercase text-white/40">Trusted by collectors across Japan & Asia</p>
          <div className="flex items-center gap-8 md:gap-12 text-white/20 text-[12px] tracking-[0.18em] uppercase font-medium">
            <span>TOYOTA</span><span className="w-1 h-1 rounded-full bg-[#C5A880]/40"></span>
            <span>MERCEDES</span><span className="w-1 h-1 rounded-full bg-[#C5A880]/40"></span>
            <span>LEXUS</span><span className="w-1 h-1 rounded-full bg-[#C5A880]/40"></span>
            <span>BMW</span><span className="hidden sm:inline-flex items-center gap-8"><span className="w-1 h-1 rounded-full bg-[#C5A880]/40"></span> PORSCHE</span>
          </div>
        </div>
      </section>

      {/* FEATURED COLLECTION - LUXURY DARK */}
      <section className="py-20 md:py-28 bg-[#FCFBF9] featured-section">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <div>
              <p className="text-[11px] tracking-[0.28em] uppercase text-[#C5A880] mb-4 flex items-center gap-3"><span className="w-8 h-px bg-[#C5A880]"></span> Private Collection</p>
              <h2 className="text-4xl md:text-[52px] font-light leading-none tracking-[-0.02em] text-[#0A0A0B]" style={{fontFamily: 'Cormorant Garamond, serif'}}>
                The <span className="italic text-[#9C835D]">Current</span> Selection
              </h2>
              <p className="text-[15px] leading-7 text-[#6B6B6B] max-w-xl mt-4 font-light">
                Each automobile is authenticated, documented, and presented to concours standards. Available exclusively through private viewing.
              </p>
            </div>
            <Link href="/gallery" className="inline-flex items-center gap-2 text-[12px] tracking-[0.14em] uppercase font-medium text-[#0A0A0B] border-b border-[#C5A880] pb-2 hover:text-[#C5A880] transition-colors self-start lg:self-auto group">
              View Complete Collection <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {vehicleData.map((vehicle, index) => (
              <div key={vehicle.id} className="group featured-car bg-white border border-[#E8E6E1] hover:border-[#C5A880]/30 hover:shadow-[0_20px_60px_rgba(10,10,11,0.08)] transition-all duration-700 overflow-hidden flex flex-col">
                <div className="relative h-[280px] overflow-hidden bg-[#F5F0E8]">
                  <img
                    src={`/images/vehicles/${vehicle.images[0]}`}
                    alt={vehicle.name}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105 cursor-pointer"
                    onClick={() => openModal(vehicle)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    {vehicle.featured && (
                      <span className="bg-[#070708] text-[#C5A880] text-[10px] tracking-[0.14em] uppercase px-3 py-1.5 font-medium">Curated</span>
                    )}
                    <span className={`text-[10px] tracking-[0.12em] uppercase px-3 py-1.5 font-medium ${vehicle.status === "available" ? "bg-[#C5A880] text-[#070708]" : "bg-[#1A1A1E] text-white/70"}`}>
                      {vehicle.status === "available" ? "Available" : "Reserved"}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-1.5">
                    <button onClick={(e) => { e.stopPropagation(); toggleFavorite(vehicle.id) }} className="w-9 h-9 bg-white/90 backdrop-blur hover:bg-white flex items-center justify-center transition-colors">
                      <Heart className={`h-4 w-4 ${favorites.includes(vehicle.id) ? 'fill-[#C5A880] text-[#C5A880]' : 'text-[#0A0A0B]/60'}`} />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); shareVehicle(vehicle) }} className="w-9 h-9 bg-white/90 backdrop-blur hover:bg-white flex items-center justify-center text-[#0A0A0B]/60 transition-colors">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <button onClick={() => openModal(vehicle)} className="w-full bg-[#070708] hover:bg-black text-white py-3 text-[11px] tracking-[0.14em] uppercase font-medium flex items-center justify-center gap-2">
                      View Dossier <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-[18px] font-medium leading-tight text-[#0A0A0B] group-hover:text-[#9C835D] transition-colors" style={{fontFamily: 'Cormorant Garamond, serif'}}>
                      {vehicle.name}
                    </h3>
                    <span className="text-[11px] tracking-wide text-[#9C835D] border border-[#E8D9B8] px-2 py-1 whitespace-nowrap">{vehicle.year}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] tracking-wide text-[#8A8A8A] mb-4">
                    <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-[#C5A880]"></span> {vehicle.location}</span>
                    <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-[#C5A880] text-[#C5A880]" /> {vehicle.rating}</span>
                    <span className="ml-auto text-[#0A0A0B]/40">{vehicle.views.toLocaleString()} views</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    <span className="text-[11px] px-2.5 py-1 bg-[#F5F0E8] text-[#6B6B6B] tracking-wide">{vehicle.fuel}</span>
                    <span className="text-[11px] px-2.5 py-1 bg-[#F5F0E8] text-[#6B6B6B] tracking-wide">{vehicle.transmission}</span>
                    <span className="text-[11px] px-2.5 py-1 bg-[#F5F0E8] text-[#6B6B6B] tracking-wide">{vehicle.mileage}</span>
                  </div>
                  <div className="mt-auto flex items-end justify-between border-t border-[#E8E6E1] pt-4">
                    <div>
                      <p className="text-[11px] tracking-[0.14em] uppercase text-[#9C835D] mb-1">Asking</p>
                      <p className="text-2xl font-light text-[#0A0A0B]" style={{fontFamily: 'Cormorant Garamond, serif'}}>{vehicle.price}</p>
                    </div>
                    <span className="text-[11px] tracking-wide text-[#8A8A8A] hidden sm:block">Private viewing • Tokyo</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/gallery" className="inline-flex items-center gap-3 bg-[#0A0A0B] hover:bg-[#1A1A1E] text-white px-10 py-4 text-[12px] tracking-[0.14em] uppercase font-medium transition-colors">
              View Full Collection <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="text-[11px] tracking-wide text-[#8A8A8A] mt-3">37 automobiles currently available • Updated hourly</p>
          </div>
        </div>
      </section>

      {/* BANNER CAROUSEL - LUXURY FRAMED */}
      <section className="py-10 bg-[#070708]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#C5A880]">The Atelier in Motion</p>
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentBanner((p) => (p - 1 + bannerCount) % bannerCount)} className="w-9 h-9 border border-white/10 hover:border-[#C5A880]/40 text-white/60 hover:text-[#C5A880] flex items-center justify-center transition-colors"><ChevronLeft className="h-4 w-4" /></button>
              <button onClick={() => setCurrentBanner((p) => (p + 1) % bannerCount)} className="w-9 h-9 border border-white/10 hover:border-[#C5A880]/40 text-white/60 hover:text-[#C5A880] flex items-center justify-center transition-colors"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
          <div className="relative overflow-hidden border border-white/5 bg-black">
            <div className="flex transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]" style={{ transform: `translateX(-${currentBanner * 100}%)` }}>
              {banners.map((src, idx) => (
                <div key={src} className="min-w-full h-[38vw] min-h-[280px] max-h-[520px] relative flex-shrink-0">
                  <img src={src} alt={`Atelier ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    <span className="text-white/80 text-[12px] tracking-[0.16em] uppercase bg-black/40 backdrop-blur px-3 py-1.5 border border-white/10">Global Jidosha Atelier 0{idx+1} / 0{bannerCount}</span>
                    <span className="hidden md:block text-white/60 text-[11px] tracking-wide">Tokyo • Yokohama • Nagoya</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-5">
            {banners.map((_, idx) => (
              <button key={idx} onClick={() => goToBanner(idx)} aria-label={`Go to ${idx + 1}`} className={`h-px transition-all duration-500 ${currentBanner === idx ? 'w-10 bg-[#C5A880]' : 'w-6 bg-white/20 hover:bg-white/40'}`} />
            ))}
          </div>
        </div>
      </section>

      {/* THE ATELIER DIFFERENCE */}
      <section className="py-20 md:py-28 bg-[#FCFBF9] benefits-section border-t border-[#E8E6E1]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#C5A880] mb-4 flex items-center gap-3"><span className="w-8 h-px bg-[#C5A880]"></span> The Atelier Difference</p>
            <h2 className="text-4xl md:text-[52px] font-light leading-[0.95] tracking-[-0.02em] text-[#0A0A0B]" style={{fontFamily: 'Cormorant Garamond, serif'}}>
              Why <span className="italic text-[#9C835D]">discerning</span> clients entrust us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { num: "01", icon: Shield, title: "Provenance & Precision", desc: "Every automobile undergoes a 157-point authentication, history verification, and concours-level preparation. Transparency is non-negotiable.", accent: "Quality" },
              { num: "02", icon: Users, title: "Bespoke Concierge", desc: "A dedicated specialist manages documentation, logistics, and aftercare — private viewings, doorstep delivery, and ongoing stewardship.", accent: "Service" },
              { num: "03", icon: Award, title: "Legacy & Trust", desc: "Fifteen years of private transactions, zero compromise. Our reputation is built on discretion and repeat patronage from Japan's collector community.", accent: "Trust" },
            ].map((b, i) => (
              <div key={i} className="benefit-card group bg-white border border-[#E8E6E1] hover:border-[#C5A880]/25 p-8 lg:p-10 hover:shadow-[0_20px_60px_rgba(10,10,11,0.07)] transition-all duration-700 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C5A880]/0 group-hover:via-[#C5A880]/60 to-transparent transition-all duration-700"></div>
                <div className="flex items-start justify-between mb-8">
                  <div className="w-14 h-14 border border-[#C5A880]/20 group-hover:border-[#C5A880]/40 flex items-center justify-center transition-colors">
                    <b.icon className="h-6 w-6 text-[#9C835D]" />
                  </div>
                  <span className="text-[12px] tracking-[0.2em] font-medium text-[#C5A880]/60" style={{fontFamily: 'Inter, sans-serif'}}>{b.num} — {b.accent}</span>
                </div>
                <h3 className="text-[22px] font-medium leading-tight text-[#0A0A0B] mb-4" style={{fontFamily: 'Cormorant Garamond, serif'}}>{b.title}</h3>
                <p className="text-[14px] leading-7 text-[#6B6B6B] font-light">{b.desc}</p>
                <div className="mt-8 pt-6 border-t border-[#F5F0E8] flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase text-[#9C835D] font-medium">
                  Learn more <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - LUXURY DARK */}
      <section className="py-20 md:py-28 bg-[#070708] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: `radial-gradient(#C5A880 1px, transparent 1px)`, backgroundSize: '24px 24px'}}></div>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-[11px] tracking-[0.28em] uppercase text-[#C5A880] mb-4">Client Reflections</p>
              <h2 className="text-4xl md:text-[52px] font-light leading-none text-white tracking-[-0.02em]" style={{fontFamily: 'Cormorant Garamond, serif'}}>
                In their <span className="italic text-[#C5A880]">words</span>
              </h2>
            </div>
            <p className="text-[14px] leading-7 text-white/50 max-w-md font-light">A private clientele who value discretion as much as excellence. Names shared with permission.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white/[0.03] backdrop-blur border border-white/[0.06] hover:border-[#C5A880]/20 p-8 lg:p-10 transition-all duration-500 group">
                <Quote className="h-8 w-8 text-[#C5A880]/30 mb-6" />
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-[#C5A880] text-[#C5A880]" />)}
                </div>
                <p className="text-[16px] leading-8 text-white/80 font-light mb-8 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                  <div className="w-11 h-11 rounded-full bg-[#C5A880] text-[#070708] flex items-center justify-center text-[12px] font-semibold tracking-wide">{t.initials}</div>
                  <div>
                    <p className="text-[13px] font-medium text-white tracking-wide">{t.name}</p>
                    <p className="text-[11px] tracking-wide text-white/40">{t.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HERITAGE / COMPANY */}
      <section className="py-20 md:py-28 bg-[#F5F0E8] border-y border-[#E8D9B8]/30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          <div className="flex-1 grid grid-cols-2 gap-4 w-full">
            <div className="space-y-4">
              <div className="bg-white border border-[#E8D9B8]/40 p-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                <img src="/images/Untitled.jpg" alt="Atelier document" className="w-full h-auto object-contain" />
                <p className="text-[10px] tracking-[0.14em] uppercase text-[#9C835D] mt-3 text-center">Atelier Credentials</p>
              </div>
              <div className="bg-[#070708] text-white p-6 border border-[#C5A880]/20">
                <p className="text-3xl font-light" style={{fontFamily: 'Cormorant Garamond, serif'}}>15<span className="text-[#C5A880]">+</span></p>
                <p className="text-[11px] tracking-[0.14em] uppercase text-white/60 mt-1">Years of Discreet Excellence</p>
                <p className="text-[12px] leading-6 text-white/50 mt-3 font-light">Purchasing accident vehicles, non-compliant inspections (Kanagawa/Tokyo/Chiba), machinery & forklifts — with dignity and fair valuation.</p>
              </div>
            </div>
            <div className="bg-white border border-[#E8D9B8]/40 p-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)] h-fit">
              <img src="/images/Untitled (1).jpg" alt="Business card" className="w-full h-auto object-contain" />
              <div className="pt-4 text-center">
                <p className="text-[11px] tracking-[0.14em] uppercase text-[#9C835D]">Direct Line</p>
                <p className="text-[13px] font-medium text-[#0A0A0B] mt-1">070-3991-0710 • 043-371-3707</p>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#9C835D] mb-4 flex items-center gap-3"><span className="w-8 h-px bg-[#C5A880]"></span> Heritage — お知らせ</p>
            <h2 className="text-3xl md:text-[42px] font-light leading-[0.95] tracking-[-0.02em] text-[#0A0A0B] mb-6" style={{fontFamily: 'Cormorant Garamond, serif'}}>
              Global Jidosha LLC —<br /><span className="italic text-[#9C835D]">Where provenance meets discretion.</span>
            </h2>
            <div className="h-px bg-gradient-to-r from-[#C5A880] to-transparent w-24 mb-6"></div>
            <div className="bg-white border border-[#E8D9B8]/40 p-6 mb-6">
              <p className="text-[14px] leading-7 text-[#0A0A0B] font-medium">
                車の販売をご希望の場合は、弊社で購入させていただきますので、下記までお電話ください。無料でご来店いたします。事故車も購入します。また、神奈川県と東京千葉県では、車検（排気ガス規制）に合格しない車を購入します。また、さまざまな機械、発電機、ヤンボ、フォークリフトも購入しています。
              </p>
            </div>
            <p className="text-[14px] leading-7 text-[#6B6B6B] font-light">
              At <span className="font-medium text-[#0A0A0B]">Global Jidosha LLC</span>, we operate as an atelier, not a lot. Whether consigning a single cherished motor car, an entire collection, or specialist machinery, our valuation is fair, our process is confidential, and our hospitality is absolute. Contact us for a complimentary, no-obligation visit — anywhere in Kanto.
            </p>
            <div className="flex gap-3 mt-8">
              <Link href="/about" className="inline-flex items-center gap-2 bg-[#0A0A0B] text-white px-7 py-3 text-[11px] tracking-[0.14em] uppercase font-medium hover:bg-black transition-colors">
                Our Heritage <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 border border-[#0A0A0B] text-[#0A0A0B] px-7 py-3 text-[11px] tracking-[0.14em] uppercase font-medium hover:bg-[#0A0A0B] hover:text-white transition-colors">
                Visit Atelier
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA - INVITATION */}
      <section className="relative py-20 md:py-28 bg-[#070708] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-20" style={{backgroundImage: `linear-gradient(rgba(197,168,128,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(197,168,128,0.08) 1px, transparent 1px)`, backgroundSize: '60px 60px'}}></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#C5A880]/10 blur-[120px] rounded-full"></div>
        </div>
        <div className="relative max-w-[900px] mx-auto px-6 lg:px-8 text-center">
          <p className="text-[11px] tracking-[0.32em] uppercase text-[#C5A880] mb-6 flex items-center justify-center gap-4"><span className="w-8 h-px bg-[#C5A880]/40"></span> Private Invitation <span className="w-8 h-px bg-[#C5A880]/40"></span></p>
          <h2 className="text-4xl md:text-[56px] font-light leading-[0.9] tracking-[-0.02em] text-white mb-6" style={{fontFamily: 'Cormorant Garamond, serif'}}>
            Your next <span className="italic text-[#C5A880]">acquisition</span><br />begins with a conversation.
          </h2>
          <p className="text-[15px] leading-7 text-white/60 max-w-2xl mx-auto font-light mb-10">
            Whether acquiring your first collector car or placing a collection discreetly, our concierge is available for a confidential consultation — in person, by phone, or via LINE.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/gallery" className="inline-flex items-center justify-center gap-3 bg-[#C5A880] hover:bg-[#D4B896] text-[#070708] px-10 py-4 text-[12px] tracking-[0.14em] uppercase font-semibold transition-colors">
              Enter Collection <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-3 border border-white/15 hover:border-[#C5A880]/50 hover:bg-white/[0.04] text-white px-10 py-4 text-[12px] tracking-[0.14em] uppercase font-medium transition-colors">
              Schedule Viewing
            </Link>
          </div>
          <div className="mt-12 flex flex-col items-center gap-4">
            <a href="https://line.me/ti/p/EkPpp8Teqj" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-[#06C755] hover:bg-[#05b64d] text-white px-7 py-3 text-[13px] font-semibold transition-colors">
              <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6"><rect width="40" height="40" rx="8" fill="white" fillOpacity="0.15"/><path d="M20 10C13.373 10 8 14.477 8 20c0 4.477 4.03 8.19 9.5 8.89.37.08.88.25 1.01.57.12.3.08.77.04 1.07l-.16 1.01c-.05.3-.23 1.18 1.04.64 1.27-.54 6.8-4.01 9.29-6.87C32 24.477 32 20 32 20c0-5.523-5.373-10-12-10z" fill="white"/></svg>
              Add us on LINE — Instant Concierge
            </a>
            <span className="text-[11px] tracking-wide text-white/40">Average response time: 18 minutes • Available in English & Japanese</span>
          </div>
        </div>
      </section>

      {/* VEHICLE MODAL - LUXURY */}
      {isModalOpen && selectedVehicle && (
        <div className="fixed inset-0 bg-[#070708]/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#FCFBF9] max-w-5xl w-full max-h-[92vh] overflow-y-auto border border-[#E8D9B8]/30 shadow-[0_25px_80px_rgba(0,0,0,0.5)]">
            <div className="relative">
              <Button variant="ghost" size="sm" className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white border border-[#E8E6E1]" onClick={closeModal}><X className="h-4 w-4" /></Button>
              <div className="relative bg-[#0A0A0B]">
                <img src={`/images/vehicles/${selectedVehicle.images[currentImageIndex]}`} alt={`${selectedVehicle.name} - ${currentImageIndex + 1}`} className="w-full h-[380px] sm:h-[520px] object-cover" />
                {selectedVehicle.images.length > 1 && (
                  <>
                    <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/90 hover:bg-white flex items-center justify-center text-[#0A0A0B] transition-colors"><ChevronLeft className="h-5 w-5" /></button>
                    <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/90 hover:bg-white flex items-center justify-center text-[#0A0A0B] transition-colors"><ChevronRight className="h-5 w-5" /></button>
                  </>
                )}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur text-white px-3 py-1.5 text-[11px] tracking-wide border border-white/10">{currentImageIndex + 1} / {selectedVehicle.images.length}</div>
                <div className="absolute bottom-4 left-4 bg-[#C5A880] text-[#070708] px-3 py-1.5 text-[11px] tracking-[0.12em] uppercase font-medium">{selectedVehicle.status === 'available' ? 'Available for Private Viewing' : 'Reserved'}</div>
              </div>
              {selectedVehicle.images.length > 1 && (
                <div className="p-4 border-y border-[#E8E6E1] bg-white">
                  <div className="flex gap-2 overflow-x-auto">
                    {selectedVehicle.images.map((img, idx) => (
                      <button key={idx} onClick={() => selectImage(idx)} className={`flex-shrink-0 w-20 h-14 overflow-hidden border-2 transition-all ${idx === currentImageIndex ? 'border-[#C5A880] ' : 'border-[#E8E6E1] hover:border-[#C5A880]/40'}`}>
                        <img src={`/images/vehicles/${img}`} alt={`Thumb ${idx+1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="p-8">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                <div>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-[#9C835D] mb-2">{selectedVehicle.category} • {selectedVehicle.location}</p>
                  <h2 className="text-3xl font-light text-[#0A0A0B]" style={{fontFamily: 'Cormorant Garamond, serif'}}>{selectedVehicle.name}</h2>
                  <p className="text-[13px] text-[#8A8A8A] mt-1">{selectedVehicle.year} • {selectedVehicle.mileage} • {selectedVehicle.fuel}</p>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-[11px] tracking-[0.14em] uppercase text-[#9C835D]">Asking Price</p>
                  <p className="text-3xl font-light text-[#0A0A0B]" style={{fontFamily: 'Cormorant Garamond, serif'}}>{selectedVehicle.price}</p>
                  <p className="text-[11px] text-[#8A8A8A] flex items-center md:justify-end gap-1 mt-1"><Star className="h-3 w-3 fill-[#C5A880] text-[#C5A880]" /> {selectedVehicle.rating} • {selectedVehicle.views.toLocaleString()} views</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {[
                  { label: "Fuel", value: selectedVehicle.fuel },
                  { label: "Transmission", value: selectedVehicle.transmission },
                  { label: "Mileage", value: selectedVehicle.mileage },
                  { label: "Status", value: selectedVehicle.status },
                ].map(k => (
                  <div key={k.label} className="bg-[#F5F0E8] border border-[#E8D9B8]/30 p-4 text-center">
                    <div className="text-[13px] font-medium text-[#0A0A0B]">{k.value}</div>
                    <div className="text-[11px] tracking-[0.1em] uppercase text-[#9C835D] mt-1">{k.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1 bg-[#0A0A0B] hover:bg-black text-white rounded-none py-6 text-[12px] tracking-[0.12em] uppercase font-medium" onClick={() => openContactModal()}>Request Private Viewing</Button>
                <Button variant="outline" className="rounded-none border-[#E8D9B8] hover:bg-[#F5F0E8] py-6" onClick={() => shareVehicle(selectedVehicle)}><Share2 className="h-4 w-4 mr-2" /> Share</Button>
                <Button variant="outline" className="rounded-none border-[#E8D9B8] hover:bg-[#F5F0E8] py-6" onClick={() => toggleFavorite(selectedVehicle.id)}><Heart className={`h-4 w-4 mr-2 ${favorites.includes(selectedVehicle.id) ? 'fill-[#C5A880] text-[#C5A880]' : ''}`} />{favorites.includes(selectedVehicle.id) ? 'Saved' : 'Save'}</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTACT MODAL */}
      {isContactModalOpen && (
        <div className="fixed inset-0 bg-[#070708]/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#FCFBF9] max-w-md w-full border border-[#E8D9B8]/30 shadow-[0_25px_80px_rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-between p-6 border-b border-[#E8E6E1]">
              <div>
                <h2 className="text-xl font-light text-[#0A0A0B]" style={{fontFamily: 'Cormorant Garamond, serif'}}>Private Consultation</h2>
                <p className="text-[11px] tracking-wide text-[#9C835D] mt-1">Response within 2 hours • Confidential</p>
              </div>
              <Button variant="ghost" size="sm" onClick={closeContactModal}><X className="h-4 w-4" /></Button>
            </div>
            <form onSubmit={handleContactSubmit} className="p-6 space-y-4">
              <div><Label htmlFor="name" className="text-[11px] tracking-[0.12em] uppercase">Name *</Label><Input id="name" value={contactForm.name} onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))} required className="rounded-none border-[#E8E6E1] mt-1" /></div>
              <div><Label htmlFor="email" className="text-[11px] tracking-[0.12em] uppercase">Email *</Label><Input id="email" type="email" value={contactForm.email} onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))} required className="rounded-none border-[#E8E6E1] mt-1" /></div>
              <div><Label htmlFor="phone" className="text-[11px] tracking-[0.12em] uppercase">Phone *</Label><Input id="phone" type="tel" value={contactForm.phone} onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))} required className="rounded-none border-[#E8E6E1] mt-1" /></div>
              <div><Label htmlFor="message" className="text-[11px] tracking-[0.12em] uppercase">Message *</Label><Textarea id="message" value={contactForm.message} onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))} rows={4} required className="rounded-none border-[#E8E6E1] mt-1" placeholder="Tell us about your acquisition or consignment…" /></div>
              <div className="flex gap-2 pt-2">
                <Button type="submit" className="flex-1 bg-[#0A0A0B] hover:bg-black text-white rounded-none py-6 text-[12px] tracking-[0.12em] uppercase" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Send Inquiry"}</Button>
                <Button type="button" variant="outline" onClick={closeContactModal} className="rounded-none">Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SHARE MODAL */}
      {isShareModalOpen && (
        <div className="fixed inset-0 bg-[#070708]/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#FCFBF9] max-w-md w-full border border-[#E8D9B8]/30 shadow-[0_25px_80px_rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-between p-6 border-b border-[#E8E6E1]">
              <h2 className="text-lg font-light" style={{fontFamily: 'Cormorant Garamond, serif'}}>Share Vehicle</h2>
              <Button variant="ghost" size="sm" onClick={closeShareModal}><X className="h-4 w-4" /></Button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-[13px] leading-6 text-[#6B6B6B]">Share this private listing with your circle:</p>
              <div className="flex gap-2">
                <Input value={vehicleShareUrl || (typeof window !== 'undefined' ? window.location.href : '')} readOnly className="flex-1 rounded-none" />
                <Button variant="outline" onClick={copyGalleryLink} className="whitespace-nowrap rounded-none border-[#C5A880] text-[#0A0A0B]">{isCopied ? <><Check className="h-4 w-4 mr-2" /> Copied!</> : <><Copy className="h-4 w-4 mr-2" /> Copy</>}</Button>
              </div>
              <div className="flex gap-2 pt-2">
                <Button className="flex-1 bg-[#0A0A0B] hover:bg-black text-white rounded-none" onClick={() => { if (navigator.share) navigator.share({ title: "Global Jidosha Collection", text: "Discover this curated automobile", url: vehicleShareUrl || (typeof window !== 'undefined' ? window.location.href : '') }) }}><Share2 className="h-4 w-4 mr-2" /> Share</Button>
                <Button variant="outline" onClick={closeShareModal} className="rounded-none">Close</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
