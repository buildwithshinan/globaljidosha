"use client"

import type React from "react"

import { useState } from "react"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"
import dynamic from "next/dynamic"
const GSAPWrapper = dynamic(() => import("../components/GSAPWrapper"), { ssr: false })
import GallerySection from "../components/GallerySection"

export default function Contact() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    alert("Thank you for your message! We will get back to you soon.")
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section - Luxury */}
      <section className="pt-32 pb-16 bg-[#070708] text-white w-full relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage: `linear-gradient(#C5A880 1px, transparent 1px), linear-gradient(90deg, #C5A880 1px, transparent 1px)`, backgroundSize: '80px 80px'}}></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-[#C5A880]/10 blur-[120px] rounded-full"></div>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 w-full relative z-10">
          <GSAPWrapper animation="slideUp">
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#C5A880] mb-4 flex items-center justify-center gap-3"><span className="w-8 h-px bg-[#C5A880]"></span> Private Consultation <span className="w-8 h-px bg-[#C5A880]"></span></p>
            <h1 className="text-3xl sm:text-6xl font-light text-center mb-4 tracking-[-0.02em]" style={{fontFamily: 'Cormorant Garamond, serif'}}>{t("contact.title")}</h1>
            <p className="text-center text-white/60 max-w-2xl mx-auto font-light">Discreet. Responsive. By appointment in Tokyo, Yokohama & Nagoya.</p>
          </GSAPWrapper>
        </div>
      </section>
      {/* Contact Content */}
      <section className="py-8 sm:py-16 bg-white w-full">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-12 w-full">
            {/* Contact Form */}
            <GSAPWrapper animation="slideLeft">
              <div className="card max-w-sm mx-auto w-full">
                <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 w-full">
                  <div>
                    <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-900 mb-1 sm:mb-2">
                      {t("contact.form.name")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-900 mb-1 sm:mb-2">
                      {t("contact.form.email")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-900 mb-1 sm:mb-2">
                      {t("contact.form.phone")}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-900 mb-1 sm:mb-2">
                      {t("contact.form.message")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none text-sm sm:text-base"
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full text-sm sm:text-base">
                    {t("contact.form.submit")}
                  </button>
                </form>
              </div>
            </GSAPWrapper>
            {/* Contact Info */}
            <GSAPWrapper animation="slideRight">
              <div className="space-y-6 sm:space-y-8 w-full">
                {/* Contact Details */}
                <div className="card max-w-sm mx-auto w-full">
                  <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Contact Information</h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <span className="text-gray-800 text-sm sm:text-base">+81 80-2281-5656</span>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <span className="text-gray-800 text-sm sm:text-base">info@globaljidosha.com</span>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span className="text-gray-800 text-sm sm:text-base">https://www.globaljidosha.com/ </span>
                    </div>
                  </div>
                </div>
                {/* Working Hours */}
                <div className="card max-w-sm mx-auto w-full">
                  <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">{t("contact.hours")}</h3>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <span className="text-gray-600 text-sm sm:text-base">{t("contact.hours.weekdays")}</span>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <span className="text-gray-600 text-sm sm:text-base">{t("contact.hours.weekend")}</span>
                    </div>
                  </div>
                </div>
                {/* Call Back Request */}
                <div className="card bg-gradient-to-r from-primary to-secondary text-white max-w-sm mx-auto w-full">
                  <h3 className="text-base sm:text-xl font-bold mb-2 sm:mb-4">{t("contact.callback")}</h3>
                  <p className="mb-4 sm:mb-6 text-gray-200 text-sm sm:text-base">
                    Need immediate assistance? Request a call back and we'll contact you within 24 hours.
                  </p>
                  <button className="bg-white text-primary px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 w-full text-sm sm:text-base" aria-label="Request a Call Back">
                    {t("contact.callback")}
                  </button>
                </div>
              </div>
            </GSAPWrapper>
          </div>
        </div>
      </section>
      {/* Map Section */}
      <section className="py-8 sm:py-16 bg-gray-50 w-full">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 w-full">
          <GSAPWrapper animation="slideUp">
            <div className="card w-full">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">Find Us</h2>
              <MapPin className="h-8 w-8 sm:h-12 sm:w-12 text-primary mx-auto mb-2 sm:mb-4" />
              <div className="w-full h-60 sm:h-96 bg-gray-200 rounded-xl flex items-center justify-center">
                <div className="w-full">
                  
                  <div className="w-full mb-2">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.980245768925!2d140.32991707445075!3d35.65285833153424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x602293e46ab83427%3A0xf7f028b3008a15e1!2zR2xvYmFsIGppZG9zaGEgbGxjICwg5ZCI5ZCM5Lya56S-44Kw44Ot44O844OQ44Or6Ieq5YuV6LuK!5e0!3m2!1sen!2slk!4v1789626960621!5m2!1sen!2slk"
                      width="100%"
                      height="100%"
                      className="w-full h-60 sm:h-96 rounded-xl"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-base">
                    https://www.globaljidosha.com/ 
                  </p>
                </div>
              </div>
            </div>
          </GSAPWrapper>
        </div>
      </section>
    </div>
  )
}
