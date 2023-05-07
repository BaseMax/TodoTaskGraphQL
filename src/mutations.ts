import { Todo } from "@prisma/client";
import prisma from "./prisma";
import * as z from 'zod';
import { TodoNotFoundError } from "./errors";


const titleValidator = z.string().max(100);
const descriptionValidator = z.string().max(500);

const createTodoInputSchema = z.object({
  title: titleValidator,
  description: descriptionValidator.optional(),
});

const updateTodoInputSchema = z.object({
  id: z.string(),
  title: titleValidator.optional(),
  description: descriptionValidator.optional(),
  completed: z.boolean().optional(),
});

type CreateTodoInput = z.TypeOf<typeof createTodoInputSchema>;

type UpdateTodoInput = z.TypeOf<typeof updateTodoInputSchema>;

export async function createTodo(
  _: any,
  { input }: { input: CreateTodoInput }
): Promise<Todo> {
  const validInput = createTodoInputSchema.parse(input);
  const todo = await prisma.todo.create({
    data: {
      completed: false,
      title: validInput.title,
      description: validInput.description,
    },
  });
  return todo;
}

export async function updateTodo(
  _: any,
  { input }: { input: UpdateTodoInput }
): Promise<Todo> {
  const validInput = updateTodoInputSchema.parse(input);
  const prev = await prisma.todo.findUnique({ where: { id: validInput.id } });
  if (!prev) {
    throw new TodoNotFoundError(validInput.id)
  }
  const result = await prisma.todo.update({
    where: { id: validInput.id },
    data: {
      ...validInput,
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
    throw new TodoNotFoundError(id)
  }
  await prisma.todo.delete({ where: { id } });
  return todo.id;
}
