/*
  Warnings:

  - A unique constraint covering the columns `[ticketId]` on the table `RefreshToken` will be added. If there are existing duplicate values, this will fail.
  - Made the column `ticketId` on table `RefreshToken` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_ticketId_fkey";

-- AlterTable
ALTER TABLE "RefreshToken" ALTER COLUMN "ticketId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_ticketId_key" ON "RefreshToken"("ticketId");

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
