/*
  Warnings:

  - You are about to alter the column `completed` on the `LessonProgress` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `LessonProgress` MODIFY `completed` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Lessons` ADD COLUMN `level` ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED') NULL DEFAULT 'BEGINNER';
