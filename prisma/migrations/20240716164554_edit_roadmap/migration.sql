/*
  Warnings:

  - The values [TODO,IN_PROGRESS,DONE] on the enum `Roadmap_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Roadmap` ADD COLUMN `priority` ENUM('Low', 'Medium', 'High') NOT NULL DEFAULT 'Low',
    ADD COLUMN `upvotes` INTEGER NOT NULL DEFAULT 0,
    MODIFY `status` ENUM('Todo', 'In_progress', 'Done') NOT NULL;
