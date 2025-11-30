import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db-adapter"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const event = await db.event.findUniqueWithClaims({
      id,
    })

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    return NextResponse.json(event)
  } catch (error) {
    console.error("Error fetching event:", error)
    return NextResponse.json({ error: "Failed to fetch event" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const data = await request.json()

    const event = await db.event.update({
      where: { id },
      data: {
        eventDate: data.eventDate,
        eventTime: data.eventTime,
        hasTimer: true,
      },
    })

    return NextResponse.json({
      ...event,
      claimedSeats: [],
    })
  } catch (error) {
    console.error("Error updating event:", error)
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 })
  }
}
