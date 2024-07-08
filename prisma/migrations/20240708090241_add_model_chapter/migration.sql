-- CreateTable
CREATE TABLE `LessonChapter` (
    `id` VARCHAR(191) NOT NULL,
    `id_lesson` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `start` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LessonChapter` ADD CONSTRAINT `LessonChapter_id_lesson_fkey` FOREIGN KEY (`id_lesson`) REFERENCES `Lessons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
