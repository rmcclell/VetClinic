-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "secondaryPhone" TEXT,
    "address" TEXT,
    "emergencyContactName" TEXT,
    "emergencyContactPhone" TEXT,
    "notes" TEXT,
    "dob" DATETIME,
    "gender" TEXT,
    "driverLicenseState" TEXT,
    "driverLicenseNumber" TEXT,
    "driverLicenseExp" TEXT,
    "clientType" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Client" ("address", "createdAt", "email", "emergencyContactName", "emergencyContactPhone", "firstName", "id", "lastName", "notes", "phone", "secondaryPhone", "updatedAt") SELECT "address", "createdAt", "email", "emergencyContactName", "emergencyContactPhone", "firstName", "id", "lastName", "notes", "phone", "secondaryPhone", "updatedAt" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
