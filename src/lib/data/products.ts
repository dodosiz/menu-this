import { prisma } from "../core/prisma";

export interface CreateProductResult {
  id: string;
  created_at: Date;
}

export interface CreateProductData {
  name: string;
  price: string;
  description: string;
  categoryId: string;
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

export interface UpdateProductData {
  name: string;
  price: string;
  description: string;
  productId: string;
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
