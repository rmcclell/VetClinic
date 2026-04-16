/*
  Warnings:

  - You are about to drop the column `petId` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `patientId` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Appointment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Scheduled',
    "clientId" INTEGER NOT NULL,
    "patientId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Appointment_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Appointment" ("clientId", "createdAt", "description", "endTime", "id", "startTime", "status", "updatedAt") SELECT "clientId", "createdAt", "description", "endTime", "id", "startTime", "status", "updatedAt" FROM "Appointment";
DROP TABLE "Appointment";
ALTER TABLE "new_Appointment" RENAME TO "Appointment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
