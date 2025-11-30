import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db-adapter"
import { generateTicketPDF } from "@/lib/pdf-generator"
import { sendTicketEmail } from "@/lib/email"
import fs from "fs"
import path from "path"

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const { seatRow, seatNum, email, name } = await request.json()

    const ticketId = `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const existingClaim = await db.claimedSeat.findFirst({
      eventId: id,
      seatRow,
      seatNum,
    })

    if (existingClaim) {
      return NextResponse.json({ error: "Seat already claimed" }, { status: 400 })
    }

    const event = await db.event.findUnique({
      id,
    })

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    const claim = await db.claimedSeat.create({
      eventId: id,
      seatRow,
      seatNum,
      email,
      name,
      ticketId,
    })

    const seatInfo = `${seatRow}${seatNum}`

    // Cast event to any to bypass stale type definitions for new fields
    const eventData = event as any

    const pdfBuffer = await generateTicketPDF(
      eventData.title, 
      seatInfo, 
      eventData.date, 
      eventData.time, 
      eventData.location, 
      ticketId,
      name,
      eventData.artistName || undefined,
      eventData.section || undefined,
      seatRow, // Use the requested seat row directly
      eventData.ticketType || undefined,
      eventData.level || undefined,
      eventData.image || undefined
    )

    const ticketDir = path.join(process.cwd(), "public", "tickets")
    if (!fs.existsSync(ticketDir)) {
      fs.mkdirSync(ticketDir, { recursive: true })
    }

    const ticketFilePath = path.join(ticketDir, `${ticketId}.pdf`)
    fs.writeFileSync(ticketFilePath, pdfBuffer)

    // Send email
    try {
      await sendTicketEmail(
        email, 
        ticketFilePath, 
        {
          artistName: event.artistName,
          title: event.title,
          date: event.date,
          time: event.time,
          location: event.location,
          image: event.image,
          section: event.section,
          ticketType: event.ticketType,
          level: event.level
        }, 
        `${seatRow}${seatNum}`,
        ticketId,
        seatRow,
        event.section || undefined
      )
    } catch (error) {
      console.error("Failed to send email (continuing anyway):", error)
      // We don't fail the request if email fails, as the seat is already claimed
    }

    return NextResponse.json({
      success: true,
      ticketId: claim.ticketId,
      message: "Seat claimed successfully",
    })
  } catch (error) {
    console.error("Failed to claim seat:", error) // Updated error message
    return NextResponse.json({ error: "Failed to claim seat" }, { status: 500 })
  }
}
