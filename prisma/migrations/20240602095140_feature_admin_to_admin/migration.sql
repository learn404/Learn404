/*
  Warnings:

  - You are about to drop the column `Admin` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `Admin`,
    ADD COLUMN `admin` BOOLEAN NOT NULL DEFAULT false;
