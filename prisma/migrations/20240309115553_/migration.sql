-- CreateTable
CREATE TABLE `CuisineAttribute` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `typeId` INTEGER NOT NULL,
    `value` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CuisinesOnAttributes` (
    `attrId` INTEGER NOT NULL,
    `cuisineId` INTEGER NOT NULL,

    INDEX `CuisinesOnAttributes_attrId_idx`(`attrId`),
    INDEX `CuisinesOnAttributes_cuisineId_idx`(`cuisineId`),
    PRIMARY KEY (`attrId`, `cuisineId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
