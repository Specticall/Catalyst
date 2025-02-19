/*
  Warnings:

  - You are about to drop the `Cookie` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cookie" DROP CONSTRAINT "Cookie_requestId_fkey";

-- DropTable
DROP TABLE "Cookie";

-- CreateTable
CREATE TABLE "CookieDomain" (
    "id" SERIAL NOT NULL,
    "domain" TEXT NOT NULL,
    "cookies" TEXT[],
    "requestId" TEXT,

    CONSTRAINT "CookieDomain_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CookieDomain" ADD CONSTRAINT "CookieDomain_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE SET NULL ON UPDATE CASCADE;
