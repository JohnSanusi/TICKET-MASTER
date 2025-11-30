import { dbClient } from "./db"
import { events, claimedSeats, seats } from "./schema"
import { eq, desc, and } from "drizzle-orm"

export const db = {
  event: {
    create: async (data: any) => {
      const [result] = await dbClient.insert(events).values(data).returning()
      return result
    },
    findUnique: async (where: { id: string }) => {
      return dbClient.query.events.findFirst({
        where: eq(events.id, where.id),
      })
    },
    findMany: async (options?: any) => {
      // Drizzle doesn't support generic "options" object like Prisma directly
      // We'll implement basic ordering
      return dbClient.query.events.findMany({
        orderBy: [desc(events.createdAt)],
      })
    },
    update: async (params: { where: { id: string }; data: any }) => {
      const [result] = await dbClient
        .update(events)
        .set(params.data)
        .where(eq(events.id, params.where.id))
        .returning()
      return result
    },
    delete: async (where: { id: string }) => {
      const [result] = await dbClient
        .delete(events)
        .where(eq(events.id, where.id))
        .returning()
      return result
    },
    findUniqueWithClaims: async (where: { id: string }) => {
      return dbClient.query.events.findFirst({
        where: eq(events.id, where.id),
        with: {
          claimedSeats: true,
          seats: true, // Also include seats if needed
        },
      })
    },
    findManyWithClaims: async () => {
      return dbClient.query.events.findMany({
        orderBy: [desc(events.createdAt)],
        with: {
          claimedSeats: true,
        },
      })
    },
  },
  claimedSeat: {
    create: async (data: any) => {
      const [result] = await dbClient.insert(claimedSeats).values(data).returning()
      return result
    },
    findFirst: async (where: any) => {
      // Construct where clause dynamically
      const conditions = []
      if (where.eventId) conditions.push(eq(claimedSeats.eventId, where.eventId))
      if (where.seatRow) conditions.push(eq(claimedSeats.seatRow, where.seatRow))
      if (where.seatNum) conditions.push(eq(claimedSeats.seatNum, where.seatNum))
      
      return dbClient.query.claimedSeats.findFirst({
        where: and(...conditions),
      })
    },
  },
}
