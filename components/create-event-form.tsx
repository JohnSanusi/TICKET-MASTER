"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createEvent } from "@/app/actions/events"
import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export function CreateEventForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [hasTimer, setHasTimer] = useState(true) // Always enabled by default
  const [formData, setFormData] = useState({
    artistName: "",
    title: "",
    description: "",
    location: "",
    date: "",
    time: "",
    image: "",
    maxTickets: 50,
  })
  const [timerDuration, setTimerDuration] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    setFormData({
      ...formData,
      [name]: type === 'number' ? Number(value) : value,
    })
  }

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTimerDuration({
      ...timerDuration,
      [name]: Number.parseInt(value) || 0,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[Form] Submit button clicked')
    setLoading(true)
    try {
      let eventDate = formData.date
      let eventTime = formData.time

      if (hasTimer) {
        console.log('[Form] Calculating timer duration:', timerDuration)
        // Calculate target date based on duration
        const now = new Date()
        const targetTime = new Date(
          now.getTime() +
            timerDuration.days * 24 * 60 * 60 * 1000 +
            timerDuration.hours * 60 * 60 * 1000 +
            timerDuration.minutes * 60 * 1000 +
            timerDuration.seconds * 1000,
        )

        // Format to YYYY-MM-DD and HH:mm
        eventDate = targetTime.toISOString().split("T")[0]
        eventTime = targetTime.toTimeString().slice(0, 5)
        console.log('[Form] Timer target:', { eventDate, eventTime })
      }

      const eventData = {
        artistName: formData.artistName,
        title: formData.title,
        description: formData.description,
        location: formData.location,
        date: formData.date, // Display date
        time: formData.time, // Display time
        image: formData.image,
        maxTickets: formData.maxTickets,
        hasTimer,
        eventDate, // Timer target date
        eventTime, // Timer target time
      }

      console.log('[Form] Calling createEvent with:', eventData)
      const event = await createEvent(eventData)
      console.log('[Form] Event created successfully:', event)
      
      toast.success("Event created successfully!")
      
      // Navigate to the newly created event
      console.log('[Form] Navigating to:', `/event/${event.id}`)
      router.push(`/event/${event.id}`)
    } catch (error) {
      console.error('[Form] Failed to create event:', error)
      toast.error(`Failed to create event: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Event</CardTitle>
        <CardDescription>Add a new event to the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Artist Name</label>
            <Input
              name="artistName"
              value={formData.artistName}
              onChange={handleChange}
              placeholder="Enter artist/performer name"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Event Name</label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter event name"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter event description"
              required
              rows={4}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Location</label>
            <Input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter event location"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Maximum Tickets</label>
            <Input
              name="maxTickets"
              type="number"
              min="1"
              max="1000"
              value={formData.maxTickets}
              onChange={handleChange}
              placeholder="Enter maximum number of tickets"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Total number of tickets that can be generated for this event
            </p>
          </div>

          {/* Section, Ticket Type, Level removed from here */}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Display Date</label>
              <Input name="date" type="date" value={formData.date} onChange={handleChange} required />
            </div>
            <div>
              <label className="text-sm font-medium">Display Time</label>
              <Input name="time" type="time" value={formData.time} onChange={handleChange} required />
            </div>
          </div>

          {/* Countdown Timer - Always Visible */}
          <div className="space-y-2 p-4 border rounded-md bg-muted/20">
              <label className="text-sm font-medium">Countdown Duration</label>
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="text-xs text-muted-foreground">Days</label>
                  <Input
                    type="number"
                    name="days"
                    min="0"
                    value={timerDuration.days}
                    onChange={handleDurationChange}
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Hours</label>
                  <Input
                    type="number"
                    name="hours"
                    min="0"
                    max="23"
                    value={timerDuration.hours}
                    onChange={handleDurationChange}
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Minutes</label>
                  <Input
                    type="number"
                    name="minutes"
                    min="0"
                    max="59"
                    value={timerDuration.minutes}
                    onChange={handleDurationChange}
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Seconds</label>
                  <Input
                    type="number"
                    name="seconds"
                    min="0"
                    max="59"
                    value={timerDuration.seconds}
                    onChange={handleDurationChange}
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                The timer will count down from the moment you create the event.
              </p>
            </div>

          <div>
            <label className="text-sm font-medium">Event Image</label>
            <div className="space-y-4">
              <div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return

                    console.log('[Upload] Starting upload for:', file.name)
                    const data = new FormData()
                    data.append("file", file)

                    try {
                      const res = await fetch("/api/upload", {
                        method: "POST",
                        body: data,
                      })
                      
                      console.log('[Upload] Response status:', res.status)
                      
                      if (res.ok) {
                        const json = await res.json()
                        console.log('[Upload] Upload successful:', json)
                        setFormData(prev => ({ ...prev, image: json.url }))
                        toast.success("Image uploaded successfully!")
                      } else {
                        const error = await res.text()
                        console.error('[Upload] Upload failed:', error)
                        toast.error(`Upload failed: ${error}`)
                      }
                    } catch (err) {
                      console.error("[Upload] Upload error:", err)
                      toast.error(`Upload failed: ${err instanceof Error ? err.message : 'Unknown error'}`)
                    }
                  }}
                />
                <p className="text-xs text-muted-foreground mt-1">Upload an image from your device</p>
                {formData.image && formData.image.startsWith('/uploads/') && (
                  <p className="text-xs text-green-600 mt-1">✓ Image uploaded: {formData.image}</p>
                )}
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create Event"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
