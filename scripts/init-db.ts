import prisma from "../lib/db"
import { generateDefaultSeatMap } from "../lib/constants"

async function main() {
  console.log("Initializing database...")

  // Create a sample event
  const event = await prisma.event.create({
    data: {
      title: "Tech Conference 2025",
      description: "Join us for the biggest tech conference of the year featuring keynotes from industry leaders.",
      location: "San Francisco Convention Center",
      date: "2025-06-15",
      time: "09:00",
      image: "https://images.unsplash.com/photo-1540575467063-178f50902556?w=800&h=600&fit=crop",
      seatMap: JSON.stringify(generateDefaultSeatMap()),
      hasTimer: true,
      eventDate: "2025-06-15",
      eventTime: "09:00",
    },
  })

  console.log("Database initialized! Created sample event:", event.id)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
