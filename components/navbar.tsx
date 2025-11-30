"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* Top bar */}
      <div className="bg-gray-900 text-white text-xs py-2 px-4 flex justify-between items-center">
        <div>Hotels</div>
        <div className="flex gap-4">
          <button>Gift Cards</button>
          <button>Help</button>
          <button>VIP</button>
        </div>
      </div>

      {/* Main navbar */}
      <div className="bg-primary text-primary-foreground py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold italic">
              Ticketmaster
            </Link>
            <div className="hidden md:flex gap-6 text-sm font-medium">
              <button>Concerts</button>
              <button>Sports</button>
              <button>Arts, Theater & Comedy</button>
              <button>Family</button>
              <button>Cities</button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" className="text-primary-foreground hover:bg-primary/90 text-sm">
              <Link href="/help">Help</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
