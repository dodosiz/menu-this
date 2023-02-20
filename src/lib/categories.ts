import {
  CreateCategoryData,
  EditCategoryData,
} from "@/components/categoryForm";
import { prisma } from "./prisma";

export async function getCategories(userId: string) {
  const categories = await prisma.category.findMany({
    where: {
      userId,
    },
  });
  return categories;
}

export async function createCategory(
  data: CreateCategoryData
): Promise<string> {
  const category = await prisma.category.create({
    data: {
      userId: data.userId,
      title: data.title,
    },
  });
  return category.id;
}

export async function updateCategory(data: EditCategoryData) {
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
