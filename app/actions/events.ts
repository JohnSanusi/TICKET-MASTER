"use server"

import { db } from "@/lib/db-adapter"
import { generateDefaultSeatMap } from "@/lib/constants"

export async function createEvent(data: {
  artistName?: string
  title: string
  description: string
  location: string
  date: string
  time: string
  image?: string
  maxTickets?: number
  hasTimer?: boolean
  eventDate?: string
  eventTime?: string
}) {
  try {
    console.log('[Server Action] Creating event with data:', data)
    const seatMap = generateDefaultSeatMap(data.maxTickets || 50)

    const event = await db.event.create({
      artistName: data.artistName || null,
      title: data.title,
      description: data.description,
      location: data.location,
      date: data.date,
      time: data.time,
      image: data.image || null,
      seatMap: JSON.stringify(seatMap),
      maxTickets: data.maxTickets || 50,
      hasTimer: data.hasTimer || false,
      eventDate: data.eventDate || null,
      eventTime: data.eventTime || null,
    })

    console.log('[Server Action] Event created successfully:', event)
    return event
  } catch (error) {
    console.error('[Server Action] Error creating event:', error)
    throw error
  }
}

export async function addTimerToEvent(eventId: string, eventDate: string, eventTime: string) {
  const event = await db.event.update({
    where: { id: eventId },
    data: {
      eventDate,
      eventTime,
      hasTimer: true,
    },
  })

  return event
}

export async function claimSeat(eventId: string, seatRow: string, seatNum: number, email: string, name: string) {
  const ticketId = `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  // Removed check for existing claim to allow multiple people to book the same seat


  const claim = await db.claimedSeat.create({
    eventId,
    seatRow,
    seatNum,
    email,
    name,
    ticketId,
  })

  return claim
}

export async function claimSeats(eventId: string, seats: Array<{ row: string; num: number }>, email: string, name: string) {
  const results = []
  const errors = []

  for (const seat of seats) {
    try {
      const result = await claimSeat(eventId, seat.row, seat.num, email, name)
      results.push(result)
    } catch (error: any) {
      errors.push({ seat, error: error.message })
    }
  }

  if (errors.length > 0) {
    // If some failed, we should probably revert the others or just return partial success
    // For now, let's return the results and errors
    return { success: results.length > 0, results, errors }
  }

  return { success: true, results }
}

export async function getEventById(eventId: string) {
  const event = await db.event.findUniqueWithClaims({
    id: eventId,
  })

  return event
}

export async function getAllEvents() {
  try {
    const events = await db.event.findManyWithClaims()
    return events
  } catch (error) {
    console.error("Failed to fetch events:", error)
    return []
  }
}

export async function deleteEvent(eventId: string) {
  try {
    await db.event.delete({ id: eventId })
    return { success: true }
  } catch (error) {
    console.error("Failed to delete event:", error)
    return { success: false, error: "Failed to delete event" }
  }
}

export async function deleteTicket(ticketId: string) {
  try {
    await db.claimedSeat.delete({ id: ticketId })
    return { success: true }
  } catch (error) {
    console.error("Failed to delete ticket:", error)
    return { success: false, error: "Failed to delete ticket" }
  }
}
