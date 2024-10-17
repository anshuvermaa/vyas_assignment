/*
  Warnings:

  - You are about to drop the column `board` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `isWithdrawn` on the `Game` table. All the data in the column will be lost.
  - Added the required column `moves` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "board",
DROP COLUMN "isWithdrawn",
ADD COLUMN     "moves" TEXT NOT NULL;
