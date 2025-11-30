import connectDB from "./db"
import { Event, ClaimedSeat } from "./models"

export const db = {
  event: {
    create: async (data: any) => {
      await connectDB()
      const event = await Event.create(data)
      return JSON.parse(JSON.stringify(event))
    },
    findUnique: async (where: { id: string }) => {
      await connectDB()
      const event = await Event.findById(where.id)
      return event ? JSON.parse(JSON.stringify(event)) : null
    },
    findMany: async (options?: any) => {
      await connectDB()
      const events = await Event.find().sort({ createdAt: -1 })
      return JSON.parse(JSON.stringify(events))
    },
    update: async (params: { where: { id: string }; data: any }) => {
      await connectDB()
      const event = await Event.findByIdAndUpdate(params.where.id, params.data, { new: true })
      return event ? JSON.parse(JSON.stringify(event)) : null
    },
    delete: async (where: { id: string }) => {
      await connectDB()
      const event = await Event.findByIdAndDelete(where.id)
      return event ? JSON.parse(JSON.stringify(event)) : null
    },
    findUniqueWithClaims: async (where: { id: string }) => {
      await connectDB()
      const event = await Event.findById(where.id)
      if (!event) return null
      
      const claimedSeats = await ClaimedSeat.find({ eventId: where.id })
      const eventObj = JSON.parse(JSON.stringify(event))
      eventObj.claimedSeats = JSON.parse(JSON.stringify(claimedSeats))
      return eventObj
    },
    findManyWithClaims: async () => {
      await connectDB()
      const events = await Event.find().sort({ createdAt: -1 })
      const eventsWithClaims = await Promise.all(
        events.map(async (event) => {
          const claimedSeats = await ClaimedSeat.find({ eventId: event._id.toString() })
          const eventObj = JSON.parse(JSON.stringify(event))
          eventObj.claimedSeats = JSON.parse(JSON.stringify(claimedSeats))
          return eventObj
        })
      )
      return eventsWithClaims
    },
  },
  claimedSeat: {
    create: async (data: any) => {
      await connectDB()
      const claim = await ClaimedSeat.create(data)
      return JSON.parse(JSON.stringify(claim))
    },
    findFirst: async (where: any) => {
      await connectDB()
      const claim = await ClaimedSeat.findOne(where)
      return claim ? JSON.parse(JSON.stringify(claim)) : null
    },
  },
}
