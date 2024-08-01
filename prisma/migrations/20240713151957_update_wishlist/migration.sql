/*
  Warnings:

  - You are about to drop the column `firstName` on the `Waitlist` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Waitlist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Waitlist` DROP COLUMN `firstName`,
    DROP COLUMN `name`;

-- CreateTable
CREATE TABLE `BillingInformations` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `address2` VARCHAR(191) NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NULL,
    `zip` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `BillingInformations_userId_key`(`userId`),
    INDEX `BillingInformations_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BillingInformations` ADD CONSTRAINT `BillingInformations_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
