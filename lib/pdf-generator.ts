import { jsPDF } from "jspdf"
import QRCode from "qrcode"
import fs from "fs"
import path from "path"

export async function generateTicketPDF(
  eventTitle: string,
  seatInfo: string,
  eventDate: string,
  eventTime: string,
  location: string,
  ticketId: string,
  attendeeName?: string
): Promise<Buffer> {
  // Generate QR code
  const qrCodeData = await QRCode.toDataURL(ticketId)

  // Create PDF - Portrait A4
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  // WHITE BACKGROUND
  pdf.setFillColor(255, 255, 255)
  pdf.rect(0, 0, 210, 297, "F")

  // Ticket Dimensions
  const startX = 15
  const startY = 30
  const width = 180
  const height = 90
  const leftWidth = width * 0.7
  const rightWidth = width * 0.3

  // Draw Main Card Shadow (simulated with gray rect)
  pdf.setFillColor(240, 240, 240)
  pdf.rect(startX + 2, startY + 2, width, height, "F")

  // Draw Main Card Background (White)
  pdf.setFillColor(255, 255, 255)
  pdf.rect(startX, startY, width, height, "F")
  
  // Draw Right Section Background (Light Gray)
  pdf.setFillColor(248, 250, 252) // #f8fafc
  pdf.rect(startX + leftWidth, startY, rightWidth, height, "F")

  // Draw Border
  pdf.setDrawColor(226, 232, 240) // #e2e8f0
  pdf.setLineWidth(0.5)
  pdf.rect(startX, startY, width, height)
  
  // Draw Dashed Line Separator
  pdf.setDrawColor(226, 232, 240)
  pdf.setLineDashPattern([2, 2], 0)
  pdf.line(startX + leftWidth, startY, startX + leftWidth, startY + height)
  pdf.setLineDashPattern([], 0) // Reset

  // --- LEFT SECTION CONTENT ---

  // Initials Box
  const initials = eventTitle.split(' ').filter(w => w.length > 0).slice(0, 2).map(w => w[0]).join('').toUpperCase() || 'EV'
  
  pdf.setFillColor(37, 99, 235) // #2563eb (Blue)
  pdf.roundedRect(startX + 10, startY + 10, 15, 15, 2, 2, "F")
  
  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(14)
  pdf.setFont("helvetica", "bold")
  pdf.text(initials, startX + 17.5, startY + 19.5, { align: "center" })

  // Event Title
  pdf.setTextColor(17, 24, 39) // #111827
  pdf.setFontSize(16)
  pdf.setFont("helvetica", "bold")
  // Capitalize first letter of each word
  const capitalizedTitle = eventTitle.replace(/\b\w/g, l => l.toUpperCase())
  const titleLines = pdf.splitTextToSize(capitalizedTitle, leftWidth - 40)
  pdf.text(titleLines, startX + 35, startY + 16)

  // Grid Info
  const gridY = startY + 40
  const colWidth = (leftWidth - 20) / 3

  // Labels style
  const labelColor = [156, 163, 175] // #9ca3af
  const valueColor = [31, 41, 55] // #1f2937
  
  const drawField = (label: string, value: string | string[], x: number, y: number) => {
    pdf.setTextColor(156, 163, 175)
    pdf.setFontSize(8)
    pdf.setFont("helvetica", "bold")
    pdf.text(label, x, y)
    
    pdf.setTextColor(31, 41, 55)
    pdf.setFontSize(10)
    pdf.setFont("helvetica", "bold")
    
    if (Array.isArray(value)) {
      value.forEach((v, i) => pdf.text(v, x, y + 5 + (i * 4)))
    } else {
      pdf.text(value, x, y + 5)
    }
  }

  // WHEN
  drawField("WHEN", [eventDate, eventTime], startX + 10, gridY)
  
  // WHERE
  const locationLines = pdf.splitTextToSize(location, colWidth - 5)
  drawField("WHERE", locationLines, startX + 10 + colWidth, gridY)
  
  // SEAT
  drawField("SEAT", seatInfo, startX + 10 + (colWidth * 2), gridY)

  // ATTENDEE
  if (attendeeName) {
    drawField("ATTENDEE", attendeeName, startX + 10, gridY + 20)
  }

  // Footer Text
  pdf.setTextColor(156, 163, 175)
  pdf.setFontSize(7)
  pdf.setFont("helvetica", "normal")
  pdf.text("Present this ticket on arrival. This ticket is valid for one entry.", startX + 10, startY + height - 10)

  // --- RIGHT SECTION CONTENT ---

  const rightCenterX = startX + leftWidth + (rightWidth / 2)

  // GENERAL Label
  pdf.setTextColor(100, 116, 139) // #64748b
  pdf.setFontSize(8)
  pdf.setFont("helvetica", "bold")
  pdf.text("GENERAL", rightCenterX, startY + 15, { align: "center" })

  // QR Code
  pdf.addImage(qrCodeData, "PNG", rightCenterX - 15, startY + 22, 30, 30)

  // Ticket ID Label
  pdf.setTextColor(156, 163, 175)
  pdf.setFontSize(7)
  pdf.setFont("helvetica", "bold")
  pdf.text("TICKET ID", rightCenterX, startY + 60, { align: "center" })

  // Ticket ID Value
  pdf.setTextColor(71, 85, 105) // #475569
  pdf.setFontSize(8)
  pdf.setFont("courier", "normal")
  pdf.text(ticketId, rightCenterX, startY + 64, { align: "center" })

  // Fake Barcode
  const barcodeY = startY + 72
  const barcodeHeight = 10
  const barcodeWidth = 40
  const barcodeX = rightCenterX - (barcodeWidth / 2)
  
  pdf.setFillColor(51, 65, 85) // #334155
  
  // Draw random lines to simulate barcode
  let currentX = barcodeX
  while (currentX < barcodeX + barcodeWidth) {
    const lineWidth = Math.random() * 1.5 + 0.5
    if (currentX + lineWidth > barcodeX + barcodeWidth) break
    
    // Random gap
    if (Math.random() > 0.3) {
      pdf.rect(currentX, barcodeY, lineWidth, barcodeHeight, "F")
    }
    currentX += lineWidth + (Math.random() * 1)
  }

  return Buffer.from(pdf.output("arraybuffer"))
}
