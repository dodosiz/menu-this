import { prisma } from "../core/prisma";

export async function getCategories(userId: string) {
  const categories = await prisma.category.findMany({
    where: {
      userId,
    },
  });
  return categories.sort(
    (c1, c2) => Date.parse(`${c1.created_at}`) - Date.parse(`${c2.created_at}`)
  );
}

export interface CreateCategoryResult {
  id: string;
  created_at: Date;
}

export interface CreateCategoryData {
  userId: string;
  title: string;
}

export async function createCategory(
  data: CreateCategoryData
): Promise<CreateCategoryResult> {
  const category = await prisma.category.create({
    data: {
      userId: data.userId,
      title: data.title,
    },
  });
  return { id: category.id, created_at: category.created_at };
}

export interface UpdateCategoryData {
  categoryId: string;
  title: string;
}

export async function updateCategory(data: UpdateCategoryData) {
  await prisma.category.update({
    data: {
      title: data.title,
    },
    where: { id: data.categoryId },
  });
}

export async function deleteCategory(id: string) {
  await prisma.product.deleteMany({ where: { categoryId: id } });
  await prisma.category.delete({ where: { id } });
}

export interface SwapData {
  id1: string;
  id2: string;
}

export async function swap(data: SwapData) {
  const category1 = await prisma.category.findFirstOrThrow({
    where: { id: data.id1 },
  });
  const category2 = await prisma.category.findFirstOrThrow({
    where: { id: data.id2 },
  });
  await prisma.category.update({
    data: {
      created_at: category2.created_at,
    },
    where: { id: data.id1 },
  });
  await prisma.category.update({
    data: {
      created_at: category1.created_at,
    },
    where: { id: data.id2 },
  });
}
