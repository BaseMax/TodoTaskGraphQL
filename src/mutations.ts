import { Todo } from "@prisma/client";
import { GraphQLError } from "graphql";
import prisma from "./prisma";

export async function createTodo(
  _: any,
  { input }: { input: any }
): Promise<Todo> {
  const todo = await prisma.todo.create({
    data: {
      completed: false,
      title: input.title,
      description: input.description,
    },
  });
  return todo;
}

export async function updateTodo(
  _: any,
  { input }: { input: any }
): Promise<Todo> {
  const prev = await prisma.todo.findUnique({ where: { id: input.id } });
  if (!prev) {
    throw new GraphQLError("todo not found", {
      extensions: { code: "NOT_FOUND" },
    });
  }
  const result = await prisma.todo.update({
    where: { id: input.id },
    data: {
      ...input,
    },
  });
  return result;
}

export async function deleteTodo(
  _: any,
  { id }: { id: string }
): Promise<string> {
  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo) {
    throw new GraphQLError("todo not found", {
      extensions: { code: "NOT_FOUND" },
    });
  }
  await prisma.todo.delete({ where: { id } });
  return todo.id;
}
