/*
  Warnings:

  - Made the column `welcomeEmailSent` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `welcomeEmailSent` BOOLEAN NOT NULL DEFAULT false;
