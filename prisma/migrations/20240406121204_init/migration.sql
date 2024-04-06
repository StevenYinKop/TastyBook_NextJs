-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "thumbnail" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cuisine" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "thumbnail" TEXT,

    CONSTRAINT "Cuisine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CuisineAttribute" (
    "id" SERIAL NOT NULL,
    "typeId" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "CuisineAttribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CuisinesOnAttributes" (
    "attrId" INTEGER NOT NULL,
    "cuisineId" INTEGER NOT NULL,

    CONSTRAINT "CuisinesOnAttributes_pkey" PRIMARY KEY ("attrId","cuisineId")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "cartId" INTEGER NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CuisinesOnAuthors" (
    "authorId" INTEGER NOT NULL,
    "cuisineId" INTEGER NOT NULL,

    CONSTRAINT "CuisinesOnAuthors_pkey" PRIMARY KEY ("authorId","cuisineId")
);

-- CreateTable
CREATE TABLE "CuisinesOnCategories" (
    "categoryId" INTEGER NOT NULL,
    "cuisineId" INTEGER NOT NULL,

    CONSTRAINT "CuisinesOnCategories_pkey" PRIMARY KEY ("categoryId","cuisineId")
);

-- CreateTable
CREATE TABLE "CuisinesOnCarts" (
    "cartId" INTEGER NOT NULL,
    "cuisineId" INTEGER NOT NULL,
    "num" INTEGER NOT NULL,

    CONSTRAINT "CuisinesOnCarts_pkey" PRIMARY KEY ("cartId","cuisineId")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "cuisineId" INTEGER NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CuisinesOnAttributes_attrId_idx" ON "CuisinesOnAttributes"("attrId");

-- CreateIndex
CREATE INDEX "CuisinesOnAttributes_cuisineId_idx" ON "CuisinesOnAttributes"("cuisineId");

-- CreateIndex
CREATE UNIQUE INDEX "Author_email_key" ON "Author"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Author_cartId_key" ON "Author"("cartId");

-- CreateIndex
CREATE INDEX "CuisinesOnAuthors_authorId_idx" ON "CuisinesOnAuthors"("authorId");

-- CreateIndex
CREATE INDEX "CuisinesOnAuthors_cuisineId_idx" ON "CuisinesOnAuthors"("cuisineId");

-- CreateIndex
CREATE INDEX "CuisinesOnCategories_categoryId_idx" ON "CuisinesOnCategories"("categoryId");

-- CreateIndex
CREATE INDEX "CuisinesOnCategories_cuisineId_idx" ON "CuisinesOnCategories"("cuisineId");

-- CreateIndex
CREATE INDEX "CuisinesOnCarts_cartId_idx" ON "CuisinesOnCarts"("cartId");

-- CreateIndex
CREATE INDEX "CuisinesOnCarts_cuisineId_idx" ON "CuisinesOnCarts"("cuisineId");

-- CreateIndex
CREATE INDEX "Order_cuisineId_idx" ON "Order"("cuisineId");
