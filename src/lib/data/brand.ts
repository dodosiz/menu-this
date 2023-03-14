import { prisma } from "../core/prisma";

export async function getBrand(userId: string) {
  const brand = await prisma.brand.findFirst({ where: { userId } });
  return brand;
}

export interface CreateBrandData {
  title: string;
  userId: string;
}

export async function createBrand(data: CreateBrandData) {
  const newBrand = await prisma.brand.create({
    data: { title: data.title, userId: data.userId },
  });
  return newBrand;
}

export interface UpdateBrandData {
  brandId: string;
  title: string;
}

export async function updateBrand(data: UpdateBrandData) {
  await prisma.brand.update({
    data: {
      title: data.title,
    },
    where: { id: data.brandId },
  });
}
