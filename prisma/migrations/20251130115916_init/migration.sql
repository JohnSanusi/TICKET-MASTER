-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ClaimedSeat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventId" TEXT NOT NULL,
    "seatRow" TEXT NOT NULL,
    "seatNum" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ClaimedSeat_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ClaimedSeat" ("createdAt", "email", "eventId", "id", "name", "seatNum", "seatRow", "ticketId") SELECT "createdAt", "email", "eventId", "id", "name", "seatNum", "seatRow", "ticketId" FROM "ClaimedSeat";
DROP TABLE "ClaimedSeat";
ALTER TABLE "new_ClaimedSeat" RENAME TO "ClaimedSeat";
CREATE UNIQUE INDEX "ClaimedSeat_ticketId_key" ON "ClaimedSeat"("ticketId");
CREATE TABLE "new_Seat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventId" TEXT NOT NULL,
    "row" TEXT NOT NULL,
    "seatNum" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Seat_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Seat" ("available", "createdAt", "eventId", "id", "row", "seatNum") SELECT "available", "createdAt", "eventId", "id", "row", "seatNum" FROM "Seat";
DROP TABLE "Seat";
ALTER TABLE "new_Seat" RENAME TO "Seat";
CREATE UNIQUE INDEX "Seat_eventId_row_seatNum_key" ON "Seat"("eventId", "row", "seatNum");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
