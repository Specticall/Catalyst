/*
  Warnings:

  - You are about to drop the column `cookies` on the `Request` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "SameSite" AS ENUM ('Strict', 'Lax', 'None');

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "cookies";

-- CreateTable
CREATE TABLE "Cookie" (
    "id" SERIAL NOT NULL,
    "domain" TEXT NOT NULL,
    "path" TEXT NOT NULL DEFAULT '/',
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiration" TIMESTAMP(3),
    "secure" BOOLEAN NOT NULL DEFAULT false,
    "httpOnly" BOOLEAN NOT NULL DEFAULT false,
    "sameSite" "SameSite" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "requestId" TEXT,

    CONSTRAINT "Cookie_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cookie" ADD CONSTRAINT "Cookie_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE SET NULL ON UPDATE CASCADE;
