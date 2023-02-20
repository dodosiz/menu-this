import { CreateProductData, UpdateProductData } from "@/components/productForm";
import { prisma } from "./prisma";

export interface CreateProductResult {
  id: string;
  created_at: Date;
}

export async function createProduct(
  data: CreateProductData
): Promise<CreateProductResult> {
  const newProduct = await prisma.product.create({
    data: {
      description: data.description,
      name: data.name,
      price: parseFloat(data.price),
      categoryId: data.categoryId,
    },
  });
  return {
    id: newProduct.id,
    created_at: newProduct.created_at,
  };
}

export async function updateProduct(data: UpdateProductData) {
  await prisma.product.update({
    data: {
      description: data.description,
      name: data.name,
      price: parseFloat(data.price),
    },
    where: {
      id: data.productId,
    },
  });
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
