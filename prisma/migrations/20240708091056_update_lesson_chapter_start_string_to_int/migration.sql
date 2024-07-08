/*
  Warnings:

  - You are about to alter the column `start` on the `LessonChapter` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `LessonChapter` MODIFY `start` INTEGER NOT NULL;
