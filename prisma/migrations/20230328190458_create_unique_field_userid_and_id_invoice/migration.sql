/*
  Warnings:

  - A unique constraint covering the columns `[userId,id]` on the table `invoices` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "invoices_userId_id_idx";

-- CreateIndex
CREATE UNIQUE INDEX "invoices_userId_id_key" ON "invoices"("userId", "id");
