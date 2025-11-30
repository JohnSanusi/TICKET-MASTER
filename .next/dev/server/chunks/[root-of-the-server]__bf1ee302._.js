module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[externals]/fs/promises [external] (fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs/promises", () => require("fs/promises"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/async_hooks [external] (async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("async_hooks", () => require("async_hooks"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/lib/db-adapter.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "db",
    ()=>db
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$2f$default$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@prisma/client/default.js [app-route] (ecmascript)");
;
const prismaClientSingleton = ()=>{
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$2f$default$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrismaClient"]();
};
const prisma = globalThis.prisma ?? prismaClientSingleton();
if ("TURBOPACK compile-time truthy", 1) globalThis.prisma = prisma;
const db = {
    event: {
        create: async (data)=>{
            return prisma.event.create({
                data
            });
        },
        findUnique: async (where)=>{
            return prisma.event.findUnique({
                where
            });
        },
        findMany: async (options)=>{
            return prisma.event.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                ...options
            });
        },
        update: async (params)=>{
            return prisma.event.update({
                where: params.where,
                data: params.data
            });
        },
        findUniqueWithClaims: async (where)=>{
            return prisma.event.findUnique({
                where,
                include: {
                    claimedSeats: true
                }
            });
        },
        findManyWithClaims: async ()=>{
            return prisma.event.findMany({
                include: {
                    claimedSeats: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
        }
    },
    claimedSeat: {
        create: async (data)=>{
            return prisma.claimedSeat.create({
                data
            });
        },
        findFirst: async (where)=>{
            return prisma.claimedSeat.findFirst({
                where
            });
        }
    }
};
}),
"[externals]/worker_threads [external] (worker_threads, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("worker_threads", () => require("worker_threads"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[project]/lib/pdf-generator.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateTicketPDF",
    ()=>generateTicketPDF
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$node$2e$min$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf/dist/jspdf.node.min.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qrcode$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/qrcode/lib/index.js [app-route] (ecmascript)");
;
;
async function generateTicketPDF(eventTitle, seatInfo, eventDate, eventTime, location, ticketId, attendeeName, artistName, section, row, ticketType, level) {
    // Generate QR code
    const qrCodeData = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qrcode$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].toDataURL(ticketId);
    // Create PDF - Portrait A4
    const pdf = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$node$2e$min$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsPDF"]({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
    });
    // WHITE BACKGROUND
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, 210, 297, "F");
    // Ticket Dimensions
    const startX = 15;
    const startY = 30;
    const width = 180;
    const height = 90;
    const leftWidth = width * 0.7;
    const rightWidth = width * 0.3;
    // Draw Main Card Shadow (simulated with gray rect)
    pdf.setFillColor(240, 240, 240);
    pdf.rect(startX + 2, startY + 2, width, height, "F");
    // Draw Main Card Background (White)
    pdf.setFillColor(255, 255, 255);
    pdf.rect(startX, startY, width, height, "F");
    // Draw Right Section Background (Light Gray)
    pdf.setFillColor(248, 250, 252); // #f8fafc
    pdf.rect(startX + leftWidth, startY, rightWidth, height, "F");
    // Draw Border
    pdf.setDrawColor(226, 232, 240); // #e2e8f0
    pdf.setLineWidth(0.5);
    pdf.rect(startX, startY, width, height);
    // Draw Dashed Line Separator
    pdf.setDrawColor(226, 232, 240);
    pdf.setLineDashPattern([
        2,
        2
    ], 0);
    pdf.line(startX + leftWidth, startY, startX + leftWidth, startY + height);
    pdf.setLineDashPattern([], 0); // Reset
    // --- LEFT SECTION CONTENT ---
    // Initials Box
    const initials = eventTitle.split(' ').filter((w)=>w.length > 0).slice(0, 2).map((w)=>w[0]).join('').toUpperCase() || 'EV';
    pdf.setFillColor(37, 99, 235); // #2563eb (Blue)
    pdf.roundedRect(startX + 10, startY + 10, 15, 15, 2, 2, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.text(initials, startX + 17.5, startY + 19.5, {
        align: "center"
    });
    // Artist Name (if provided)
    let titleY = startY + 16;
    if (artistName) {
        pdf.setTextColor(107, 114, 128); // #6b7280
        pdf.setFontSize(11);
        pdf.setFont("helvetica", "normal");
        pdf.text(artistName, startX + 35, titleY);
        titleY += 6;
    }
    // Event Title
    pdf.setTextColor(17, 24, 39); // #111827
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");
    // Capitalize first letter of each word
    const capitalizedTitle = eventTitle.replace(/\b\w/g, (l)=>l.toUpperCase());
    const titleLines = pdf.splitTextToSize(capitalizedTitle, leftWidth - 40);
    pdf.text(titleLines, startX + 35, titleY);
    // Grid Info
    let gridY = startY + 40;
    const colWidth = (leftWidth - 20) / 3;
    // Labels style
    const labelColor = [
        156,
        163,
        175
    ] // #9ca3af
    ;
    const valueColor = [
        31,
        41,
        55
    ] // #1f2937
    ;
    const drawField = (label, value, x, y)=>{
        pdf.setTextColor(156, 163, 175);
        pdf.setFontSize(8);
        pdf.setFont("helvetica", "bold");
        pdf.text(label, x, y);
        pdf.setTextColor(31, 41, 55);
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "bold");
        if (Array.isArray(value)) {
            value.forEach((v, i)=>pdf.text(v, x, y + 5 + i * 4));
        } else {
            pdf.text(value, x, y + 5);
        }
    };
    // First Row: Section, Row, Seat
    let fieldX = startX + 10;
    if (section) {
        drawField("SECTION", section, fieldX, gridY);
        fieldX += colWidth;
    }
    if (row) {
        drawField("ROW", row, fieldX, gridY);
        fieldX += colWidth;
    }
    drawField("STAT", seatInfo, fieldX, gridY);
    // Second Row: Date, Time, Location
    gridY += 20;
    drawField("DATE", eventDate, startX + 10, gridY);
    drawField("TIME", eventTime, startX + 10 + colWidth, gridY);
    const locationLines = pdf.splitTextToSize(location, colWidth - 5);
    drawField("LOCATION", locationLines, startX + 10 + colWidth * 2, gridY);
    // Third Row: Ticket Type, Level (if provided)
    if (ticketType || level) {
        gridY += 20;
        if (ticketType) {
            drawField("TICKET TYPE", ticketType, startX + 10, gridY);
        }
        if (level) {
            drawField("LEVEL", level, startX + 10 + (ticketType ? colWidth : 0), gridY);
        }
    }
    // ATTENDEE
    if (attendeeName) {
        gridY += 20;
        drawField("ATTENDEE", attendeeName, startX + 10, gridY);
    }
    // Footer Text
    pdf.setTextColor(156, 163, 175);
    pdf.setFontSize(7);
    pdf.setFont("helvetica", "normal");
    pdf.text("Present this ticket on arrival. This ticket is valid for one entry.", startX + 10, startY + height - 10);
    // --- RIGHT SECTION CONTENT ---
    const rightCenterX = startX + leftWidth + rightWidth / 2;
    // GENERAL Label
    pdf.setTextColor(100, 116, 139); // #64748b
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "bold");
    pdf.text("GENERAL", rightCenterX, startY + 15, {
        align: "center"
    });
    // QR Code
    pdf.addImage(qrCodeData, "PNG", rightCenterX - 15, startY + 22, 30, 30);
    // Ticket ID Label
    pdf.setTextColor(156, 163, 175);
    pdf.setFontSize(7);
    pdf.setFont("helvetica", "bold");
    pdf.text("TICKET ID", rightCenterX, startY + 60, {
        align: "center"
    });
    // Ticket ID Value
    pdf.setTextColor(71, 85, 105); // #475569
    pdf.setFontSize(8);
    pdf.setFont("courier", "normal");
    pdf.text(ticketId, rightCenterX, startY + 64, {
        align: "center"
    });
    // Fake Barcode
    const barcodeY = startY + 72;
    const barcodeHeight = 10;
    const barcodeWidth = 40;
    const barcodeX = rightCenterX - barcodeWidth / 2;
    pdf.setFillColor(51, 65, 85); // #334155
    // Draw random lines to simulate barcode
    let currentX = barcodeX;
    while(currentX < barcodeX + barcodeWidth){
        const lineWidth = Math.random() * 1.5 + 0.5;
        if (currentX + lineWidth > barcodeX + barcodeWidth) break;
        // Random gap
        if (Math.random() > 0.3) {
            pdf.rect(currentX, barcodeY, lineWidth, barcodeHeight, "F");
        }
        currentX += lineWidth + Math.random() * 1;
    }
    return Buffer.from(pdf.output("arraybuffer"));
}
}),
"[project]/lib/email.tsx [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendTicketEmail",
    ()=>sendTicketEmail
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qrcode$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/qrcode/lib/index.js [app-route] (ecmascript)");
;
;
const RESEND_API_URL = "https://api.resend.com/emails";
async function sendTicketEmail(to, ticketPath, event, seatInfo, ticketId, row, section) {
    console.log(`Attempting to send email to ${to} for event ${event.title} via Resend API`);
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey.startsWith("re_...")) {
        console.warn("⚠️ No valid Resend API key found. Email sending is mocked.");
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
    `);
        return {
            id: "mock-id"
        };
    }
    try {
        // Generate QR Code for email preview
        const qrCodeData = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qrcode$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].toDataURL(ticketId);
        // Read the PDF file and convert to base64
        const fileBuffer = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(ticketPath);
        const base64Content = fileBuffer.toString("base64");
        const filename = `ticket-${event.title.replace(/\s+/g, "-").toLowerCase()}.pdf`;
        // Only attach the PDF
        const attachments = [
            {
                filename: filename,
                content: base64Content
            }
        ];
        // Generate initials for the event logo
        const getInitials = (title)=>{
            const words = title.split(' ').filter((w)=>w.length > 0);
            if (words.length === 0) return 'EV';
            if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
            return (words[0][0] + words[1][0]).toUpperCase();
        };
        const initials = getInitials(event.title);
        // Construct the sender address
        const senderEmail = process.env.SENDER_EMAIL || "onboarding@resend.dev";
        const senderName = process.env.SENDER_NAME || "TICKETMASTER";
        const from = `${senderName} <${senderEmail}>`;
        const body = {
            from,
            to: [
                to
            ],
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
            attachments: attachments
        };
        const response = await fetch(RESEND_API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Resend API Error:", errorData);
            throw new Error(`Resend API responded with ${response.status}: ${JSON.stringify(errorData)}`);
        }
        const data = await response.json();
        console.log("Email sent successfully via Resend:", data.id);
        return data;
    } catch (error) {
        console.error("Failed to send email:", error);
        return null;
    }
}
}),
"[project]/app/api/events/[id]/claim-seat/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db-adapter.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pdf$2d$generator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/pdf-generator.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2e$tsx__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/email.tsx [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
;
;
;
;
async function POST(request, { params }) {
    const { id } = await params;
    try {
        const { seatRow, seatNum, email, name } = await request.json();
        const ticketId = `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const existingClaim = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].claimedSeat.findFirst({
            eventId: id,
            seatRow,
            seatNum
        });
        if (existingClaim) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Seat already claimed"
            }, {
                status: 400
            });
        }
        const event = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].event.findUnique({
            id
        });
        if (!event) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Event not found"
            }, {
                status: 404
            });
        }
        const claim = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].claimedSeat.create({
            eventId: id,
            seatRow,
            seatNum,
            email,
            name,
            ticketId
        });
        const seatInfo = `${seatRow}${seatNum}`;
        // Cast event to any to bypass stale type definitions for new fields
        const eventData = event;
        const pdfBuffer = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pdf$2d$generator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateTicketPDF"])(eventData.title, seatInfo, eventData.date, eventData.time, eventData.location, ticketId, name, eventData.artistName || undefined, eventData.section || undefined, seatRow, eventData.ticketType || undefined, eventData.level || undefined);
        const ticketDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), "public", "tickets");
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(ticketDir)) {
            __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].mkdirSync(ticketDir, {
                recursive: true
            });
        }
        const ticketFilePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(ticketDir, `${ticketId}.pdf`);
        __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(ticketFilePath, pdfBuffer);
        // Send email
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2e$tsx__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendTicketEmail"])(email, ticketFilePath, {
                artistName: event.artistName,
                title: event.title,
                date: event.date,
                time: event.time,
                location: event.location,
                image: event.image,
                section: event.section,
                ticketType: event.ticketType,
                level: event.level
            }, `${seatRow}${seatNum}`, ticketId, seatRow, event.section || undefined);
        } catch (error) {
            console.error("Failed to send email (continuing anyway):", error);
        // We don't fail the request if email fails, as the seat is already claimed
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            ticketId: claim.ticketId,
            message: "Seat claimed successfully"
        });
    } catch (error) {
        console.error("Failed to claim seat:", error); // Updated error message
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to claim seat"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__bf1ee302._.js.map