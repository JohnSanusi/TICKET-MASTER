-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "image" TEXT,
    "seatMap" TEXT NOT NULL DEFAULT '[]',
    "hasTimer" BOOLEAN NOT NULL DEFAULT false,
    "eventDate" TEXT,
    "eventTime" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Seat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventId" TEXT NOT NULL,
    "row" TEXT NOT NULL,
    "seatNum" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Seat_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE CASCADE
);

-- CreateTable
CREATE TABLE "ClaimedSeat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventId" TEXT NOT NULL,
    "seatRow" TEXT NOT NULL,
    "seatNum" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ClaimedSeat_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Seat_eventId_row_seatNum_key" ON "Seat"("eventId", "row", "seatNum");

-- CreateIndex
CREATE UNIQUE INDEX "ClaimedSeat_ticketId_key" ON "ClaimedSeat"("ticketId");
