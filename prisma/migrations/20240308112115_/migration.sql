-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `thumbnail` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cuisine` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `detail` TEXT NOT NULL,
    `thumbnail` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Author` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `avatar` VARCHAR(191) NOT NULL,
    `cartId` INTEGER NOT NULL,

    UNIQUE INDEX `Author_email_key`(`email`),
    UNIQUE INDEX `Author_cartId_key`(`cartId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CuisinesOnAuthors` (
    `authorId` INTEGER NOT NULL,
    `cuisineId` INTEGER NOT NULL,

    INDEX `CuisinesOnAuthors_authorId_idx`(`authorId`),
    INDEX `CuisinesOnAuthors_cuisineId_idx`(`cuisineId`),
    PRIMARY KEY (`authorId`, `cuisineId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CuisinesOnCategories` (
    `categoryId` INTEGER NOT NULL,
    `cuisineId` INTEGER NOT NULL,

    INDEX `CuisinesOnCategories_categoryId_idx`(`categoryId`),
    INDEX `CuisinesOnCategories_cuisineId_idx`(`cuisineId`),
    PRIMARY KEY (`categoryId`, `cuisineId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CuisinesOnCarts` (
    `cartId` INTEGER NOT NULL,
    `cuisineId` INTEGER NOT NULL,
    `num` INTEGER NOT NULL,

    INDEX `CuisinesOnCarts_cartId_idx`(`cartId`),
    INDEX `CuisinesOnCarts_cuisineId_idx`(`cuisineId`),
    PRIMARY KEY (`cartId`, `cuisineId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
