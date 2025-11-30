"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar } from "lucide-react"

interface EventCardProps {
  id: string
  title: string
  date: string
  time: string
  location: string
  image?: string | null
  isAdmin?: boolean
}

export function EventCard({ id, title, date, time, location, image, isAdmin }: EventCardProps) {
  const href = isAdmin ? `/help/${id}` : `/event/${id}`

  return (
    <Link href={href}>
      <Card className="overflow-hidden h-full flex flex-col group cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-200">
        <div className="relative h-48 bg-gray-200 overflow-hidden">
          {image && image !== "/placeholder.svg" ? (
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
              <span className="text-gray-600 text-sm font-semibold">Event Image</span>
            </div>
          )}
        </div>

        <CardContent className="p-4 flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="font-bold text-base line-clamp-2 group-hover:text-blue-600 transition-colors">{title}</h3>
            <div className="flex items-start gap-1.5 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="line-clamp-1">{location}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-500 pt-3 border-t border-gray-200">
            <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
            <span>{date}</span>
            {time && <span className="text-gray-400">•</span>}
            {time && <span>{time}</span>}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
