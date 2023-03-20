import { deleteBrand } from "./brand";
import { deleteCategory, getCategories } from "./categories";
import { deleteMenu } from "./menu";
import { countProducts, deleteProduct, getProducts } from "./products";

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

export async function deleteUserData(userId: string) {
  const products = await getProducts(userId);
  const categories = await getCategories(userId);
  for (const p of products) {
    await deleteProduct({ userId, productId: p.id });
  }
  for (const c of categories) {
    await deleteCategory({ userId, categoryId: c.id });
  }
  await deleteMenu(userId);
  await deleteBrand(userId);
}
