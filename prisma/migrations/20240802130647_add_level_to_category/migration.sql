-- AlterTable
ALTER TABLE `Categories` ADD COLUMN `level` ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED') NULL DEFAULT 'BEGINNER';
