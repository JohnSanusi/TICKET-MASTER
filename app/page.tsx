import { getAllEvents } from "@/app/actions/events"
import { Navbar } from "@/components/navbar"
import { EventCard } from "@/components/event-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Force dynamic rendering to always show latest events
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const events = await getAllEvents()
  const featuredEvent = events[0]

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Search Section */}
        <section className="bg-blue-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold">Find Tickets</h1>

            {/* Search Bar */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Location */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-900">LOCATION</label>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>📍</span>
                    <input type="text" placeholder="City or Zip Code" className="w-full outline-none bg-transparent" />
                  </div>
                </div>

                {/* Dates */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-900">DATES</label>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>📅</span>
                    <select className="w-full outline-none bg-transparent">
                      <option>All Dates</option>
                    </select>
                  </div>
                </div>

                {/* Search */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-900">SEARCH</label>
                  <input
                    type="text"
                    placeholder="Artist, Event or Venue"
                    className="w-full outline-none bg-transparent text-gray-600"
                  />
                </div>

                {/* Button */}
                <div className="flex items-end">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-base py-6">
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Event */}
        {featuredEvent && (
          <section className="relative h-96 md:h-96 bg-black overflow-hidden">
            <img
              src={featuredEvent.image || "/placeholder.svg?height=400&width=1200&query=event"}
              alt={featuredEvent.title}
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-16 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
              <div className="max-w-2xl space-y-6">
                <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">{featuredEvent.title}</h2>
                <p className="text-xl text-gray-200">{featuredEvent.location}</p>
                <Button asChild className="w-fit bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-6">
                  <Link href={`/event/${featuredEvent.id}`}>Find Tickets</Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Events Grid */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                {events.length === 0 ? "No Events Yet" : "Popular Events"}
              </h2>
              <p className="text-gray-600">Discover amazing events happening near you</p>
            </div>

            {events.length === 0 ? (
              <div className="text-center py-16">
                <div className="space-y-4">
                  <p className="text-lg text-gray-600">No events available yet</p>
                  <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
                    <Link href="/help">Create First Event</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {events.map((event) => (
                  <EventCard
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    date={event.date}
                    time={event.time}
                    location={event.location}
                    image={event.image}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}
