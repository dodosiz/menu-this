import { getCategories } from "./categories";
import { countProducts } from "./products";

export type CategoryProductCount = {
  [categoryId: string]: { title: string; count: number };
};

export interface UserStatus {
  categoryProductCount: CategoryProductCount;
}

export async function getUserStatus(userId: string): Promise<UserStatus> {
  const categories = await getCategories(userId);
  const categoryProductCount: CategoryProductCount = {};
  for (const c of categories) {
    const productCount = await countProducts(userId, c.id);
    categoryProductCount[c.id] = { title: c.title, count: productCount };
  }
  return { categoryProductCount };
}
