import { PRODUCT_LIMIT } from "@/constants";
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
  const productCount = await prisma.product.count({
    where: {
      categoryId: data.categoryId,
    },
  });
  if (productCount >= PRODUCT_LIMIT) {
    throw new Error("Max limit reached");
  }
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
  return products.sort(
    (p1, p2) => Date.parse(`${p1.created_at}`) - Date.parse(`${p2.created_at}`)
  );
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
}

export interface SwapData {
  id1: string;
  id2: string;
}

export async function swap(data: SwapData) {
  const product1 = await prisma.product.findFirstOrThrow({
    where: { id: data.id1 },
  });
  const product2 = await prisma.product.findFirstOrThrow({
    where: { id: data.id2 },
  });
  await prisma.product.update({
    data: {
      created_at: product2.created_at,
    },
    where: { id: data.id1 },
  });
  await prisma.product.update({
    data: {
      created_at: product1.created_at,
    },
    where: { id: data.id2 },
  });
}
