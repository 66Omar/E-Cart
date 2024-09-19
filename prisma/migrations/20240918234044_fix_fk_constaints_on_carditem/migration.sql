/*
  Warnings:

  - A unique constraint covering the columns `[product_id,cart_id]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "CartItem_cart_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_product_id_cart_id_key" ON "CartItem"("product_id", "cart_id");
