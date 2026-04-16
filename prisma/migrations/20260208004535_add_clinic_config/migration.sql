-- CreateTable
CREATE TABLE "ClinicConfig" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "name" TEXT NOT NULL DEFAULT 'VetClinic',
    "logoUrl" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "units" TEXT NOT NULL DEFAULT 'metric',
    "dateFormat" TEXT NOT NULL DEFAULT 'MM/dd/yyyy',
    "hoursOfOperation" TEXT,
    "websiteUrl" TEXT,
    "taxRate" REAL NOT NULL DEFAULT 0.0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
