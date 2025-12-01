"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { CountdownTimer } from "@/components/countdown-timer"
import { SeatMap } from "@/components/seat-map"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Calendar, Clock } from "lucide-react"
import { toast } from "sonner"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  image: string | null
  hasTimer: boolean
  eventDate: string | null
  eventTime: string | null
  seatMap?: string
  claimedSeats: Array<{ seatRow: string; seatNum: number }>
}

export default function EventDetailPage() {
  const params = useParams()
  const eventId = params.id as string
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSeats, setSelectedSeats] = useState<Array<{ row: string; num: number }>>([])
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [bookingData, setBookingData] = useState({
    section: "",
    ticketType: "",
    level: ""
  })

  const [claiming, setClaiming] = useState(false)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${eventId}`)
        if (response.ok) {
          const data = await response.json()
          setEvent(data)
        }
      } catch (error) {
        console.error("Failed to fetch event:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [eventId])

  const handleSelectSeat = (seats: Array<{ row: string; num: number }>) => {
    setSelectedSeats(seats)
  }

  const handleClaimSeat = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat")
      return
    }
    if (!email || !name) {
      toast.error("Please enter your email and name")
      return
    }

    setClaiming(true)
    try {
      const response = await fetch(`/api/events/${eventId}/claim-seat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          seats: selectedSeats,
          email,
          name,
          section: bookingData.section,
          ticketType: bookingData.ticketType,
          level: bookingData.level
        }),
      })

      if (response.ok) {
        const result = await response.json()
        toast.success(`${selectedSeats.length} ticket${selectedSeats.length > 1 ? 's' : ''} claimed! Your PDF has been sent to ${email}`)
        setSelectedSeats([])
        setEmail("")
        setName("")
        const eventResponse = await fetch(`/api/events/${eventId}`)
        if (eventResponse.ok) {
          const data = await eventResponse.json()
          setEvent(data)
        }
      } else {
        const error = await response.json()
        toast.error(error.error || "Failed to claim seat")
      }
    } catch (error) {
      console.error("Failed to claim seat:", error)
      toast.error("Failed to claim seat")
    } finally {
      setClaiming(false)
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white flex items-center justify-center">
          <p className="text-gray-600">Loading...</p>
        </main>
      </>
    )
  }

  if (!event) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white flex items-center justify-center">
          <p className="text-gray-600">Event not found</p>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="relative h-[50vh] md:h-screen bg-black overflow-hidden">
          {event.image && event.image !== "/placeholder.svg" ? (
            <Image
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              fill
              className="object-cover opacity-70"
              unoptimized
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

          {/* Title over image */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-16">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-6xl font-bold text-white leading-tight">{event.title}</h1>
              <div className="flex flex-wrap gap-4 md:gap-6 text-white/90 text-sm md:text-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 md:w-5 md:h-5" />
                  <span>{event.time}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          {/* Countdown Timer */}
          {event.hasTimer && event.eventDate && event.eventTime && (
            <div className="mb-8 md:mb-12">
              <CountdownTimer eventDate={event.eventDate} eventTime={event.eventTime} label="Starts in" />
            </div>
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Seat Map and Description */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="overflow-hidden border border-gray-200">
                <CardHeader className="bg-gray-50 border-b border-gray-200">
                  <CardTitle className="text-blue-600">Select Your Seat</CardTitle>
                  <CardDescription>Click on an available seat</CardDescription>
                </CardHeader>
                <CardContent className="p-4 md:p-8 overflow-x-auto">
                  <div className="min-w-[300px]">
                    <SeatMap eventId={event.id} claimedSeats={event.claimedSeats} onSelectSeat={handleSelectSeat} seatMap={event.seatMap} />
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">About This Event</h3>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg">{event.description}</p>
              </div>
            </div>

            {/* Right: Booking Sidebar */}
            <div>
              <Card className="border-2 border-blue-600 lg:sticky lg:top-24 overflow-hidden">
                <CardHeader className="bg-blue-600 text-white">
                  <CardTitle>Secure Your Ticket</CardTitle>
                  <CardDescription className="text-blue-100">
                    {selectedSeats.length > 0 
                      ? `Selected: ${selectedSeats.map(s => `${s.row}${s.num}`).join(', ')}` 
                      : "Pick seats above"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleClaimSeat} className="space-y-4">
                    <div>
                      <label className="text-sm font-bold text-gray-900 mb-2 block">Full Name</label>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        required
                        className="border-gray-300"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-bold text-gray-900 mb-2 block">Email Address</label>
                      <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        type="email"
                        required
                        className="border-gray-300"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                       <div>
                        <label className="text-xs font-bold text-gray-900 mb-1 block">Section</label>
                        <Input
                          value={bookingData.section}
                          onChange={(e) => setBookingData({...bookingData, section: e.target.value})}
                          placeholder="A"
                          className="border-gray-300 text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-900 mb-1 block">Type</label>
                        <Input
                          value={bookingData.ticketType}
                          onChange={(e) => setBookingData({...bookingData, ticketType: e.target.value})}
                          placeholder="VIP"
                          className="border-gray-300 text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-900 mb-1 block">Level</label>
                        <Input
                          value={bookingData.level}
                          onChange={(e) => setBookingData({...bookingData, level: e.target.value})}
                          placeholder="1"
                          className="border-gray-300 text-sm"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={selectedSeats.length === 0 || claiming}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base font-bold py-6 rounded-md"
                    >
                      {claiming ? "Processing..." : `Get ${selectedSeats.length > 0 ? selectedSeats.length : ''} Ticket${selectedSeats.length !== 1 ? 's' : ''}`}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
