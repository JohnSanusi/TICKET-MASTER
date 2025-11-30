module.exports = [
"[project]/lib/db-adapter.ts [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

```typescript
import { PrismaClient } from "@prisma/client"

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma

export const db = {
  event: {
    create: async (data: any) => {
      return prisma.event.create({ data })
    },
    findUnique: async (where: { id: string }) => {
      return prisma.event.findUnique({ where })
    },
    findMany: async (options?: any) => {
      return prisma.event.findMany({
        orderBy: { createdAt: 'desc' },
        ...options
      })
    },
    update: async (params: { where: { id: string }; data: any }) => {
      return prisma.event.update({
        where: params.where,
        data: params.data,
      })
    },
    findUniqueWithClaims: async (where: { id: string }) => {
      return prisma.event.findUnique({
        where,
        include: { claimedSeats: true },
      })
    },
    findManyWithClaims: async () => {
      return prisma.event.findMany({
        include: { claimedSeats: true },
        orderBy: { createdAt: 'desc' },
      })
    },
  },
  claimedSeat: {
    create: async (data: any) => {
      return prisma.claimedSeat.create({ data })
    },
    findFirst: async (where: any) => {
      return prisma.claimedSeat.findFirst({ where })
    },
  },
}
```;
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

/* __next_internal_action_entry_do_not_use__ [{"00d24d28afc19c17b87a20de98d043ab3d7d6347d9":"getAllEvents","403021459a8a60094bbed7ee85bae8e65ea27b85ce":"getEventById","4061e8196633ed9f46baa304943579677933a4a4b1":"createEvent","702d90ba3b8981b5b7456d2a668cc7e0b00ede36af":"addTimerToEvent","7c893b2743482298ce690eaa3c27d77a648b2885fb":"claimSeat"},"",""] */ __turbopack_context__.s([
    "addTimerToEvent",
    ()=>addTimerToEvent,
    "claimSeat",
    ()=>claimSeat,
    "createEvent",
    ()=>createEvent,
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
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createEvent,
    addTimerToEvent,
    claimSeat,
    getEventById,
    getAllEvents
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createEvent, "4061e8196633ed9f46baa304943579677933a4a4b1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addTimerToEvent, "702d90ba3b8981b5b7456d2a668cc7e0b00ede36af", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(claimSeat, "7c893b2743482298ce690eaa3c27d77a648b2885fb", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getEventById, "403021459a8a60094bbed7ee85bae8e65ea27b85ce", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAllEvents, "00d24d28afc19c17b87a20de98d043ab3d7d6347d9", null);
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions/events.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$events$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/events.ts [app-rsc] (ecmascript)");
;
;
;
;
;
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions/events.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00d24d28afc19c17b87a20de98d043ab3d7d6347d9",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$events$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAllEvents"],
    "403021459a8a60094bbed7ee85bae8e65ea27b85ce",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$events$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getEventById"],
    "4061e8196633ed9f46baa304943579677933a4a4b1",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$events$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createEvent"],
    "702d90ba3b8981b5b7456d2a668cc7e0b00ede36af",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$events$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addTimerToEvent"],
    "7c893b2743482298ce690eaa3c27d77a648b2885fb",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$events$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["claimSeat"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$actions$2f$events$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/app/actions/events.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$events$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/events.ts [app-rsc] (ecmascript)");
}),
"[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint-disable import/no-extraneous-dependencies */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerServerReference", {
    enumerable: true,
    get: function() {
        return _server.registerServerReference;
    }
});
const _server = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)"); //# sourceMappingURL=server-reference.js.map
}),
"[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This function ensures that all the exported values are valid server actions,
// during the runtime. By definition all actions are required to be async
// functions, but here we can only check that they are functions.
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ensureServerEntryExports", {
    enumerable: true,
    get: function() {
        return ensureServerEntryExports;
    }
});
function ensureServerEntryExports(actions) {
    for(let i = 0; i < actions.length; i++){
        const action = actions[i];
        if (typeof action !== 'function') {
            throw Object.defineProperty(new Error(`A "use server" file can only export async functions, found ${typeof action}.\nRead more: https://nextjs.org/docs/messages/invalid-use-server-value`), "__NEXT_ERROR_CODE", {
                value: "E352",
                enumerable: false,
                configurable: true
            });
        }
    }
} //# sourceMappingURL=action-validate.js.map
}),
];

//# sourceMappingURL=_f1de85b7._.js.map