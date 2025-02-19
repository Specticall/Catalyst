/*
  Warnings:

  - You are about to drop the column `requestId` on the `CollectionCookies` table. All the data in the column will be lost.
  - Added the required column `collectionId` to the `CollectionCookies` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CollectionCookies" DROP CONSTRAINT "CollectionCookies_requestId_fkey";

-- AlterTable
ALTER TABLE "CollectionCookies" DROP COLUMN "requestId",
ADD COLUMN     "collectionId" TEXT NOT NULL;
