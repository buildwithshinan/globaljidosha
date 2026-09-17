"use client"

import Image from "next/image"
import { Calendar, Gauge, Fuel } from "lucide-react"

interface CarCardProps {
  car: {
    id: string
    name: string
    price: string
    year: number
    mileage: string
    fuel: string
    image: string
    status?: "available" | "sold" | "new"
  }
}

export default function CarCard({ car }: CarCardProps) {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case "sold":
        return "bg-red-500"
      case "new":
        return "bg-green-500"
      default:
        return "bg-blue-500"
    }
  }

  const getStatusText = (status?: string) => {
    switch (status) {
      case "sold":
        return "Sold"
      case "new":
        return "New"
      default:
        return "Available"
    }
  }

  return (
    <div className="card group cursor-pointer">
      <div className="relative overflow-hidden rounded-xl mb-4">
        <Image
          src={car.image || "/placeholder.svg"}
          alt={car.name}
          width={400}
          height={250}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div
          className={`absolute top-2 right-2 ${getStatusColor(car.status)} text-white px-2 py-1 rounded-full text-xs font-semibold`}
        >
          {getStatusText(car.status)}
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">{car.name}</h3>
      <p className="text-2xl font-bold text-primary mb-4">{car.price}</p>

      <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <Calendar className="h-4 w-4" />
          <span>{car.year}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Gauge className="h-4 w-4" />
          <span>{car.mileage}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Fuel className="h-4 w-4" />
          <span>{car.fuel}</span>
        </div>
      </div>
    </div>
  )
}
