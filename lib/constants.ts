export const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]

export function generateDefaultSeatMap(maxTickets: number = 50) {
  const seats = []
  const seatsPerRow = Math.ceil(maxTickets / ROWS.length)
  let remainingSeats = maxTickets
  
  for (const row of ROWS) {
    if (remainingSeats <= 0) break
    
    // Add seat 0 for standing tickets
    seats.push({ row, num: 0, available: true })
    
    const seatsInThisRow = Math.min(seatsPerRow, remainingSeats)
    for (let num = 1; num <= seatsInThisRow; num++) {
      seats.push({ row, num, available: true })
    }
    remainingSeats -= seatsInThisRow
  }
  
  return seats
}
