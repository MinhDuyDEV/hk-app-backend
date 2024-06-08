/*
  Warnings:

  - You are about to drop the column `forestProductId` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId]` on the table `ForestProduct` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productId` to the `ForestProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_forestProductId_fkey`;

-- AlterTable
ALTER TABLE `ForestProduct` ADD COLUMN `productId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `forestProductId`,
    MODIFY `qrCode` TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ForestProduct_productId_key` ON `ForestProduct`(`productId`);

-- AddForeignKey
ALTER TABLE `ForestProduct` ADD CONSTRAINT `ForestProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
