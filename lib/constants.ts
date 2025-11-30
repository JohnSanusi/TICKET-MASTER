export const ROWS = ["A", "B", "C", "D", "E"]
export const SEATS_PER_ROW = 10

export function generateDefaultSeatMap() {
  const seats = []
  for (const row of ROWS) {
    for (let num = 1; num <= SEATS_PER_ROW; num++) {
      seats.push({ row, num, available: true })
    }
  }
  return seats
}
