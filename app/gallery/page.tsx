"use client"

import { useState, useEffect, useMemo, Suspense } from "react"
import { useLanguage } from "../contexts/LanguageContext"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Search, Grid3X3, List, Filter, Share2, Heart, Eye, Calendar, MapPin, Users, Star, X, Copy, Check, Car } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

const GSAPWrapper = dynamic(() => import("../components/GSAPWrapper"), { ssr: false })

// Enhanced vehicle data with more details and sub-images
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
    images: [
      "0ae9fd3f-8a70-4534-9ef8-1e323eb5b2f9.jpg",
      "1.jpeg",
      "2.jpeg",
      "3bb1a247-0d8f-4679-8617-6c47cd27d69c.jpg"
    ]
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
    images: [
      "1.jpeg",
      "2.jpeg",
      "3bb1a247-0d8f-4679-8617-6c47cd27d69c.jpg",
      "445abda8-2982-4292-ab86-0d0c7035ab59.jpg"
    ]
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
    images: [
      "10d80668-de14-4bb7-98df-0919a56b4634.jpg",
      "2fb6b4fc-c8a3-48a7-958d-16f355e92f04.jpg",
      "5886d67d-6c33-4d1c-8b08-72cc3692e816.jpg",
      "7ef881f8-678f-42f0-9e1c-5b008f25163b.jpg"
    ]
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
    images: [
      "12.jpeg",
      "13.jpeg",
      "14.jpeg",
      "18.jpeg"
    ]
  },
  {
    id: 5,
    filename: "13.jpeg",
    name: "Subaru WRX STI",
    slug: "subaru-wrx-sti",
    year: 2021,
    price: "¥5,200,000",
    mileage: "22,000 km",
    fuel: "Gasoline",
    transmission: "Manual",
    status: "available",
    location: "Sapporo",
    rating: 4.9,
    views: 3421,
    featured: true,
    category: "sports",
    images: [
      "13.jpeg",
      "14.jpeg",
      "18.jpeg",
      "19.jpeg"
    ]
  },
  {
    id: 6,
    filename: "14.jpeg",
    name: "Toyota Prius",
    slug: "toyota-prius",
    year: 2023,
    price: "¥2,900,000",
    mileage: "9,500 km",
    fuel: "Hybrid",
    transmission: "CVT",
    status: "available",
    location: "Fukuoka",
    rating: 4.5,
    views: 987,
    featured: false,
    category: "hybrid",
    images: [
      "14.jpeg",
      "18.jpeg",
      "19.jpeg",
      "2.jpeg"
    ]
  },
  {
    id: 7,
    filename: "18.jpeg",
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
    images: [
      "18.jpeg",
      "19.jpeg",
      "2.jpeg",
      "2fb6b4fc-c8a3-48a7-958d-16f355e92f04.jpg"
    ]
  },
  {
    id: 8,
    filename: "19.jpeg",
    name: "Mitsubishi Outlander PHEV",
    slug: "mitsubishi-outlander-phev",
    year: 2023,
    price: "¥4,200,000",
    mileage: "11,000 km",
    fuel: "Plug-in Hybrid",
    transmission: "Automatic",
    status: "available",
    location: "Kyoto",
    rating: 4.4,
    views: 1345,
    featured: false,
    category: "suv",
    images: [
      "19.jpeg",
      "2.jpeg",
      "2fb6b4fc-c8a3-48a7-958d-16f355e92f04.jpg",
      "3bb1a247-0d8f-4679-8617-6c47cd27d69c.jpg"
    ]
  },
  {
    id: 9,
    filename: "2.jpeg",
    name: "BMW 330i",
    slug: "bmw-330i",
    year: 2022,
    price: "¥5,500,000",
    mileage: "19,000 km",
    fuel: "Gasoline",
    transmission: "Automatic",
    status: "sold",
    location: "Tokyo",
    rating: 4.8,
    views: 3124,
    featured: true,
    category: "luxury",
    images: [
      "2.jpeg",
      "2fb6b4fc-c8a3-48a7-958d-16f355e92f04.jpg",
      "3bb1a247-0d8f-4679-8617-6c47cd27d69c.jpg",
      "445abda8-2982-4292-ab86-0d0c7035ab59.jpg"
    ]
  },
  {
    id: 10,
    filename: "2fb6b4fc-c8a3-48a7-958d-16f355e92f04.jpg",
    name: "Audi A4",
    slug: "audi-a4",
    year: 2023,
    price: "¥5,800,000",
    mileage: "14,000 km",
    fuel: "Gasoline",
    transmission: "Automatic",
    status: "available",
    location: "Osaka",
    rating: 4.7,
    views: 1987,
    featured: false,
    category: "luxury",
    images: [
      "2fb6b4fc-c8a3-48a7-958d-16f355e92f04.jpg",
      "3bb1a247-0d8f-4679-8617-6c47cd27d69c.jpg",
      "445abda8-2982-4292-ab86-0d0c7035ab59.jpg",
      "5886d67d-6c33-4d1c-8b08-72cc3692e816.jpg"
    ]
  },
  {
    id: 11,
    filename: "3bb1a247-0d8f-4679-8617-6c47cd27d69c.jpg",
    name: "Volkswagen Golf GTI",
    slug: "volkswagen-golf-gti",
    year: 2022,
    price: "¥4,100,000",
    mileage: "17,000 km",
    fuel: "Gasoline",
    transmission: "Manual",
    status: "available",
    location: "Yokohama",
    rating: 4.6,
    views: 1654,
    featured: false,
    category: "sports",
    images: [
      "3bb1a247-0d8f-4679-8617-6c47cd27d69c.jpg",
      "445abda8-2982-4292-ab86-0d0c7035ab59.jpg",
      "5886d67d-6c33-4d1c-8b08-72cc3692e816.jpg",
      "7ef881f8-678f-42f0-9e1c-5b008f25163b.jpg"
    ]
  },
  {
    id: 12,
    filename: "445abda8-2982-4292-ab86-0d0c7035ab59.jpg",
    name: "Mercedes-Benz C-Class",
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
    images: [
      "445abda8-2982-4292-ab86-0d0c7035ab59.jpg",
      "5886d67d-6c33-4d1c-8b08-72cc3692e816.jpg",
      "7ef881f8-678f-42f0-9e1c-5b008f25163b.jpg",
      "8d632a9d-3902-4873-adaf-24e7e9052176.jpg"
    ]
  }
]

// Categories for filtering
const categories = [
  { id: "all", label: "All Vehicles" },
  { id: "sedan", label: "Sedans" },
  { id: "suv", label: "SUVs" },
  { id: "sports", label: "Sports" },
  { id: "luxury", label: "Luxury" },
  { id: "hybrid", label: "Hybrid" },
  { id: "electric", label: "Electric" }
]

// Theme-based vehicle collections
const vehicleThemes = [
  {
    id: "luxury",
    title: "Luxury Collection",
    subtitle: "Premium vehicles for the discerning driver",
    gradient: "from-purple-600 to-pink-600",
    vehicles: [7, 9, 10, 12] // Lexus, BMW, Audi, Mercedes
  },
  {
    id: "sports",
    title: "Sports Performance",
    subtitle: "High-performance vehicles for thrill seekers",
    gradient: "from-red-600 to-orange-600",
    vehicles: [2, 5, 11] // Honda Civic Type R, Subaru WRX STI, VW Golf GTI
  },
  {
    id: "eco-friendly",
    title: "Eco-Friendly",
    subtitle: "Sustainable transportation solutions",
    gradient: "from-green-600 to-teal-600",
    vehicles: [1, 3, 6, 8] // Toyota Camry Hybrid, Nissan Leaf, Toyota Prius, Mitsubishi PHEV
  },
  {
    id: "family",
    title: "Family Vehicles",
    subtitle: "Reliable and spacious family cars",
    gradient: "from-blue-600 to-indigo-600",
    vehicles: [4, 7, 8] // Mazda CX-5, Lexus RX 450h, Mitsubishi Outlander
  }
]

// Contact form interface
interface ContactForm {
  name: string
  email: string
  phone: string
  message: string
  vehicleName?: string
}

// Separate component that uses useSearchParams
function GalleryContent() {
  const { t } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Check for vehicle slug in URL
  const vehicleSlug = searchParams.get('vehicle')
  
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list" | "themes">("grid")
  const [selectedVehicle, setSelectedVehicle] = useState<typeof vehicleData[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])
  
  // New state for contact and share popups
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  
  // Image gallery state
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Share URL state
  const [vehicleShareUrl, setVehicleShareUrl] = useState("")
  
  // Theme view state
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)

  // Filter vehicles based on search and category
  const filteredVehicles = useMemo(() => {
    return vehicleData.filter(vehicle => {
      const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           vehicle.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || vehicle.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  // Statistics
  const stats = useMemo(() => {
    const total = vehicleData.length
    const available = vehicleData.filter(v => v.status === "available").length
    const sold = vehicleData.filter(v => v.status === "sold").length
    const featured = vehicleData.filter(v => v.featured).length
    const totalViews = vehicleData.reduce((sum, v) => sum + v.views, 0)
    const avgRating = vehicleData.reduce((sum, v) => sum + v.rating, 0) / total

    return { total, available, sold, featured, totalViews, avgRating: avgRating.toFixed(1) }
  }, [])

  const toggleFavorite = (vehicleId: number) => {
    setFavorites(prev => 
      prev.includes(vehicleId) 
        ? prev.filter(id => id !== vehicleId)
        : [...prev, vehicleId]
    )
  }

  const openModal = (vehicle: typeof vehicleData[0]) => {
    setSelectedVehicle(vehicle)
    setCurrentImageIndex(0)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedVehicle(null)
  }

  const openContactModal = (vehicle?: typeof vehicleData[0]) => {
    setContactForm({
      name: "",
      email: "",
      phone: "",
      message: "",
      vehicleName: vehicle?.name
    })
    setIsContactModalOpen(true)
  }

  const closeContactModal = () => {
    setIsContactModalOpen(false)
    setContactForm({
      name: "",
      email: "",
      phone: "",
      message: ""
    })
  }

  const openShareModal = () => {
    setIsShareModalOpen(true)
  }

  const closeShareModal = () => {
    setIsShareModalOpen(false)
    setIsCopied(false)
    setVehicleShareUrl("")
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Here you would typically send the form data to your backend
    console.log("Contact form submitted:", contactForm)
    
    setIsSubmitting(false)
    closeContactModal()
    
    // Show success message (you can add a toast notification here)
    alert(t("gallery.contact.success"))
  }

  const copyGalleryLink = async () => {
    try {
      const urlToCopy = vehicleShareUrl || window.location.href
      await navigator.clipboard.writeText(urlToCopy)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy link:", err)
    }
  }

  const shareVehicle = (vehicle: typeof vehicleData[0]) => {
    // Generate vehicle-specific URL
    const vehicleUrl = `${window.location.origin}/gallery?vehicle=${vehicle.slug}`
    setVehicleShareUrl(vehicleUrl)
    openShareModal()
  }

  const nextImage = () => {
    if (selectedVehicle) {
      setCurrentImageIndex((prev) => 
        prev === selectedVehicle.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (selectedVehicle) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedVehicle.images.length - 1 : prev - 1
      )
    }
  }

  const selectImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  // Handle URL-based vehicle opening
  useEffect(() => {
    if (vehicleSlug && !isModalOpen) {
      const vehicle = vehicleData.find(v => v.slug === vehicleSlug)
      if (vehicle) {
        openModal(vehicle)
        // Update URL without the vehicle parameter to avoid conflicts
        const newUrl = new URL(window.location.href)
        newUrl.searchParams.delete('vehicle')
        router.replace(newUrl.pathname + newUrl.search)
      }
    }
  }, [vehicleSlug, isModalOpen])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen || !selectedVehicle) return
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          prevImage()
          break
        case 'ArrowRight':
          e.preventDefault()
          nextImage()
          break
        case 'Escape':
          e.preventDefault()
          closeModal()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, selectedVehicle])

  return (
    <div className="min-h-screen w-full bg-[#FCFBF9]">
      {/* Hero Section - Luxury */}
      <section className="pt-32 pb-16 bg-[#070708] text-white w-full relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage: `linear-gradient(#C5A880 1px, transparent 1px), linear-gradient(90deg, #C5A880 1px, transparent 1px)`, backgroundSize: '80px 80px'}}></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-[#C5A880]/10 blur-[120px] rounded-full"></div>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 w-full relative z-10">
          <GSAPWrapper animation="slideUp">
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#C5A880] mb-4 flex items-center justify-center gap-3"><span className="w-8 h-px bg-[#C5A880]"></span> Private Collection <span className="w-8 h-px bg-[#C5A880]"></span></p>
            <h1 className="text-4xl sm:text-6xl font-light text-center mb-4 tracking-[-0.02em]" style={{fontFamily: 'Cormorant Garamond, serif'}}>
              Curated <span className="italic text-[#C5A880]">Collection</span>
            </h1>
            <p className="text-[15px] leading-7 text-center text-white/60 max-w-3xl mx-auto font-light">
              {t("gallery.subtitle")}
            </p>
          </GSAPWrapper>
        </div>
      </section>

      {/* Statistics Section - Luxury */}
      <section className="py-8 bg-white border-y border-[#E8D9B8]/30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <GSAPWrapper animation="scale" delay={0.1}>
              <div className="text-center p-6 bg-[#FCFBF9] border border-[#E8E6E1] hover:border-[#C5A880]/30 transition-colors">
                <div className="text-3xl font-light text-[#0A0A0B]" style={{fontFamily: 'Cormorant Garamond, serif'}}>{stats.total}</div>
                <div className="text-[11px] tracking-[0.12em] uppercase text-[#9C835D] mt-1">{t("gallery.stats.total")}</div>
              </div>
            </GSAPWrapper>
            <GSAPWrapper animation="scale" delay={0.2}>
              <div className="text-center p-6 bg-[#070708] border border-[#C5A880]/20">
                <div className="text-3xl font-light text-[#C5A880]" style={{fontFamily: 'Cormorant Garamond, serif'}}>{stats.available}</div>
                <div className="text-[11px] tracking-[0.12em] uppercase text-white/60 mt-1">{t("gallery.stats.available")}</div>
              </div>
            </GSAPWrapper>
            <GSAPWrapper animation="scale" delay={0.3}>
              <div className="text-center p-6 bg-[#FCFBF9] border border-[#E8E6E1] hover:border-[#C5A880]/30 transition-colors">
                <div className="text-3xl font-light text-[#0A0A0B]" style={{fontFamily: 'Cormorant Garamond, serif'}}>{stats.featured}</div>
                <div className="text-[11px] tracking-[0.12em] uppercase text-[#9C835D] mt-1">{t("gallery.stats.featured")}</div>
              </div>
            </GSAPWrapper>
            <GSAPWrapper animation="scale" delay={0.4}>
              <div className="text-center p-6 bg-[#FCFBF9] border border-[#E8E6E1] hover:border-[#C5A880]/30 transition-colors">
                <div className="text-3xl font-light text-[#C5A880]" style={{fontFamily: 'Cormorant Garamond, serif'}}>{stats.avgRating}</div>
                <div className="text-[11px] tracking-[0.12em] uppercase text-[#9C835D] mt-1">{t("gallery.stats.rating")}</div>
              </div>
            </GSAPWrapper>
          </div>
        </div>
      </section>

      {/* Filters and Search - Luxury */}
      <section className="py-6 bg-white border-b border-[#E8D9B8]/30 sticky top-0 z-20 backdrop-blur-xl bg-white/90">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={t("gallery.search.placeholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filters - Dropdown for mobile, buttons for desktop */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
              {/* Mobile Dropdown */}
              <select
                className="block sm:hidden border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.label}</option>
                ))}
              </select>
              {/* Desktop Button Group */}
              <div className="hidden sm:flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="whitespace-nowrap"
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "themes" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("themes")}
              >
                <Car className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicles Grid/List */}
      <section className="py-10 sm:py-20 w-full">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 w-full">
          {filteredVehicles.length > 0 ? (
            <div className={
              viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full"
                : "space-y-4 w-full"
            }>
              {filteredVehicles.map((vehicle, index) => (
                <GSAPWrapper key={vehicle.id} animation="slideUp" delay={index * 0.1}>
                  <Card className={`group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                    viewMode === "list" ? "flex flex-row" : ""
                  }`}>
                    <div className={`relative overflow-hidden ${
                      viewMode === "list" ? "w-48 h-32" : "h-48"
                    }`}>
                      <img
                        src={`/images/vehicles/${vehicle.filename}`}
                        alt={vehicle.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        onClick={() => openModal(vehicle)}
                      />
                      <div className="absolute top-2 left-2 flex gap-1">
                        {vehicle.featured && (
                          <Badge variant="secondary" className="bg-yellow-500 text-white">
                            {t("gallery.vehicle.featured")}
                          </Badge>
                        )}
                        <Badge variant={vehicle.status === "available" ? "default" : "destructive"}>
                          {vehicle.status === "available" ? t("gallery.vehicle.available") : t("gallery.vehicle.sold")}
                        </Badge>
                      </div>
                      <div className="absolute top-2 right-2 flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFavorite(vehicle.id)
                          }}
                        >
                          <Heart className={`h-4 w-4 ${favorites.includes(vehicle.id) ? 'fill-red-500 text-red-500' : ''}`} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                          onClick={(e) => {
                            e.stopPropagation()
                            shareVehicle(vehicle)
                          }}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <CardContent className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                            {vehicle.name}
                          </h3>
                          <div className="text-right">
                            <div className="font-bold text-lg text-primary">{vehicle.price}</div>
                            <div className="text-sm text-gray-500">{vehicle.year}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {vehicle.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {vehicle.views}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {vehicle.rating}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="outline" className="text-xs">{vehicle.fuel}</Badge>
                          <Badge variant="outline" className="text-xs">{vehicle.transmission}</Badge>
                          <Badge variant="outline" className="text-xs">{vehicle.mileage}</Badge>
                        </div>
                        
                        <Button 
                          className="w-full mt-2" 
                          size="sm"
                          onClick={() => openModal(vehicle)}
                        >
                          {t("gallery.vehicle.view.details")}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </GSAPWrapper>
              ))}
            </div>
          ) : (
            <GSAPWrapper animation="fadeIn">
              <div className="text-center py-12 w-full">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <p className="text-gray-600 text-lg">{t("gallery.no.results")}</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("all")
                  }}
                >
                  {t("gallery.clear.filters")}
                </Button>
              </div>
            </GSAPWrapper>
          )}
        </div>
      </section>

            {/* Theme View Section - Pure Image Gallery */}
      {viewMode === "themes" && (
        <section className="py-10 sm:py-20 w-full">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 w-full">
            <GSAPWrapper animation="slideUp">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t("gallery.themes.title")}</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {t("gallery.themes.subtitle")}
                </p>
              </div>
            </GSAPWrapper>
            
            {/* Pure Image Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {vehicleData.map((vehicle, index) => (
                <GSAPWrapper key={vehicle.id} animation="scale" delay={index * 0.1}>
                  <div className="group cursor-pointer relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <img
                      src={`/images/vehicles/${vehicle.images[0]}`}
                      alt={vehicle.name}
                      className="w-full h-48 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                      onClick={() => openModal(vehicle)}
                    />
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end">
                      <div className="w-full p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-white font-semibold text-sm mb-1 truncate">{vehicle.name}</h3>
                        <p className="text-white/80 text-xs mb-2">{vehicle.year} • {vehicle.price}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-white text-xs">{vehicle.rating}</span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {vehicle.status === "available" ? t("gallery.vehicle.available") : t("gallery.vehicle.sold")}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    {/* Favorite button */}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(vehicle.id)
                      }}
                    >
                      <Heart className={`h-4 w-4 ${favorites.includes(vehicle.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    
                    {/* Featured badge */}
                    {vehicle.featured && (
                      <div className="absolute top-2 left-2">
                        <Badge variant="secondary" className="bg-yellow-500 text-white text-xs">
                          {t("gallery.vehicle.featured")}
                        </Badge>
                      </div>
                    )}
                  </div>
                </GSAPWrapper>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      {isModalOpen && selectedVehicle && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white"
                onClick={closeModal}
              >
                ✕
              </Button>
              
              {/* Main Image with Navigation */}
              <div className="relative">
                <img
                  src={`/images/vehicles/${selectedVehicle.images[currentImageIndex]}`}
                  alt={`${selectedVehicle.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-64 sm:h-96 object-cover rounded-t-lg"
                />
                
                {/* Navigation Arrows */}
                {selectedVehicle.images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-10 h-10 p-0"
                      onClick={prevImage}
                      title={t("gallery.images.previous")}
                    >
                      ‹
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-10 h-10 p-0"
                      onClick={nextImage}
                      title={t("gallery.images.next")}
                    >
                      ›
                    </Button>
                  </>
                )}
                
                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                  {t("gallery.images.counter").replace("{current}", String(currentImageIndex + 1)).replace("{total}", String(selectedVehicle.images.length))}
                </div>
              </div>
              
              {/* Thumbnail Gallery */}
              {selectedVehicle.images.length > 1 && (
                <div className="p-4 border-b">
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {selectedVehicle.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => selectImage(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-all ${
                          index === currentImageIndex 
                            ? 'border-primary scale-110' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={`/images/vehicles/${image}`}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedVehicle.name}</h2>
                  <p className="text-gray-600">{selectedVehicle.year} • {selectedVehicle.location}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">{selectedVehicle.price}</div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {selectedVehicle.rating} ({selectedVehicle.views} views)
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="font-semibold">{selectedVehicle.fuel}</div>
                  <div className="text-sm text-gray-600">{t("gallery.modal.fuel.type")}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="font-semibold">{selectedVehicle.transmission}</div>
                  <div className="text-sm text-gray-600">{t("gallery.modal.transmission")}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="font-semibold">{selectedVehicle.mileage}</div>
                  <div className="text-sm text-gray-600">{t("gallery.modal.mileage")}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="font-semibold">{selectedVehicle.status}</div>
                  <div className="text-sm text-gray-600">{t("gallery.modal.status")}</div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button className="flex-1" onClick={() => openContactModal(selectedVehicle)}>
                  {t("gallery.vehicle.contact.dealer")}
                </Button>
                <Button variant="outline" onClick={() => shareVehicle(selectedVehicle)}>
                  <Share2 className="h-4 w-4 mr-2" />
                  {t("gallery.vehicle.share")}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => toggleFavorite(selectedVehicle.id)}
                >
                  <Heart className={`h-4 w-4 mr-2 ${favorites.includes(selectedVehicle.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  {favorites.includes(selectedVehicle.id) ? t("gallery.vehicle.saved") : t("gallery.vehicle.save")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Dealer Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold">{t("gallery.contact.title")}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeContactModal}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <form onSubmit={handleContactSubmit} className="p-6 space-y-4">
                             {contactForm.vehicleName && (
                 <div className="p-3 bg-blue-50 rounded-lg">
                   <p className="text-sm text-blue-800">
                     <strong>{t("gallery.contact.vehicle")}:</strong> {contactForm.vehicleName}
                   </p>
                 </div>
               )}
               <div>
                 <Label htmlFor="name">{t("gallery.contact.name")} *</Label>
                <Input
                  id="name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
                             <div>
                 <Label htmlFor="email">{t("gallery.contact.email")} *</Label>
                <Input
                  id="email"
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
                             <div>
                 <Label htmlFor="phone">{t("gallery.contact.phone")} *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                  required
                />
              </div>
                             <div>
                 <Label htmlFor="message">{t("gallery.contact.message")} *</Label>
                <Textarea
                  id="message"
                  value={contactForm.message}
                  onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  required
                />
              </div>
                             <div className="flex gap-2 pt-4">
                 <Button type="submit" className="flex-1" disabled={isSubmitting}>
                   {isSubmitting ? t("gallery.contact.sending") : t("gallery.contact.send")}
                 </Button>
                 <Button type="button" variant="outline" onClick={closeContactModal}>
                   {t("gallery.contact.cancel")}
                 </Button>
               </div>
            </form>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold">
                {vehicleShareUrl && selectedVehicle 
                  ? t("gallery.share.vehicle.title").replace("{vehicle}", selectedVehicle.name)
                  : t("gallery.share.title")
                }
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeShareModal}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-6 space-y-4">
                             <p className="text-gray-600">
                 {vehicleShareUrl && selectedVehicle 
                   ? t("gallery.share.vehicle.description")
                   : t("gallery.share.description")
                 }
               </p>
                             <div className="flex gap-2">
                 <Input
                   value={vehicleShareUrl || window.location.href}
                   readOnly
                   className="flex-1"
                 />
                <Button
                  variant="outline"
                  onClick={copyGalleryLink}
                  className="whitespace-nowrap"
                >
                                     {isCopied ? (
                     <>
                       <Check className="h-4 w-4 mr-2" />
                       {t("gallery.share.copied")}
                     </>
                   ) : (
                     <>
                       <Copy className="h-4 w-4 mr-2" />
                       {t("gallery.share.copy")}
                     </>
                   )}
                </Button>
              </div>
              <div className="flex gap-2 pt-4">
                <Button 
                  className="flex-1"
                  onClick={() => {
                                         if (navigator.share) {
                       navigator.share({
                         title: t("gallery.share.gallery.title"),
                         text: t("gallery.share.gallery.text"),
                         url: vehicleShareUrl || window.location.href
                       })
                     }
                  }}
                                 >
                   <Share2 className="h-4 w-4 mr-2" />
                   {t("gallery.share.share")}
                 </Button>
                 <Button variant="outline" onClick={closeShareModal}>
                   {t("gallery.share.close")}
                 </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Gallery() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GalleryContent />
    </Suspense>
  )
}
