-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "brand_color" VARCHAR(50) NOT NULL DEFAULT '#319795',
ADD COLUMN     "brand_font" VARCHAR(50) NOT NULL DEFAULT '''Open Sans'', sans-serif',
ADD COLUMN     "brand_margin" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "brand_size" VARCHAR(50) NOT NULL DEFAULT 'lg';
