/*
  Warnings:

  - You are about to drop the column `headers` on the `Request` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Request" DROP COLUMN "headers";

-- CreateTable
CREATE TABLE "RequestHeaders" (
    "id" SERIAL NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "requestId" TEXT,

    CONSTRAINT "RequestHeaders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RequestHeaders" ADD CONSTRAINT "RequestHeaders_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE SET NULL ON UPDATE CASCADE;
