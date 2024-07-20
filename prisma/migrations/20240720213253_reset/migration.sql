/*
  Warnings:

  - You are about to drop the `Roadmap` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RoadmapVote` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `RoadmapVote` DROP FOREIGN KEY `RoadmapVote_roadmapId_fkey`;

-- DropForeignKey
ALTER TABLE `RoadmapVote` DROP FOREIGN KEY `RoadmapVote_userId_fkey`;

-- DropTable
DROP TABLE `Roadmap`;

-- DropTable
DROP TABLE `RoadmapVote`;
