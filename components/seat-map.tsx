"use client"

import { useState } from "react"
import { ROWS } from "@/lib/constants"

interface SeatMapProps {
  eventId: string
  claimedSeats: Array<{ seatRow: string; seatNum: number }>
  onSelectSeat: (row: string, seatNum: number) => void
  seatMap?: string
}

export function SeatMap({ eventId, claimedSeats, onSelectSeat, seatMap }: SeatMapProps) {
  const [selectedSeat, setSelectedSeat] = useState<{ row: string; num: number } | null>(null)

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
    const seatKey = `${row}-${seatNum}`
    if (claimedSet.has(seatKey)) {
      alert("This seat is already claimed!")
      return
    }
    setSelectedSeat({ row, num: seatNum })
    onSelectSeat(row, seatNum)
  }

  return (
    <div className="w-full bg-card rounded-lg p-3 md:p-6">
      <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-center">Select Your Seat</h3>

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
                const isSelected = selectedSeat?.row === row && selectedSeat?.num === seatNum

                return (
                  <button
                    key={seatKey}
                    onClick={() => handleSeatClick(row, seatNum)}
                    disabled={isClaimed}
                    className={`w-6 h-6 md:w-8 md:h-8 rounded text-[10px] md:text-xs font-semibold transition-all ${
                      isClaimed
                        ? "bg-gray-400 cursor-not-allowed text-gray-600"
                        : isSelected
                          ? "bg-primary text-primary-foreground shadow-lg scale-105"
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
