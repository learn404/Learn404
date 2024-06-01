/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Admin` DROP FOREIGN KEY `Admin_id_user_fkey`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `Admin` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `Admin`;
