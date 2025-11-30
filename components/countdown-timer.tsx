"use client"

import { useEffect, useState } from "react"

interface CountdownTimerProps {
  eventDate: string
  eventTime: string
  label?: string
}

interface TimeRemaining {
  days: number
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
}

export function CountdownTimer({ eventDate, eventTime, label }: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(null)

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const eventDateTime = new Date(`${eventDate}T${eventTime}:00`)
      const now = new Date()
      const diff = eventDateTime.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        })
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diff / 1000 / 60) % 60)
      const seconds = Math.floor((diff / 1000) % 60)

      setTimeRemaining({
        days,
        hours,
        minutes,
        seconds,
        isExpired: false,
      })
    }

    calculateTimeRemaining()
    const interval = setInterval(calculateTimeRemaining, 1000)

    return () => clearInterval(interval)
  }, [eventDate, eventTime])

  if (!timeRemaining) {
    return <div className="text-center py-4">Loading...</div>
  }

  if (timeRemaining.isExpired) {
    return (
      <div className="text-center py-8 text-lg font-bold text-red-600 bg-red-50 rounded-lg">Event has started!</div>
    )
  }

  return (
    <div className="bg-blue-600 text-white rounded-lg p-8 shadow-lg">
      <h3 className="text-xl font-bold mb-6 text-center uppercase tracking-wide">{label || "Event Starts In"}</h3>
      <div className="grid grid-cols-4 gap-4 text-center">
        <div className="bg-blue-700 rounded-lg p-4">
          <div className="text-4xl font-bold font-mono">{String(timeRemaining.days).padStart(2, "0")}</div>
          <div className="text-xs uppercase tracking-wider text-blue-100 mt-2">Days</div>
        </div>
        <div className="bg-blue-700 rounded-lg p-4">
          <div className="text-4xl font-bold font-mono">{String(timeRemaining.hours).padStart(2, "0")}</div>
          <div className="text-xs uppercase tracking-wider text-blue-100 mt-2">Hours</div>
        </div>
        <div className="bg-blue-700 rounded-lg p-4">
          <div className="text-4xl font-bold font-mono">{String(timeRemaining.minutes).padStart(2, "0")}</div>
          <div className="text-xs uppercase tracking-wider text-blue-100 mt-2">Min</div>
        </div>
        <div className="bg-blue-700 rounded-lg p-4">
          <div className="text-4xl font-bold font-mono">{String(timeRemaining.seconds).padStart(2, "0")}</div>
          <div className="text-xs uppercase tracking-wider text-blue-100 mt-2">Sec</div>
        </div>
      </div>
    </div>
  )
}
