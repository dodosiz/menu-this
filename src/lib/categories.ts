import { prisma } from "./prisma";

export async function getCategories(userId: string) {
  const categories = await prisma.category.findMany({
    where: {
      userId,
    },
  });
  return categories;
}
