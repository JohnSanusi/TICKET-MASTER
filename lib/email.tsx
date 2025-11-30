import fs from "fs"

import QRCode from "qrcode"

const RESEND_API_URL = "https://api.resend.com/emails"

interface EventDetails {
  title: string
  date: string
  time: string
  location: string
  image?: string | null
}

export async function sendTicketEmail(to: string, ticketPath: string, event: EventDetails, seatInfo: string, ticketId: string) {
  console.log(`Attempting to send email to ${to} for event ${event.title} via Resend API`)

  const apiKey = process.env.RESEND_API_KEY
  
  if (!apiKey || apiKey.startsWith("re_...")) {
    console.warn("⚠️ No valid Resend API key found. Email sending is mocked.")
    console.log(`
      [MOCK EMAIL]
      To: ${to}
      Subject: Your Ticket for ${event.title}
      Stat: ${seatInfo}
      Ticket Path: ${ticketPath}
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

    // Read the PDF file and convert to base64
    const fileBuffer = fs.readFileSync(ticketPath)
    const base64Content = fileBuffer.toString("base64")
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
      subject: `🎟️ ${event.title} - Stat ${seatInfo}`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f3f4f6; padding: 40px 0;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; font-family: sans-serif;">
                  <tr>
                    <td style="padding: 0;">
                      
                      <!-- Ticket Card -->
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
                        <tr>
                          <!-- Left Section (Main Info) -->
                          <td width="70%" style="padding: 30px; vertical-align: top;">
                            
                            <!-- Header: Initials + Title -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 30px;">
                              <tr>
                                <td width="50" style="vertical-align: middle;">
                                  <div style="width: 48px; height: 48px; background-color: #2563eb; border-radius: 8px; color: white; font-size: 18px; font-weight: 700; line-height: 48px; text-align: center; font-family: sans-serif;">
                                    ${initials}
                                  </div>
                                </td>
                                <td style="padding-left: 15px; vertical-align: middle;">
                                  <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #111827; line-height: 1.2; text-transform: capitalize;">${event.title}</h1>
                                </td>
                              </tr>
                            </table>

                            <!-- Details Grid -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                              <tr>
                                <td style="padding-bottom: 20px; width: 33%; vertical-align: top;">
                                  <div style="font-size: 10px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">WHEN</div>
                                  <div style="font-size: 12px; font-weight: 600; color: #1f2937;">${event.date}</div>
                                  <div style="font-size: 12px; font-weight: 600; color: #1f2937;">${event.time}</div>
                                </td>
                                <td style="padding-bottom: 20px; width: 33%; vertical-align: top;">
                                  <div style="font-size: 10px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">WHERE</div>
                                  <div style="font-size: 12px; font-weight: 600; color: #1f2937;">${event.location}</div>
                                </td>
                                <td style="padding-bottom: 20px; width: 33%; vertical-align: top;">
                                  <div style="font-size: 10px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">STAT</div>
                                  <div style="font-size: 12px; font-weight: 600; color: #1f2937;">${seatInfo}</div>
                                </td>
                              </tr>
                              <tr>
                                <td colspan="3" style="vertical-align: top;">
                                  <div style="font-size: 10px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">ATTENDEE</div>
                                  <div style="font-size: 14px; font-weight: 700; color: #1f2937;">${to.split('@')[0]}</div>
                                  <div style="font-size: 12px; color: #6b7280;">${to}</div>
                                </td>
                              </tr>
                            </table>

                            <div style="margin-top: 25px; font-size: 11px; color: #9ca3af; line-height: 1.4;">
                              Present this ticket on arrival. This ticket is valid for one entry. For support contact help@eventhub.com
                            </div>

                          </td>

                          <!-- Right Section (QR & Barcode) -->
                          <td width="30%" style="background-color: #f8fafc; padding: 30px 20px; text-align: center; border-left: 2px dashed #e2e8f0; vertical-align: middle;">
                            
                            <div style="font-size: 10px; font-weight: 600; color: #64748b; text-transform: uppercase; margin-bottom: 15px;">GENERAL</div>
                            
                            <!-- QR Code -->
                            <img src="${qrCodeData}" alt="QR Code" width="100" height="100" style="display: block; margin: 0 auto 15px auto; border-radius: 4px; mix-blend-mode: multiply;" />
                            
                            <!-- Ticket ID -->
                            <div style="margin-bottom: 15px;">
                              <div style="font-size: 9px; font-weight: 700; color: #9ca3af; text-transform: uppercase; margin-bottom: 2px;">TICKET ID</div>
                              <div style="font-size: 10px; font-family: monospace; color: #475569;">${ticketId}</div>
                            </div>

                            <!-- Fake Barcode -->
                            <div style="height: 35px; width: 100%; background-image: repeating-linear-gradient(90deg, #334155 0, #334155 2px, transparent 2px, transparent 4px, #334155 4px, #334155 5px, transparent 5px, transparent 7px); opacity: 0.8;"></div>
                            <div style="font-size: 8px; color: #9ca3af; margin-top: 4px; letter-spacing: 2px;">${ticketId.substring(0, 12)}</div>

                          </td>
                        </tr>
                      </table>
                      
                      <!-- Footer -->
                      <div style="text-align: center; padding-top: 20px;">
                        <p style="font-size: 11px; color: #9ca3af; margin: 0;">
                          © ${new Date().getFullYear()} EventHub. All rights reserved.
                        </p>
                      </div>

                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
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
