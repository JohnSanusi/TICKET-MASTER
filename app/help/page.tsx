import { getAllEvents } from "@/app/actions/events"
import { Navbar } from "@/components/navbar"
import { CreateEventForm } from "@/components/create-event-form"
import { EventCard } from "@/components/event-card"

// Force dynamic rendering to always show latest events
export const dynamic = 'force-dynamic'

export default async function HelpPage() {
  const events = await getAllEvents()

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <section className="bg-blue-50 border-b border-gray-200 py-12">
          <div className="max-w-5xl mx-auto px-4 space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">Admin Portal</h1>
            <p className="text-gray-600">Create and manage your events</p>
          </div>
        </section>

        <div className="py-12">
          <div className="max-w-5xl mx-auto px-4 space-y-12">
            {/* Create Event Form */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                  1
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Create New Event</h2>
              </div>
              <CreateEventForm />
            </div>

            {/* Events List */}
            {events.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                    2
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Your Events ({events.length})</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map((event) => (
                    <EventCard
                      key={event.id}
                      id={event.id}
                      title={event.title}
                      date={event.date}
                      time={event.time}
                      location={event.location}
                      image={event.image}
                      isAdmin
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
