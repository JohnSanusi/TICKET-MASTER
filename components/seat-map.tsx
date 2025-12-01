"use client"

import { useState } from "react"

interface SeatMapProps {
  eventId: string
  claimedSeats: Array<{ seatRow: string; seatNum: number }>
  onSelectSeat: (seats: Array<{ row: string; num: number }>) => void
  seatMap?: string
}

export function SeatMap({ eventId, claimedSeats, onSelectSeat, seatMap }: SeatMapProps) {
  const [selectedSeats, setSelectedSeats] = useState<Array<{ row: string; num: number }>>([])

  const claimedSet = new Set(claimedSeats.map((s) => `${s.seatRow}-${s.seatNum}`))

  // Parse seatMap to get available seats
  let availableSeats: Array<{ row: string; num: number; available: boolean }> = []
  try {
    availableSeats = seatMap ? JSON.parse(seatMap) : []
  } catch (e) {
    console.error("Failed to parse seatMap", e)
  }

  const handleSeatClick = (row: string, seatNum: number) => {
    // User requested to be able to select claimed seats, so we removed the check
    
    setSelectedSeats(prev => {
      const exists = prev.find(s => s.row === row && s.num === seatNum)
      let newSeats
      if (exists) {
        newSeats = prev.filter(s => s.row !== row || s.num !== seatNum)
      } else {
        newSeats = [...prev, { row, num: seatNum }]
      }
      onSelectSeat(newSeats)
      return newSeats
    })
  }

  return (
    <div className="w-full bg-card rounded-lg p-3 md:p-6">
      <div className="flex justify-between items-center mb-3 md:mb-4">
        <h3 className="text-base md:text-lg font-semibold text-center flex-1">Select Your Seats</h3>
        {selectedSeats.length > 0 && (
          <span className="text-xs md:text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
            {selectedSeats.length} selected
          </span>
        )}
      </div>

      {/* Screen representation */}
      <div className="mb-4 md:mb-8 text-center">
        <div className="inline-block bg-primary text-primary-foreground px-6 md:px-8 py-1.5 md:py-2 rounded text-sm md:text-base font-semibold">SCREEN</div>
      </div>

      {/* Seat grid - all seats in one continuous grid */}
      <div className="flex flex-wrap gap-1 md:gap-2 justify-center max-w-2xl mx-auto">
        {availableSeats.map((seat) => {
          const seatKey = `${seat.row}-${seat.num}`
          const isClaimed = claimedSet.has(seatKey)
          const isSelected = selectedSeats.some(s => s.row === seat.row && s.num === seat.num)

          return (
            <button
              key={seatKey}
              onClick={() => handleSeatClick(seat.row, seat.num)}
              className={`w-10 h-10 md:w-12 md:h-12 rounded text-xs md:text-sm font-semibold transition-all ${
                isSelected
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : isClaimed
                      ? "bg-gray-400 text-gray-600 hover:bg-gray-300"
                      : seat.num === 0
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-border hover:bg-muted cursor-pointer"
              }`}
              title={seat.num === 0 ? "Standing Room" : `Seat ${seat.num}`}
            >
              {seat.num}
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 md:gap-6 justify-center mt-4 md:mt-8 text-xs md:text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Standing (0)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-border rounded"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary rounded"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-400 rounded"></div>
          <span>Claimed</span>
        </div>
      </div>
    </div>
  )
}
