export const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]

export function generateDefaultSeatMap(maxTickets: number = 50) {
  const seats = []
  const MAX_SEATS_PER_ROW = 12
  let remainingSeats = maxTickets
  
  for (const row of ROWS) {
    if (remainingSeats <= 0) break
    
    const seatsInThisRow = Math.min(MAX_SEATS_PER_ROW, remainingSeats)
    for (let num = 1; num <= seatsInThisRow; num++) {
      seats.push({ row, num, available: true })
    }
    remainingSeats -= seatsInThisRow
  }
  
  return seats
}
