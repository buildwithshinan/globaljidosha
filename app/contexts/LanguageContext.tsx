"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "ja"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.gallery": "Gallery",
    "nav.contact": "Contact",

    // Home Page
    "home.hero.title": "Buy & Sell Cars in Japan",
    "home.hero.subtitle": "Premium vehicles, expert service, trusted dealership",
    "home.hero.cta": "Explore Inventory",
    "home.featured.title": "Featured Cars",
    "home.benefits.title": "Why Choose Global Jidosha LLC",
    "home.benefits.quality": "Quality Vehicles",
    "home.benefits.quality.desc": "Hand-picked premium cars with detailed inspections",
    "home.benefits.expert": "Expert Service",
    "home.benefits.expert.desc": "Professional guidance throughout your car journey",
    "home.benefits.trust": "Trusted Dealership",
    "home.benefits.trust.desc": "Years of experience in the Japanese car market",
    "home.testimonials.title": "What Our Customers Say",

    // About Page
    "about.title": "About Global Jidosha LLC",
    "about.history.title": "Our History",
    "about.history.desc":
      "Founded in 2010, Global Jidosha LLC has been a trusted name in the Japanese automotive industry for over a decade.",
    "about.mission.title": "Our Mission",
    "about.mission.desc":
      "To provide exceptional car buying and selling experiences with transparency, quality, and customer satisfaction at the forefront.",
    "about.vision.title": "Our Vision",
    "about.vision.desc":
      "To be Japan's leading car dealership, known for integrity, innovation, and outstanding customer service.",

    // Services Page
    "services.title": "Our Services",
    "services.buy.title": "Buy Cars in Japan",
    "services.buy.desc": "Find your perfect vehicle from our curated selection of premium cars",
    "services.sell.title": "Sell Cars in Japan",
    "services.sell.desc": "Get the best value for your vehicle with our expert evaluation service",
    "services.get.started": "Get Started",

    // Gallery Page
    "gallery.title": "Car Gallery",
    "gallery.subtitle": "Discover our premium collection of vehicles with detailed specifications and high-quality images",
    "gallery.filter.all": "All",
    "gallery.filter.sold": "Sold",
    "gallery.filter.new": "New Arrivals",
    "gallery.search.placeholder": "Search vehicles...",
    "gallery.view.grid": "Grid View",
    "gallery.view.list": "List View",
    "gallery.stats.total": "Total Vehicles",
    "gallery.stats.available": "Available",
    "gallery.stats.featured": "Featured",
    "gallery.stats.rating": "Avg Rating",
    "gallery.no.results": "No vehicles found matching your criteria.",
    "gallery.clear.filters": "Clear Filters",
    "gallery.vehicle.available": "Available",
    "gallery.vehicle.sold": "Sold",
    "gallery.vehicle.featured": "Featured",
    "gallery.vehicle.view.details": "View Details",
    "gallery.vehicle.contact.dealer": "Contact Dealer",
    "gallery.vehicle.share": "Share",
    "gallery.vehicle.save": "Save",
    "gallery.vehicle.saved": "Saved",
    "gallery.modal.fuel.type": "Fuel Type",
    "gallery.modal.transmission": "Transmission",
    "gallery.modal.mileage": "Mileage",
    "gallery.modal.status": "Status",
    "gallery.contact.title": "Contact Dealer",
    "gallery.contact.name": "Name",
    "gallery.contact.email": "Email",
    "gallery.contact.phone": "Phone Number",
    "gallery.contact.message": "Message",
    "gallery.contact.vehicle": "Vehicle",
    "gallery.contact.send": "Send Message",
    "gallery.contact.sending": "Sending...",
    "gallery.contact.cancel": "Cancel",
    "gallery.contact.success": "Thank you for your inquiry! We'll get back to you soon.",
    "gallery.share.title": "Share Gallery",
    "gallery.share.description": "Share our vehicle gallery with friends and family:",
    "gallery.share.copy": "Copy",
    "gallery.share.copied": "Copied!",
    "gallery.share.share": "Share",
    "gallery.share.close": "Close",
    "gallery.share.gallery.title": "J & SONS AUTO Vehicle Gallery",
    "gallery.share.gallery.text": "Check out our premium vehicle collection!",
    "gallery.images.view": "View Images",
    "gallery.images.previous": "Previous",
    "gallery.images.next": "Next",
    "gallery.images.counter": "Image {current} of {total}",
    "gallery.share.vehicle.title": "Share {vehicle}",
    "gallery.share.vehicle.description": "Share this specific vehicle with friends and family:",
    "gallery.themes.title": "Vehicle Collections",
    "gallery.themes.subtitle": "Explore our curated vehicle collections, each designed around a specific lifestyle and preference",
    "gallery.themes.view.collection": "View Collection",
    "gallery.themes.hide.collection": "Hide Collection",
    "gallery.themes.luxury.title": "Luxury Collection",
    "gallery.themes.luxury.subtitle": "Premium vehicles for the discerning driver",
    "gallery.themes.sports.title": "Sports Performance",
    "gallery.themes.sports.subtitle": "High-performance vehicles for thrill seekers",
    "gallery.themes.eco.title": "Eco-Friendly",
    "gallery.themes.eco.subtitle": "Sustainable transportation solutions",
    "gallery.themes.family.title": "Family Vehicles",
    "gallery.themes.family.subtitle": "Reliable and spacious family cars",

    // Contact Page
    "contact.title": "Contact Us",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.phone": "Phone",
    "contact.form.message": "Message",
    "contact.form.submit": "Send Message",
    "contact.callback": "Request a Call Back",
    "contact.hours": "Working Hours",
    "contact.hours.weekdays": "Mon - Fri: 9:00 AM - 6:00 PM",
    "contact.hours.weekend": "Sat - Sun: 10:00 AM - 4:00 PM",

    // Footer
    "footer.about": "About Global Jidosha LLC",
    "footer.about.desc": "Your trusted partner for buying and selling premium cars in Japan.",
    "footer.quick.links": "Quick Links",
    "footer.contact.info": "Contact Info",
    "footer.rights": "All rights reserved.",
  },
  ja: {
    // Navigation
    "nav.home": "ホーム",
    "nav.about": "会社概要",
    "nav.services": "サービス",
    "nav.gallery": "ギャラリー",
    "nav.contact": "お問い合わせ",

    // Home Page
    "home.hero.title": "日本で車を売買",
    "home.hero.subtitle": "プレミアム車両、専門サービス、信頼できるディーラー",
    "home.hero.cta": "在庫を見る",
    "home.featured.title": "注目の車両",
    "home.benefits.title": "Global Jidosha LLCを選ぶ理由",
    "home.benefits.quality": "高品質車両",
    "home.benefits.quality.desc": "詳細な検査を行った厳選されたプレミアム車両",
    "home.benefits.expert": "専門サービス",
    "home.benefits.expert.desc": "お客様の車選びを専門的にサポート",
    "home.benefits.trust": "信頼できるディーラー",
    "home.benefits.trust.desc": "日本の自動車市場での豊富な経験",
    "home.testimonials.title": "お客様の声",

    // About Page
    "about.title": "Global Jidosha LLCについて",
    "about.history.title": "私たちの歴史",
    "about.history.desc": "2010年に設立されたGlobal Jidosha LLCは、10年以上にわたって日本の自動車業界で信頼される名前です。",
    "about.mission.title": "私たちの使命",
    "about.mission.desc": "透明性、品質、お客様満足を最優先に、優れた車の売買体験を提供すること。",
    "about.vision.title": "私たちのビジョン",
    "about.vision.desc": "誠実さ、革新性、優れた顧客サービスで知られる日本有数の自動車ディーラーになること。",

    // Services Page
    "services.title": "私たちのサービス",
    "services.buy.title": "日本で車を購入",
    "services.buy.desc": "厳選されたプレミアム車両から理想の車を見つけてください",
    "services.sell.title": "日本で車を売却",
    "services.sell.desc": "専門的な査定サービスで車の最高価値を実現",
    "services.get.started": "始める",

    // Gallery Page
    "gallery.title": "車両ギャラリー",
    "gallery.subtitle": "詳細な仕様と高品質な画像でプレミアム車両コレクションをご覧ください",
    "gallery.filter.all": "すべて",
    "gallery.filter.sold": "売却済み",
    "gallery.filter.new": "新着",
    "gallery.search.placeholder": "車両を検索...",
    "gallery.view.grid": "グリッド表示",
    "gallery.view.list": "リスト表示",
    "gallery.stats.total": "総車両数",
    "gallery.stats.available": "在庫あり",
    "gallery.stats.featured": "注目車両",
    "gallery.stats.rating": "平均評価",
    "gallery.no.results": "条件に一致する車両が見つかりません。",
    "gallery.clear.filters": "フィルターをクリア",
    "gallery.vehicle.available": "在庫あり",
    "gallery.vehicle.sold": "売却済み",
    "gallery.vehicle.featured": "注目",
    "gallery.vehicle.view.details": "詳細を見る",
    "gallery.vehicle.contact.dealer": "ディーラーに連絡",
    "gallery.vehicle.share": "共有",
    "gallery.vehicle.save": "保存",
    "gallery.vehicle.saved": "保存済み",
    "gallery.modal.fuel.type": "燃料タイプ",
    "gallery.modal.transmission": "トランスミッション",
    "gallery.modal.mileage": "走行距離",
    "gallery.modal.status": "ステータス",
    "gallery.contact.title": "ディーラーに連絡",
    "gallery.contact.name": "お名前",
    "gallery.contact.email": "メールアドレス",
    "gallery.contact.phone": "電話番号",
    "gallery.contact.message": "メッセージ",
    "gallery.contact.vehicle": "車両",
    "gallery.contact.send": "メッセージを送信",
    "gallery.contact.sending": "送信中...",
    "gallery.contact.cancel": "キャンセル",
    "gallery.contact.success": "お問い合わせありがとうございます！近日中にご連絡いたします。",
    "gallery.share.title": "ギャラリーを共有",
    "gallery.share.description": "車両ギャラリーを友達や家族と共有してください：",
    "gallery.share.copy": "コピー",
    "gallery.share.copied": "コピーしました！",
    "gallery.share.share": "共有",
    "gallery.share.close": "閉じる",
    "gallery.share.gallery.title": "J & SONS AUTO 車両ギャラリー",
    "gallery.share.gallery.text": "プレミアム車両コレクションをご覧ください！",
    "gallery.images.view": "画像を見る",
    "gallery.images.previous": "前へ",
    "gallery.images.next": "次へ",
    "gallery.images.counter": "画像 {current} / {total}",
    "gallery.share.vehicle.title": "{vehicle}を共有",
    "gallery.share.vehicle.description": "この車両を友達や家族と共有してください：",
    "gallery.themes.title": "車両コレクション",
    "gallery.themes.subtitle": "ライフスタイルと好みに合わせて設計された厳選された車両コレクションをご覧ください",
    "gallery.themes.view.collection": "コレクションを見る",
    "gallery.themes.hide.collection": "コレクションを隠す",
    "gallery.themes.luxury.title": "ラグジュアリーコレクション",
    "gallery.themes.luxury.subtitle": "洗練されたドライバーのためのプレミアム車両",
    "gallery.themes.sports.title": "スポーツパフォーマンス",
    "gallery.themes.sports.subtitle": "スリルを求める方のための高性能車両",
    "gallery.themes.eco.title": "エコフレンドリー",
    "gallery.themes.eco.subtitle": "持続可能な交通ソリューション",
    "gallery.themes.family.title": "ファミリー車両",
    "gallery.themes.family.subtitle": "信頼性が高く、広々としたファミリーカー",

    // Contact Page
    "contact.title": "お問い合わせ",
    "contact.form.name": "お名前",
    "contact.form.email": "メールアドレス",
    "contact.form.phone": "電話番号",
    "contact.form.message": "メッセージ",
    "contact.form.submit": "メッセージを送信",
    "contact.callback": "コールバックを依頼",
    "contact.hours": "営業時間",
    "contact.hours.weekdays": "月 - 金: 9:00 AM - 6:00 PM",
    "contact.hours.weekend": "土 - 日: 10:00 AM - 4:00 PM",

    // Footer
    "footer.about": "Global Jidosha LLCについて",
    "footer.about.desc": "日本でプレミアム車の売買における信頼できるパートナー。",
    "footer.quick.links": "クイックリンク",
    "footer.contact.info": "連絡先情報",
    "footer.rights": "すべての権利を保有。",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ja")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
