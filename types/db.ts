export interface Event {
  id: string
  title: string
  description: string
  location: string
  date: string
  time: string
  image: string | null
  seatMap: string
  hasTimer: boolean
  eventDate: string | null
  eventTime: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Seat {
  id: string
  eventId: string
  row: string
  seatNum: number
  available: boolean
  createdAt: Date
}

export interface ClaimedSeat {
  id: string
  eventId: string
  seatRow: string
  seatNum: number
  email: string
  name: string
  ticketId: string
  createdAt: Date
}
