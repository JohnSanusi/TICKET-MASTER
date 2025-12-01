export const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]

export function generateDefaultSeatMap(maxTickets: number = 50) {
  const seats = []
  
  // Add seat 0 for standing room
  seats.push({ row: "", num: 0, available: true })
  
  // Add regular numbered seats from 1 to maxTickets
  for (let num = 1; num <= maxTickets; num++) {
    seats.push({ row: "", num, available: true })
  }
  
  return seats
}

