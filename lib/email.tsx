

import QRCode from "qrcode"

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email"

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
  console.log(`Attempting to send email to ${to} for event ${event.title} via Brevo API`)

  const apiKey = process.env.BREVO_API_KEY
  
  if (!apiKey) {
    console.warn("⚠️ No valid Brevo API key found. Email sending is mocked.")
    console.log(`
      [MOCK EMAIL]
      To: ${to}
      Subject: Your Ticket for ${event.title}
      Seat: ${seatInfo}
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

    // Generate initials for the event logo
    const getInitials = (title: string) => {
      const words = title.split(' ').filter(w => w.length > 0)
      if (words.length === 0) return 'EV'
      if (words.length === 1) return words[0].substring(0, 2).toUpperCase()
      return (words[0][0] + words[1][0]).toUpperCase()
    }
    const initials = getInitials(event.title)

    // Construct the sender address
    const senderEmail = process.env.SENDER_EMAIL || "onboarding@resend.dev" // Keep default or update if user has a specific one
    const senderName = process.env.SENDER_NAME || "TICKETMASTER"

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Your Ticket</title>
          <style>
            body { font-family: sans-serif; line-height: 1.5; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #026cdf; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { border: 1px solid #ddd; border-top: none; padding: 20px; border-radius: 0 0 8px 8px; }
            .ticket-info { margin-bottom: 20px; }
            .label { font-weight: bold; color: #666; font-size: 0.9em; }
            .value { font-size: 1.1em; margin-bottom: 10px; }
            .footer { margin-top: 20px; font-size: 0.8em; color: #888; text-align: center; }
            .logo-fallback { font-size: 24px; font-weight: bold; letter-spacing: 1px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo-fallback">${initials}</div>
              <div style="font-size: 12px; margin-top: 5px;">TICKETMASTER</div>
            </div>
            <div class="content">
              <h2>Your Ticket for ${event.title}</h2>
              <p>Hello!</p>
              <p>Your ticket is attached to this email as a PDF. Please download it and present it at the venue.</p>
              
              <div class="ticket-info">
                <div class="label">EVENT</div>
                <div class="value">${event.title}</div>
                
                <div class="label">DATE & TIME</div>
                <div class="value">${event.date} at ${event.time}</div>
                
                <div class="label">LOCATION</div>
                <div class="value">${event.location}</div>
                
                <div class="label">SEAT</div>
                <div class="value">${seatInfo}</div>
              </div>

              <p>Ticket ID: ${ticketId}</p>
            </div>
            <div class="footer">
              <p>Thank you for your purchase!</p>
              <p>${senderName}</p>
            </div>
          </div>
        </body>
      </html>
    `

    const body = {
      sender: {
        name: senderName,
        email: senderEmail
      },
      to: [
        {
          email: to,
          name: to // Using email as name if name isn't available
        }
      ],
      subject: `🎟️ Your Ticket for ${event.title}`,
      htmlContent: htmlContent,
      textContent: `
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
      attachment: [
        {
          name: filename,
          content: base64Content,
        },
      ],
    }

    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Brevo API Error:", errorData)
      throw new Error(`Brevo API responded with ${response.status}: ${JSON.stringify(errorData)}`)
    }

    const data = await response.json()
    console.log("Email sent successfully via Brevo:", data.messageId || "sent")
    return data
  } catch (error) {
    console.error("Failed to send email:", error)
    return null
  }
}
