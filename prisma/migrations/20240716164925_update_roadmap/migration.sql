/*
  Warnings:

  - The values [Todo,In_progress,Done] on the enum `Roadmap_status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `priority` on the `Roadmap` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `Roadmap` MODIFY `status` ENUM('TODO', 'IN_PROGRESS', 'DONE') NOT NULL,
    MODIFY `priority` ENUM('LOW', 'MEDIUM', 'HIGH') NOT NULL DEFAULT 'LOW';
