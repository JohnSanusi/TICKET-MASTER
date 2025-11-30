import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db-adapter"
import { generateDefaultSeatMap } from "@/lib/constants"

export async function GET() {
  try {
    const events = await db.event.findManyWithClaims()
    return NextResponse.json(events)
  } catch (error) {
    console.error("Error fetching events:", error)
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const seatMap = generateDefaultSeatMap()

    const event = await db.event.create({
      title: data.title,
      description: data.description,
      location: data.location,
      date: data.date,
      time: data.time,
      image: data.image || null,
      seatMap: JSON.stringify(seatMap),
      hasTimer: false,
      eventDate: null,
      eventTime: null,
    })

    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    console.error("Error creating event:", error)
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 })
  }
}
