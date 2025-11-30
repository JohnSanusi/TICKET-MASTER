"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { CountdownTimer } from "@/components/countdown-timer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"

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
  claimedSeats: Array<{ seatRow: string; seatNum: number; name: string; email: string }>
}

export default function EventAdminDetailPage() {
  const params = useParams()
  const router = useRouter()
  const eventId = params.id as string
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [timerDate, setTimerDate] = useState("")
  const [timerTime, setTimerTime] = useState("")
  const [addingTimer, setAddingTimer] = useState(false)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${eventId}`)
        if (response.ok) {
          const data = await response.json()
          setEvent(data)
          if (data.eventDate) {
            setTimerDate(data.eventDate)
          }
          if (data.eventTime) {
            setTimerTime(data.eventTime)
          }
        }
      } catch (error) {
        console.error("Failed to fetch event:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [eventId])

  const handleAddTimer = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!timerDate || !timerTime) {
      alert("Please enter both date and time")
      return
    }

    setAddingTimer(true)
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventDate: timerDate,
          eventTime: timerTime,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setEvent(data)
        alert("Timer added successfully!")
      } else {
        alert("Failed to add timer")
      }
    } catch (error) {
      console.error("Failed to add timer:", error)
      alert("Failed to add timer")
    } finally {
      setAddingTimer(false)
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <p>Loading...</p>
        </main>
      </>
    )
  }

  if (!event) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <p>Event not found</p>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-12">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          {event.image && (
            <div className="relative h-96 w-full overflow-hidden rounded-lg">
              <Image
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold">{event.title}</h1>
                <p className="text-lg text-muted-foreground mt-2">{event.description}</p>
              </div>
              <Button asChild variant="outline">
                <Link href={`/event/${event.id}`}>View Public Page</Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Date & Time</p>
                <p className="text-lg font-semibold">
                  {event.date} at {event.time}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="text-lg font-semibold">{event.location}</p>
              </div>
            </div>
          </div>

          {event.hasTimer && event.eventDate && event.eventTime ? (
            <>
              <CountdownTimer eventDate={event.eventDate} eventTime={event.eventTime} label="Countdown" />
              <p className="text-sm text-muted-foreground text-center">
                Timer expires on {event.eventDate} at {event.eventTime}
              </p>
            </>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">Add Timer</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Event Timer</DialogTitle>
                  <DialogDescription>Set when the event countdown should reach zero</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddTimer} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Event Date</label>
                    <Input type="date" value={timerDate} onChange={(e) => setTimerDate(e.target.value)} required />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Event Time</label>
                    <Input type="time" value={timerTime} onChange={(e) => setTimerTime(e.target.value)} required />
                  </div>
                  <Button type="submit" disabled={addingTimer} className="w-full">
                    {addingTimer ? "Adding Timer..." : "Add Timer"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Claimed Seats</CardTitle>
              <CardDescription>{event.claimedSeats.length} seats claimed</CardDescription>
            </CardHeader>
            <CardContent>
              {event.claimedSeats.length === 0 ? (
                <p className="text-muted-foreground">No seats claimed yet</p>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {event.claimedSeats.map((claim, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b last:border-0">
                      <div>
                        <p className="font-medium">{claim.name}</p>
                        <p className="text-sm text-muted-foreground">{claim.email}</p>
                      </div>
                      <p className="font-semibold">
                        Seat {claim.seatRow}
                        {claim.seatNum}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
