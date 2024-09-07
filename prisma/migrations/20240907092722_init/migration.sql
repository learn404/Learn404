/*
  Warnings:

  - You are about to drop the column `discount` on the `BillingInformations` table. All the data in the column will be lost.
  - You are about to drop the column `finalPrice` on the `BillingInformations` table. All the data in the column will be lost.
  - You are about to drop the column `promoCode` on the `BillingInformations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Coupon` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Coupon` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Coupon_code_key` ON `Coupon`;

-- AlterTable
ALTER TABLE `BillingInformations` DROP COLUMN `discount`,
    DROP COLUMN `finalPrice`,
    DROP COLUMN `promoCode`;

-- AlterTable
ALTER TABLE `Coupon` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Coupon_userId_key` ON `Coupon`(`userId`);

-- CreateIndex
CREATE INDEX `Coupon_userId_idx` ON `Coupon`(`userId`);

-- AddForeignKey
ALTER TABLE `Coupon` ADD CONSTRAINT `Coupon_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
