/*
  Warnings:

  - Changed the type of `expireTime` on the `RefreshToken` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "RefreshToken" DROP COLUMN "expireTime",
ADD COLUMN     "expireTime" TIMESTAMP(3) NOT NULL;
