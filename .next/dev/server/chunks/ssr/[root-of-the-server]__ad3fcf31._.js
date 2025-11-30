module.exports = [
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
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[externals]/fs/promises [external] (fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs/promises", () => require("fs/promises"));

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
"[project]/lib/db-adapter.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "db",
    ()=>db
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$2f$default$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@prisma/client/default.js [app-rsc] (ecmascript)");
;
const prismaClientSingleton = ()=>{
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$2f$default$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PrismaClient"]();
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
"[project]/lib/constants.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/app/actions/events.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00d24d28afc19c17b87a20de98d043ab3d7d6347d9":"getAllEvents","401f3521f633135722aa5ed3bf148f0d28b638a84b":"deleteEvent","403021459a8a60094bbed7ee85bae8e65ea27b85ce":"getEventById","4061e8196633ed9f46baa304943579677933a4a4b1":"createEvent","702d90ba3b8981b5b7456d2a668cc7e0b00ede36af":"addTimerToEvent","7c893b2743482298ce690eaa3c27d77a648b2885fb":"claimSeat"},"",""] */ __turbopack_context__.s([
    "addTimerToEvent",
    ()=>addTimerToEvent,
    "claimSeat",
    ()=>claimSeat,
    "createEvent",
    ()=>createEvent,
    "deleteEvent",
    ()=>deleteEvent,
    "getAllEvents",
    ()=>getAllEvents,
    "getEventById",
    ()=>getEventById
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2d$adapter$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db-adapter.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function createEvent(data) {
    try {
        console.log('[Server Action] Creating event with data:', data);
        const seatMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateDefaultSeatMap"])();
        const event = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2d$adapter$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].event.create({
            title: data.title,
            description: data.description,
            location: data.location,
            date: data.date,
            time: data.time,
            image: data.image || null,
            seatMap: JSON.stringify(seatMap),
            hasTimer: data.hasTimer || false,
            eventDate: data.eventDate || null,
            eventTime: data.eventTime || null
        });
        console.log('[Server Action] Event created successfully:', event);
        return event;
    } catch (error) {
        console.error('[Server Action] Error creating event:', error);
        throw error;
    }
}
async function addTimerToEvent(eventId, eventDate, eventTime) {
    const event = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2d$adapter$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].event.update({
        where: {
            id: eventId
        },
        data: {
            eventDate,
            eventTime,
            hasTimer: true
        }
    });
    return event;
}
async function claimSeat(eventId, seatRow, seatNum, email, name) {
    const ticketId = `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const existingClaim = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2d$adapter$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].claimedSeat.findFirst({
        eventId,
        seatRow,
        seatNum
    });
    if (existingClaim) {
        throw new Error("Seat already claimed");
    }
    const claim = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2d$adapter$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].claimedSeat.create({
        eventId,
        seatRow,
        seatNum,
        email,
        name,
        ticketId
    });
    return claim;
}
async function getEventById(eventId) {
    const event = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2d$adapter$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].event.findUniqueWithClaims({
        id: eventId
    });
    return event;
}
async function getAllEvents() {
    const events = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2d$adapter$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].event.findManyWithClaims();
    return events;
}
async function deleteEvent(eventId) {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2d$adapter$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].event.delete({
            where: {
                id: eventId
            }
        });
        return {
            success: true
        };
    } catch (error) {
        console.error("Failed to delete event:", error);
        return {
            success: false,
            error: "Failed to delete event"
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createEvent,
    addTimerToEvent,
    claimSeat,
    getEventById,
    getAllEvents,
    deleteEvent
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createEvent, "4061e8196633ed9f46baa304943579677933a4a4b1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addTimerToEvent, "702d90ba3b8981b5b7456d2a668cc7e0b00ede36af", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(claimSeat, "7c893b2743482298ce690eaa3c27d77a648b2885fb", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getEventById, "403021459a8a60094bbed7ee85bae8e65ea27b85ce", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAllEvents, "00d24d28afc19c17b87a20de98d043ab3d7d6347d9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteEvent, "401f3521f633135722aa5ed3bf148f0d28b638a84b", null);
}),
"[project]/.next-internal/server/app/help/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions/events.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$events$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/events.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
}),
"[project]/.next-internal/server/app/help/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions/events.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00d24d28afc19c17b87a20de98d043ab3d7d6347d9",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$events$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAllEvents"],
    "401f3521f633135722aa5ed3bf148f0d28b638a84b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$events$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteEvent"],
    "403021459a8a60094bbed7ee85bae8e65ea27b85ce",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$events$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEventById"],
    "4061e8196633ed9f46baa304943579677933a4a4b1",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$events$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createEvent"],
    "702d90ba3b8981b5b7456d2a668cc7e0b00ede36af",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$events$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addTimerToEvent"],
    "7c893b2743482298ce690eaa3c27d77a648b2885fb",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$events$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["claimSeat"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$help$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$actions$2f$events$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/help/page/actions.js { ACTIONS_MODULE0 => "[project]/app/actions/events.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$events$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/events.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ad3fcf31._.js.map