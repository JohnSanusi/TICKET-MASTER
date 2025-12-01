"use client"

import { useState } from "react"
import { ROWS } from "@/lib/constants"

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

  // Group seats by row
  const seatsByRow = availableSeats.reduce((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = []
    }
    acc[seat.row].push(seat.num)
    return acc
  }, {} as Record<string, number[]>)

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

      {/* Seat grid */}
      <div className="flex flex-col gap-1.5 md:gap-3 items-center">
        {ROWS.map((row) => {
          const seatsInRow = seatsByRow[row] || []
          if (seatsInRow.length === 0) return null

          return (
            <div key={row} className="flex gap-1 md:gap-2 items-center">
              {/* Row label removed as per request */}
              <div className="flex gap-0.5 md:gap-1 flex-wrap justify-center">
                {seatsInRow.map((seatNum) => {
                const seatKey = `${row}-${seatNum}`
                const isClaimed = claimedSet.has(seatKey)
                const isSelected = selectedSeats.some(s => s.row === row && s.num === seatNum)

                return (
                  <button
                    key={seatKey}
                    onClick={() => handleSeatClick(row, seatNum)}
                    className={`w-6 h-6 md:w-8 md:h-8 rounded text-[10px] md:text-xs font-semibold transition-all ${
                      isSelected
                          ? "bg-primary text-primary-foreground shadow-lg scale-105"
                          : isClaimed
                            ? "bg-gray-400 text-gray-600 hover:bg-gray-300"
                            : "bg-border hover:bg-muted cursor-pointer"
                    }`}
                    title={`${row}${seatNum}`}
                  >
                    {seatNum}
                  </button>
                )
              })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-3 md:gap-6 justify-center mt-4 md:mt-8 text-xs md:text-sm">
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
