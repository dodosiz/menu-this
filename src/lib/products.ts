import { ProductData } from "@/components/productForm";
import { prisma } from "./prisma";

export async function createProduct(data: ProductData) {
  const newProduct = await prisma.product.create({
    data: {
      description: data.description,
      name: data.name,
      price: parseFloat(data.price),
      categoryId: data.categoryId,
    },
  });
  return newProduct.id;
}

export async function getProductsInCategories(categoryIds: string[]) {
  const products = await prisma.product.findMany({
    where: {
      categoryId: { in: categoryIds },
    },
  });
  return products;
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
}
