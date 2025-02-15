/*
  Warnings:

  - You are about to drop the column `header` on the `Request` table. All the data in the column will be lost.
  - Added the required column `headers` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Request" DROP COLUMN "header",
ADD COLUMN     "headers" JSONB NOT NULL;
