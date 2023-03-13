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
