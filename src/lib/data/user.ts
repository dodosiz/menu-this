import { prisma } from "../core/prisma";

export async function requestDeletion(userId: string) {
  const existingRequest = await prisma.deleteRequest.findFirst({
    where: { userId },
  });
  if (!existingRequest) {
    await prisma.deleteRequest.create({
      data: {
        userId,
      },
    });
  }
}

export async function cancelDeletion(userId: string) {
  await prisma.deleteRequest.deleteMany({ where: { userId } });
}

export interface UserStatus {
  requested: boolean;
}

export async function getUserStatus(userId: string): Promise<UserStatus> {
  const existingRequest = await prisma.deleteRequest.findFirst({
    where: { userId },
  });
  return { requested: !!existingRequest };
}
