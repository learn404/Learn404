/*
  Warnings:

  - A unique constraint covering the columns `[sort_number]` on the table `Lessons` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Lessons` ADD COLUMN `sort_number` INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX `Lessons_sort_number_key` ON `Lessons`(`sort_number`);
