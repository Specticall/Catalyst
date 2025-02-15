/*
  Warnings:

  - You are about to drop the `RequestHeaders` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `headers` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RequestHeaders" DROP CONSTRAINT "RequestHeaders_requestId_fkey";

-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "headers" JSONB NOT NULL;

-- DropTable
DROP TABLE "RequestHeaders";
