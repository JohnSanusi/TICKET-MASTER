import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db-adapter"
import { generateTicketPDF } from "@/lib/pdf-generator"
import { sendTicketEmail } from "@/lib/email"


export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const body = await request.json()
    const { seats, seatRow, seatNum, email, name, section, ticketType, level } = body

    // Support both multi-seat (seats array) and single seat (seatRow, seatNum) for backward compatibility
    const seatsToBook: Array<{ row: string; num: number }> = seats && seats.length > 0 
      ? seats 
      : (seatRow && seatNum ? [{ row: seatRow, num: seatNum }] : [])

    if (seatsToBook.length === 0) {
      return NextResponse.json({ error: "No seats selected" }, { status: 400 })
    }

    const event = await db.event.findUnique({
      id,
    })

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    const ticketId = `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const claimedSeats = []

    // Claim all seats
    for (const seat of seatsToBook) {
      const existingClaim = await db.claimedSeat.findFirst({
        eventId: id,
        seatRow: seat.row,
        seatNum: seat.num,
      })

      if (existingClaim) {
        return NextResponse.json({ error: `Seat ${seat.row}${seat.num} already claimed` }, { status: 400 })
      }

      const claim = await db.claimedSeat.create({
        eventId: id,
        seatRow: seat.row,
        seatNum: seat.num,
        email,
        name,
        section,
        ticketType,
        level,
        ticketId,
      })

      claimedSeats.push(claim)
    }

    // Generate seat info string with just numbers (e.g., "0 (Standing), 1, 2, 3" or "5, 6, 7")
    const seatInfo = seatsToBook.map(s => s.num === 0 ? '0 (Standing)' : `${s.num}`).join(', ')
    const firstSeat = seatsToBook[0]

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
      section || undefined,
      "", // No row needed anymore
      ticketType || undefined,
      level || undefined,
      eventData.image || undefined
    )

    // Send email
    try {
      await sendTicketEmail(
        email, 
        Buffer.from(pdfBuffer), 
        {
          artistName: eventData.artistName,
          title: eventData.title,
          date: eventData.date,
          time: eventData.time,
          location: eventData.location,
          image: eventData.image,
          section: section,
          ticketType: ticketType,
          level: level
        }, 
        seatInfo,
        ticketId,
        "", // No row needed
        section || undefined
      )
    } catch (error) {
      console.error("Failed to send email (continuing anyway):", error)
      // We don't fail the request if email fails, as the seat is already claimed
    }

    return NextResponse.json({
      success: true,
      ticketId: ticketId,
      seatsCount: claimedSeats.length,
      message: `${claimedSeats.length} seat${claimedSeats.length > 1 ? 's' : ''} claimed successfully`,
    })
  } catch (error) {
    console.error("Failed to claim seat:", error)
    return NextResponse.json({ error: "Failed to claim seat" }, { status: 500 })
  }
}

