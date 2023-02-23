-- CreateTable
CREATE TABLE "Menu" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title_color" TEXT NOT NULL,
    "name_color" TEXT NOT NULL,
    "description_color" TEXT NOT NULL,
    "title_margin" INTEGER NOT NULL,
    "name_margin" INTEGER NOT NULL,
    "name_title_margin" INTEGER NOT NULL,
    "title_size" TEXT NOT NULL,
    "name_size" TEXT NOT NULL,
    "description_size" TEXT NOT NULL,
    "title_font" TEXT NOT NULL,
    "content_font" TEXT NOT NULL,
    "background_color" TEXT NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);
