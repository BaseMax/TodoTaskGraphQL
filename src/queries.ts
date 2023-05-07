import prisma from "./prisma";

export async function todos() {
  return await prisma.todo.findMany({});
}
export async function todo(_: any, { id }: { id: string }) {
  return (await prisma.todo.findUnique({ where: { id: id } })) || null;
}
