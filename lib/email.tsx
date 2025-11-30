

import QRCode from "qrcode"

const RESEND_API_URL = "https://api.resend.com/emails"

interface EventDetails {
  artistName?: string | null
  title: string
  date: string
  time: string
  location: string
  image?: string | null
  section?: string | null
  ticketType?: string | null
  level?: string | null
}

export async function sendTicketEmail(
  to: string, 
  ticketBuffer: Buffer, 
  event: EventDetails, 
  seatInfo: string, 
  ticketId: string,
  row?: string,
  section?: string
) {
  console.log(`Attempting to send email to ${to} for event ${event.title} via Resend API`)

  const apiKey = process.env.RESEND_API_KEY
  
  if (!apiKey || apiKey.startsWith("re_...")) {
    console.warn("⚠️ No valid Resend API key found. Email sending is mocked.")
    console.log(`
      [MOCK EMAIL]
      To: ${to}
      Subject: Your Ticket for ${event.title}
      Stat: ${seatInfo}
      Ticket ID: ${ticketId}
      Event: ${event.title}
      Date: ${event.date} at ${event.time}
      Location: ${event.location}
      Image: ${event.image}
    `)
    return { id: "mock-id" }
  }

  try {
    // Generate QR Code for email preview
    const qrCodeData = await QRCode.toDataURL(ticketId)

    // Convert buffer to base64
    const base64Content = ticketBuffer.toString("base64")
    const filename = `ticket-${event.title.replace(/\s+/g, "-").toLowerCase()}.pdf`

    // Only attach the PDF
    const attachments = [
      {
        filename: filename,
        content: base64Content,
      },
    ]

    // Generate initials for the event logo
    const getInitials = (title: string) => {
      const words = title.split(' ').filter(w => w.length > 0)
      if (words.length === 0) return 'EV'
      if (words.length === 1) return words[0].substring(0, 2).toUpperCase()
      return (words[0][0] + words[1][0]).toUpperCase()
    }
    const initials = getInitials(event.title)

    // Construct the sender address
    const senderEmail = process.env.SENDER_EMAIL || "onboarding@resend.dev"
    const senderName = process.env.SENDER_NAME || "TICKETMASTER"
    const from = `${senderName} <${senderEmail}>`

    const body = {
      from,
      to: [to],
      subject: `🎟️ Your Ticket for ${event.title}`,
      text: `
Hello!

Your ticket for ${event.title} is attached to this email.

Event Details:
- Event: ${event.title}
- Date: ${event.date}
- Time: ${event.time}
- Location: ${event.location}
- Seat: ${seatInfo}
- Ticket ID: ${ticketId}

Please download and save the attached PDF ticket. You will need to present it at the event.

Thank you for your purchase!

Best regards,
${senderName}
      `.trim(),
      attachments: attachments,
    }

    const response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Resend API Error:", errorData)
      throw new Error(`Resend API responded with ${response.status}: ${JSON.stringify(errorData)}`)
    }

    const data = await response.json()
    console.log("Email sent successfully via Resend:", data.id)
    return data
  } catch (error) {
    console.error("Failed to send email:", error)
    return null
  }
}
