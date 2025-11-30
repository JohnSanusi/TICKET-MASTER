import fs from "fs"

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
  ticketPath: string, 
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
                  
                  <!-- Top Header Text -->
                  <tr>
                    <td style="padding-bottom: 20px;">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td align="left">
                            <h2 style="margin: 0; font-size: 24px; font-weight: 700; color: #111827;">This is your ticket</h2>
                          </td>
                          <td align="right">
                             <!-- Branding / Logo Area -->
                             <div style="font-size: 14px; font-weight: 600; color: #4b5563; display: flex; align-items: center; justify-content: flex-end;">
                                <span style="margin-right: 8px;">Google Developer Groups</span>
                                <!-- Placeholder Logo Icon -->
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png" width="20" height="20" alt="Logo" style="vertical-align: middle;" />
                             </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 0;">
                      
                      <!-- Ticket Card -->
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
                        <tr>
                          <!-- Left Section (Main Info) -->
                          <td width="65%" style="padding: 30px; vertical-align: top; border-right: 1px dashed #e5e7eb;">
                            
                            <!-- Event Image / Logo -->
                            ${event.image ? `
                            <div style="margin-bottom: 20px;">
                              <img src="${event.image}" alt="Event Image" style="max-width: 100%; height: auto; max-height: 60px; object-fit: contain; border-radius: 4px;" />
                            </div>
                            ` : `
                            <div style="margin-bottom: 20px;">
                               <div style="width: 40px; height: 40px; background-color: #2563eb; border-radius: 8px; color: white; font-size: 16px; font-weight: 700; line-height: 40px; text-align: center;">${initials}</div>
                            </div>
                            `}

                            <!-- Event Details -->
                            <div style="margin-bottom: 30px;">
                              ${event.artistName ? `<div style="font-size: 14px; color: #6b7280; margin-bottom: 4px;">${event.artistName}</div>` : ''}
                              <h1 style="margin: 0 0 10px 0; font-size: 22px; font-weight: 800; color: #111827; line-height: 1.2;">${event.title}</h1>
                              
                              <div style="font-size: 12px; color: #4b5563; line-height: 1.5;">
                                <div style="margin-bottom: 2px;">${event.location}</div>
                                <div style="font-weight: 700; text-transform: uppercase;">${event.date}, ${event.time}</div>
                              </div>
                            </div>

                            <!-- Ticket Footer Details -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: auto;">
                              <tr>
                                <td style="padding-right: 15px; vertical-align: top;">
                                  <div style="font-size: 10px; font-weight: 700; color: #9ca3af; text-transform: uppercase; margin-bottom: 4px;">ISSUED TO</div>
                                  <div style="font-size: 12px; font-weight: 600; color: #1f2937;">${to.split('@')[0]}</div>
                                  <div style="font-size: 10px; color: #6b7280;">${to}</div>
                                </td>
                                <td style="padding-right: 15px; vertical-align: top;">
                                  <div style="font-size: 10px; font-weight: 700; color: #9ca3af; text-transform: uppercase; margin-bottom: 4px;">ORDER NUMBER</div>
                                  <div style="font-size: 12px; font-weight: 600; color: #1f2937;">${ticketId.substring(0, 12)}</div>
                                </td>
                                <td style="vertical-align: top;">
                                  <div style="font-size: 10px; font-weight: 700; color: #9ca3af; text-transform: uppercase; margin-bottom: 4px;">TICKET</div>
                                  <div style="font-size: 12px; font-weight: 600; color: #1f2937;">${event.ticketType || 'General Admission'}</div>
                                  <div style="font-size: 10px; color: #6b7280;">${seatInfo}</div>
                                </td>
                              </tr>
                            </table>

                          </td>

                          <!-- Right Section (QR Code) -->
                          <td width="35%" style="background-color: white; padding: 30px; text-align: center; vertical-align: middle;">
                            <img src="${qrCodeData}" alt="QR Code" width="150" height="150" style="display: block; margin: 0 auto; max-width: 100%; height: auto;" />
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
