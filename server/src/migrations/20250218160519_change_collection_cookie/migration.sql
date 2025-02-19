/*
  Warnings:

  - A unique constraint covering the columns `[domain]` on the table `CollectionCookies` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CollectionCookies_domain_key" ON "CollectionCookies"("domain");
