import { prisma } from "@/lib/core/prisma";
import { getMenuDocumentReference, MenuDTO } from "@/lib/data/menu";
import { templateToMenu } from "@/lib/data/template-data";
import { Category } from "@prisma/client";
import { updateDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const data = req.body as UpdateDesignData;
    await updateDesign(data);
    res.status(200).end();
  }
}

// TODO: move in menu.ts once the prisma dependency is removed
export interface UpdateDesignData {
  menu: MenuDTO;
  template: string | null;
  categories: Category[];
}

// TODO: move in menu.ts once the prisma dependency is removed
async function updateDesign(data: UpdateDesignData) {
  const menu = data.template ? templateToMenu[data.template] : {};
  await updateDoc(getMenuDocumentReference(data.menu.userId), {
    ...menu,
    template: data.template,
    brandColor: data.menu.brandColor,
    titleColor: data.menu.titleColor,
    nameColor: data.menu.nameColor,
    descriptionColor: data.menu.descriptionColor,
    backgroundColor: data.menu.backgroundColor,
    brandMargin: data.menu.brandMargin,
    titleMargin: data.menu.titleMargin,
    nameMargin: data.menu.nameMargin,
    nameTitleMargin: data.menu.nameTitleMargin,
    brandSize: data.menu.brandSize,
    titleSize: data.menu.titleSize,
    nameSize: data.menu.nameSize,
    descriptionSize: data.menu.descriptionSize,
    brandFont: data.menu.brandFont,
    titleFont: data.menu.titleFont,
    contentFont: data.menu.contentFont,
  });
  // update background images
  for (const c of data.categories) {
    await prisma.category.update({
      data: {
        background: c.background,
      },
      where: {
        id: c.id,
      },
    });
  }
}
