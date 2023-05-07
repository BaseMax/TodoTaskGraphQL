import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql";
import typeDefs from "./typeDefs";
const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      todos: async () => {
        return await prisma.todo.findMany({});
      },
      todo: async (_, { id }) => {
        return (await prisma.todo.findUnique({ where: { id: id } })) || null;
      },
    },
    Mutation: {
      createTodo: async (_, { input }) => {
        const todo = await prisma.todo.create({
          data: {
            completed: false,
            title: input.title,
            description: input.description,
          },
        });
        return todo;
      },
      updateTodo: async (_, { input }) => {
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
      },
      deleteTodo: async (_, { id }) => {
        const todo = await prisma.todo.findUnique({ where: { id } });
        if (!todo) {
          throw new GraphQLError("todo not found", {
            extensions: { code: "NOT_FOUND" },
          });
        }
        await prisma.todo.delete({ where: { id } });
        return todo.id;
      },
    },
  },
});

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀 Server listening at: ${url}`);
})();
