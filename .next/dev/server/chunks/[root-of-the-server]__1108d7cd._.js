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
async function generateTicketPDF(eventTitle, seatInfo, eventDateTime, location, ticketId) {
    // Generate QR code
    const qrCodeData = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qrcode$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].toDataURL(ticketId);
    // Create PDF
    const pdf = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$node$2e$min$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsPDF"]({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
    });
    // Set colors
    pdf.setFillColor(25, 118, 210); // Blue background
    pdf.rect(0, 0, 210, 50, "F");
    // Title
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.text(eventTitle, 20, 20);
    pdf.text("EVENT TICKET", 20, 30);
    // Reset text color
    pdf.setTextColor(0, 0, 0);
    // Event details
    pdf.setFontSize(12);
    pdf.text(`Seat: ${seatInfo}`, 20, 60);
    pdf.text(`Date & Time: ${eventDateTime}`, 20, 75);
    pdf.text(`Location: ${location}`, 20, 90);
    pdf.text(`Ticket ID: ${ticketId}`, 20, 105);
    // Add QR code
    pdf.addImage(qrCodeData, "PNG", 130, 60, 50, 50);
    // Footer
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text("Please present this ticket when entering the venue.", 20, 180);
    return Buffer.from(pdf.output("arraybuffer"));
}
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/dns [external] (dns, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("dns", () => require("dns"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[project]/lib/email.tsx [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendTicketEmail",
    ()=>sendTicketEmail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nodemailer$2f$lib$2f$nodemailer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/nodemailer/lib/nodemailer.js [app-route] (ecmascript)");
;
// Create a transporter
// If no SMTP config is present, we'll log to console (mock mode)
const hasSmtpConfig = process.env.SMTP_HOST && process.env.SMTP_USER;
const transporter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nodemailer$2f$lib$2f$nodemailer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].createTransport({
    host: process.env.SMTP_HOST || "localhost",
    port: Number.parseInt(process.env.SMTP_PORT || "1025"),
    secure: process.env.SMTP_SECURE === "true",
    auth: process.env.SMTP_USER && process.env.SMTP_PASSWORD ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    } : undefined
});
async function sendTicketEmail(to, ticketPath, eventTitle, seatInfo) {
    console.log(`Attempting to send email to ${to} for event ${eventTitle}`);
    if (!hasSmtpConfig) {
        console.warn("⚠️ No SMTP configuration found. Email sending is mocked.");
        console.log(`
      [MOCK EMAIL]
      To: ${to}
      Subject: Your Ticket for ${eventTitle}
      Seat: ${seatInfo}
      Ticket Path: ${ticketPath}
    `);
        return {
            accepted: [
                to
            ],
            messageId: "mock-id"
        };
    }
    try {
        const result = await transporter.sendMail({
            from: process.env.EMAIL_FROM || '"EventHub" <noreply@eventhub.com>',
            to,
            subject: `Your Ticket for ${eventTitle}`,
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #026cdf;">Your Ticket for ${eventTitle}</h1>
          <p>Thank you for claiming your seat!</p>
          <div style="background: #f4f4f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-size: 18px;"><strong>Seat:</strong> ${seatInfo}</p>
          </div>
          <p>Your ticket PDF is attached to this email.</p>
          <p>Please present this ticket when entering the venue.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="color: #888; font-size: 12px;">EventHub Inc.</p>
        </div>
      `,
            attachments: [
                {
                    filename: `ticket-${eventTitle.replace(/\s+/g, "-").toLowerCase()}.pdf`,
                    path: ticketPath
                }
            ]
        });
        console.log("Email sent successfully:", result.messageId);
        return result;
    } catch (error) {
        console.error("Failed to send email:", error);
        // We re-throw so the caller knows it failed, or we could return false
        // For now, let's throw so the UI can show an error if needed, 
        // but often we might want to swallow this if the ticket was claimed successfully.
        // Let's log and return null to indicate failure but not crash the request
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
        const eventDateTime = `${event.date} at ${event.time}`;
        const seatInfo = `${seatRow}${seatNum}`;
        const pdfBuffer = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pdf$2d$generator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateTicketPDF"])(event.title, seatInfo, eventDateTime, event.location, ticketId);
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
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2e$tsx__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendTicketEmail"])(email, ticketFilePath, event.title, `${seatRow}${seatNum}`); // Used ticketFilePath instead of ticketPath
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

//# sourceMappingURL=%5Broot-of-the-server%5D__1108d7cd._.js.map