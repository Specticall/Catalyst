/*
  Warnings:

  - You are about to drop the `CookieDomain` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CookieDomain" DROP CONSTRAINT "CookieDomain_requestId_fkey";

-- DropTable
DROP TABLE "CookieDomain";

-- CreateTable
CREATE TABLE "CollectionCookies" (
    "id" SERIAL NOT NULL,
    "domain" TEXT NOT NULL,
    "cookies" TEXT[],
    "requestId" TEXT,

    CONSTRAINT "CollectionCookies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CollectionCookies" ADD CONSTRAINT "CollectionCookies_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE SET NULL ON UPDATE CASCADE;
