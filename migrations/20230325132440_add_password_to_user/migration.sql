/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "wallet" INTEGER NOT NULL,
    "gender" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "meliNumber" TEXT NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "gender", "id", "meliNumber", "name", "updatedAt", "wallet") SELECT "createdAt", "email", "gender", "id", "meliNumber", "name", "updatedAt", "wallet" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_meliNumber_key" ON "User"("meliNumber");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
