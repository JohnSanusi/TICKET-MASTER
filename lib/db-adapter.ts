import connectDB from "./db"
import { Event, ClaimedSeat } from "./models"

// Helper to convert mongoose doc to object with id
const toObject = (doc: any) => {
  if (!doc) return null
  const obj = doc.toObject ? doc.toObject() : doc
  if (obj._id) {
    obj.id = obj._id.toString()
    delete obj._id
    delete obj.__v
  }
  return JSON.parse(JSON.stringify(obj))
}

export const db = {
  event: {
    create: async (data: any) => {
      await connectDB()
      const event = await Event.create(data)
      return toObject(event)
    },
    findUnique: async (where: { id: string }) => {
      await connectDB()
      const event = await Event.findById(where.id)
      return toObject(event)
    },
    findMany: async (options?: any) => {
      await connectDB()
      const events = await Event.find().sort({ createdAt: -1 })
      return events.map(toObject)
    },
    update: async (params: { where: { id: string }; data: any }) => {
      await connectDB()
      const event = await Event.findByIdAndUpdate(params.where.id, params.data, { new: true })
      return toObject(event)
    },
    delete: async (where: { id: string }) => {
      await connectDB()
      const event = await Event.findByIdAndDelete(where.id)
      return toObject(event)
    },
    findUniqueWithClaims: async (where: { id: string }) => {
      await connectDB()
      const event = await Event.findById(where.id)
      if (!event) return null
      
      const claimedSeats = await ClaimedSeat.find({ eventId: where.id })
      const eventObj = toObject(event)
      eventObj.claimedSeats = claimedSeats.map(toObject)
      return eventObj
    },
    findManyWithClaims: async () => {
      await connectDB()
      const events = await Event.find().sort({ createdAt: -1 })
      const eventsWithClaims = await Promise.all(
        events.map(async (event) => {
          const claimedSeats = await ClaimedSeat.find({ eventId: event._id.toString() })
          const eventObj = toObject(event)
          eventObj.claimedSeats = claimedSeats.map(toObject)
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
      return toObject(claim)
    },
    findFirst: async (where: any) => {
      await connectDB()
      const claim = await ClaimedSeat.findOne(where)
      return toObject(claim)
    },
    delete: async (where: { id: string }) => {
      await connectDB()
      const claim = await ClaimedSeat.findByIdAndDelete(where.id)
      return toObject(claim)
    },
  },
}
