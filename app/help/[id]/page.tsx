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

import { Trash2 } from "lucide-react"
import { deleteTicket } from "@/app/actions/events"
import { ConfirmDialog } from "@/components/confirm-dialog"

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
  claimedSeats: Array<{ id: string; seatRow: string; seatNum: number; name: string; email: string }>
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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [ticketToDelete, setTicketToDelete] = useState<{ id: string; name: string; seat: string } | null>(null)

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

  const handleDeleteTicketClick = (ticketId: string, name: string, seat: string) => {
    setTicketToDelete({ id: ticketId, name, seat })
    setDeleteDialogOpen(true)
  }

  const handleDeleteTicketConfirm = async () => {
    if (!ticketToDelete) return
    
    const result = await deleteTicket(ticketToDelete.id)
    if (result.success) {
      setEvent((prev) =>
        prev
          ? {
              ...prev,
              claimedSeats: prev.claimedSeats.filter((seat) => seat.id !== ticketToDelete.id),
            }
          : null,
      )
    } else {
      alert("Failed to delete ticket")
    }
    setDeleteDialogOpen(false)
    setTicketToDelete(null)
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
      <main className="min-h-screen bg-background py-6 md:py-12">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 space-y-6 md:space-y-8">
          {event.image && (
            <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 w-full overflow-hidden rounded-lg">
              <Image
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}

          <div className="space-y-3 md:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">{event.title}</h1>
                <p className="text-base md:text-lg text-muted-foreground mt-2">{event.description}</p>
              </div>
              <Button asChild variant="outline" className="w-full sm:w-auto shrink-0">
                <Link href={`/event/${event.id}`}>View Public Page</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Date & Time</p>
                <p className="text-base md:text-lg font-semibold">
                  {event.date} at {event.time}
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Location</p>
                <p className="text-base md:text-lg font-semibold break-words">{event.location}</p>
              </div>
            </div>
          </div>

          {event.hasTimer && event.eventDate && event.eventTime ? (
            <>
              <CountdownTimer eventDate={event.eventDate} eventTime={event.eventTime} label="Countdown" />
              <p className="text-xs sm:text-sm text-muted-foreground text-center">
                Timer expires on {event.eventDate} at {event.eventTime}
              </p>
            </>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">Add Timer</Button>
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-md">
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
              <CardTitle className="text-lg sm:text-xl">Claimed Seats</CardTitle>
              <CardDescription className="text-sm">{event.claimedSeats.length} seats claimed</CardDescription>
            </CardHeader>
            <CardContent>
              {event.claimedSeats.length === 0 ? (
                <p className="text-muted-foreground text-sm">No seats claimed yet</p>
              ) : (
                <div className="space-y-2 max-h-60 md:max-h-96 overflow-y-auto">
                  {event.claimedSeats.map((claim, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-3 border-b last:border-0">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm sm:text-base truncate">{claim.name}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">{claim.email}</p>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                        <p className="font-semibold text-sm sm:text-base whitespace-nowrap">
                          Seat {claim.seatRow}
                          {claim.seatNum}
                        </p>
                        <button
                          onClick={() => handleDeleteTicketClick(claim.id, claim.name, `${claim.seatRow}${claim.seatNum}`)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors shrink-0"
                          title="Delete Ticket"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteTicketConfirm}
        title="Delete Ticket"
        description={ticketToDelete ? `Are you sure you want to delete the ticket for ${ticketToDelete.name} (Seat ${ticketToDelete.seat})? This action cannot be undone.` : ""}
        confirmText="Delete Ticket"
        cancelText="Cancel"
      />
    </>
  )
}
