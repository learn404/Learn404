/*
  Warnings:

  - Made the column `contentLesson` on table `Lessons` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Lessons` MODIFY `contentLesson` LONGTEXT NOT NULL;
