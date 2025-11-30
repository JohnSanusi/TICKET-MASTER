import mongoose from "mongoose"

const eventSchema = new mongoose.Schema({
  artistName: String,
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  image: String,
  seatMap: { type: String, default: "[]" },
  maxTickets: { type: Number, default: 50 },
  hasTimer: { type: Boolean, default: false },
  eventDate: String,
  eventTime: String,
}, { timestamps: true })

const claimedSeatSchema = new mongoose.Schema({
  eventId: { type: String, required: true },
  seatRow: { type: String, required: true },
  seatNum: { type: Number, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  section: String,
  ticketType: String,
  level: String,
  ticketId: { type: String, required: true, unique: true },
}, { timestamps: true })

export const Event = mongoose.models.Event || mongoose.model("Event", eventSchema)
export const ClaimedSeat = mongoose.models.ClaimedSeat || mongoose.model("ClaimedSeat", claimedSeatSchema)
