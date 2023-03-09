import { prisma } from "../core/prisma";

export async function requestDeletion(userId: string) {
  const existingRequest = await prisma.deleteRequest.findFirst({
    where: { userId },
  });
  if (!existingRequest) {
    await prisma.deleteRequest.create({
      data: {
        userId,
      },
    });
  }
}

export async function cancelDeletion(userId: string) {
  await prisma.deleteRequest.deleteMany({ where: { userId } });
}

export type CategoryProductCount = {
  [categoryId: string]: { title: string; count: number };
};

export interface UserStatus {
  requested: boolean;
  categoryProductCount: CategoryProductCount;
}

export async function getUserStatus(userId: string): Promise<UserStatus> {
  const existingRequest = await prisma.deleteRequest.findFirst({
    where: { userId },
  });
  const categories = await prisma.category.findMany({ where: { userId } });
  const categoryProductCount: CategoryProductCount = {};
  for (const c of categories) {
    const productCount = await prisma.product.count({
      where: { categoryId: c.id },
    });
    categoryProductCount[c.id] = { title: c.title, count: productCount };
  }
  return { requested: !!existingRequest, categoryProductCount };
}
