'use server'
import prisma from '@/lib/prisma';

export async function loadCount() {
  const rec = await prisma.click.findFirst({
    orderBy: { createdAt: 'desc' },
  });
  return rec?.count ?? 0;
}

export async function incrementCount(newCount: number) {
  await prisma.click.create({
    data: { count: newCount },
  });
  return newCount;
}
