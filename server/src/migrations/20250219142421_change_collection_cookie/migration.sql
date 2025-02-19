/*
  Warnings:

  - You are about to drop the `CollectionCookies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "CollectionCookies";

-- CreateTable
CREATE TABLE "CollectionCookie" (
    "id" SERIAL NOT NULL,
    "domain" TEXT NOT NULL,
    "path" TEXT NOT NULL DEFAULT '/',
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiration" TIMESTAMP(3),
    "maxAge" INTEGER,
    "secure" BOOLEAN NOT NULL DEFAULT false,
    "httpOnly" BOOLEAN NOT NULL DEFAULT false,
    "sameSite" "SameSite",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "collectionId" TEXT NOT NULL,

    CONSTRAINT "CollectionCookie_pkey" PRIMARY KEY ("id")
);
