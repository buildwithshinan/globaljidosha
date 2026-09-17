"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, Eye, Heart, Share2 } from "lucide-react"
import Modal from "./Modal"
import GSAPWrapper from "./GSAPWrapper"

interface GalleryItem {
  id: string
  title: string
  description: string
  image: string
  category: string
  featured?: boolean
}

interface GallerySectionProps {
  title: string
  items: GalleryItem[]
  categories?: string[]
}

export default function GallerySection({ title, items, categories = [] }: GallerySectionProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [activeCategory, setActiveCategory] = useState("all")
  const [favorites, setFavorites] = useState<string[]>([])

  const filteredItems = items.filter((item) => activeCategory === "all" || item.category === activeCategory)

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  return (
    <section className="py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GSAPWrapper animation="slideUp">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">{title}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          </div>
        </GSAPWrapper>

        {/* Category Filters */}
        {categories.length > 0 && (
          <GSAPWrapper animation="slideUp" delay={0.2}>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-1 rounded-full border text-sm font-medium transition-all duration-300 ${activeCategory === 'all' ? 'bg-primary text-white border-primary' : 'bg-white text-primary border-primary'}`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-1 rounded-full border text-sm font-medium transition-all duration-300 capitalize ${activeCategory === category ? 'bg-primary text-white border-primary' : 'bg-white text-primary border-primary'}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </GSAPWrapper>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {filteredItems.map((item, index) => (
            <GSAPWrapper key={item.id} animation="slideUp" delay={index * 0.1}>
              <div className="bg-white rounded-xl shadow-md w-full max-w-sm mx-auto overflow-hidden">
                <div className="relative w-full aspect-[16/10] sm:aspect-[4/3]">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="w-full h-auto object-cover"
                  />
                  {/* Featured Badge */}
                  {item.featured && (
                    <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse-slow">
                      Featured
                    </div>
                  )}
                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      aria-label={favorites.includes(item.id) ? 'Remove from favorites' : 'Add to favorites'}
                      className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${favorites.includes(item.id) ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}
                    >
                      <Heart className={`h-4 w-4 ${favorites.includes(item.id) ? 'fill-current' : ''}`} />
                    </button>
                    <button aria-label="Share" className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-md transition-all duration-300">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                  {/* Overlay */}
                  <div className="gallery-overlay group-hover:opacity-100">
                    <div className="w-full">
                      <h3 className="text-white text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-white/80 text-sm mb-4 line-clamp-2">{item.description}</p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300"
                          aria-label="View Details"
                        >
                          <Eye className="h-4 w-4" />
                          View Details
                        </button>
                        <button
                          className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-xl font-semibold hover:bg-accent/90 transition-all duration-300"
                          aria-label="Preview"
                        >
                          <Play className="h-4 w-4" />
                          Preview
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GSAPWrapper>
          ))}
        </div>

        {/* Load More Button */}
        <GSAPWrapper animation="slideUp" delay={0.5}>
          <div className="text-center mt-12">
            <button className="btn-ghost" aria-label="Load More Items">Load More Items</button>
          </div>
        </GSAPWrapper>
      </div>

      {/* Modal */}
      <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} title={selectedItem?.title}>
        {selectedItem && (
          <div className="space-y-6">
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <Image
                src={selectedItem.image || "/placeholder.svg"}
                alt={selectedItem.title}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold capitalize">
                  {selectedItem.category}
                </span>
                {selectedItem.featured && (
                  <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">{selectedItem.description}</p>
              <div className="flex gap-4">
                <button className="btn-primary flex-1" aria-label="Contact Us">Contact Us</button>
                <button className="btn-ghost" aria-label="Share">Share</button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}
