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
"[project]/lib/db-adapter.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// This will work without Prisma client generation in preview environments
__turbopack_context__.s([
    "db",
    ()=>db
]);
const events = [];
const seats = [];
const claimedSeats = [];
const db = {
    event: {
        create: async (data)=>{
            const id = `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            const event = {
                id,
                ...data,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            events.push(event);
            return event;
        },
        findUnique: async (where)=>{
            return events.find((e)=>e.id === where.id) || null;
        },
        findMany: async (options)=>{
            return events.sort((a, b)=>b.createdAt.getTime() - a.createdAt.getTime());
        },
        update: async (data)=>{
            const event = events.find((e)=>e.id === data.where.id);
            if (!event) throw new Error("Event not found");
            Object.assign(event, data.data, {
                updatedAt: new Date()
            });
            return event;
        },
        findUniqueWithClaims: async (where)=>{
            const event = events.find((e)=>e.id === where.id);
            if (!event) return null;
            const eventClaims = claimedSeats.filter((c)=>c.eventId === where.id);
            return {
                ...event,
                claimedSeats: eventClaims
            };
        },
        findManyWithClaims: async ()=>{
            return events.map((event)=>{
                const eventClaims = claimedSeats.filter((c)=>c.eventId === event.id);
                return {
                    ...event,
                    claimedSeats: eventClaims
                };
            });
        }
    },
    claimedSeat: {
        create: async (data)=>{
            const id = `seat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            const claim = {
                id,
                ...data,
                createdAt: new Date()
            };
            claimedSeats.push(claim);
            return claim;
        },
        findFirst: async (where)=>{
            return claimedSeats.find((s)=>s.eventId === where.eventId && s.seatRow === where.seatRow && s.seatNum === where.seatNum) || null;
        }
    }
};
}),
"[project]/lib/constants.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ROWS",
    ()=>ROWS,
    "SEATS_PER_ROW",
    ()=>SEATS_PER_ROW,
    "generateDefaultSeatMap",
    ()=>generateDefaultSeatMap
]);
const ROWS = [
    "A",
    "B",
    "C",
    "D",
    "E"
];
const SEATS_PER_ROW = 10;
function generateDefaultSeatMap() {
    const seats = [];
    for (const row of ROWS){
        for(let num = 1; num <= SEATS_PER_ROW; num++){
            seats.push({
                row,
                num,
                available: true
            });
        }
    }
    return seats;
}
}),
"[project]/app/api/events/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db-adapter.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants.ts [app-route] (ecmascript)");
;
;
;
async function GET() {
    try {
        const events = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].event.findManyWithClaims();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to fetch events"
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const data = await request.json();
        const seatMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateDefaultSeatMap"])();
        const event = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].event.create({
            title: data.title,
            description: data.description,
            location: data.location,
            date: data.date,
            time: data.time,
            image: data.image || null,
            seatMap: JSON.stringify(seatMap),
            hasTimer: false,
            eventDate: null,
            eventTime: null
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(event, {
            status: 201
        });
    } catch (error) {
        console.error("Error creating event:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to create event"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e18b1fd6._.js.map