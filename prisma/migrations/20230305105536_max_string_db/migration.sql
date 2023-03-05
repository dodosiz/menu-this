/*
  Warnings:

  - You are about to alter the column `userId` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `title` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `userId` on the `DeleteRequest` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `title_color` on the `Menu` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `name_color` on the `Menu` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `description_color` on the `Menu` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `title_size` on the `Menu` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `name_size` on the `Menu` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `description_size` on the `Menu` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `title_font` on the `Menu` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `content_font` on the `Menu` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `background_color` on the `Menu` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `template` on the `Menu` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `name` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `description` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `categoryId` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "userId" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "title" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "DeleteRequest" ALTER COLUMN "userId" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "Menu" ALTER COLUMN "title_color" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "name_color" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "description_color" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "title_size" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "name_size" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "description_size" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "title_font" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "content_font" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "background_color" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "template" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "categoryId" SET DATA TYPE VARCHAR(50);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
