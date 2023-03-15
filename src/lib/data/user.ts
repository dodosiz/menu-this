import { prisma } from "../core/prisma";

export type CategoryProductCount = {
  [categoryId: string]: { title: string; count: number };
};

export interface UserStatus {
  categoryProductCount: CategoryProductCount;
}

export async function getUserStatus(userId: string): Promise<UserStatus> {
  const categories = await prisma.category.findMany({ where: { userId } });
  const categoryProductCount: CategoryProductCount = {};
  for (const c of categories) {
    const productCount = await prisma.product.count({
      where: { categoryId: c.id },
    });
    categoryProductCount[c.id] = { title: c.title, count: productCount };
  }
  return { categoryProductCount };
}
