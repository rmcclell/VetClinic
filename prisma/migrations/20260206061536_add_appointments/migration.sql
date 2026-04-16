-- CreateTable
CREATE TABLE "Appointment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Scheduled',
    "clientId" INTEGER NOT NULL,
    "petId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Appointment_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Appointment_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
