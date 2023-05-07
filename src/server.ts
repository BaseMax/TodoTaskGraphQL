import { ApolloServer } from "@apollo/server";
import { mapError as mapError } from "./errors";
import { createTodo, deleteTodo, updateTodo } from "./mutations";
import { todo, todos } from "./queries";
import typeDefs from "./typeDefs";

export const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      todos: mapError(todos),
      todo: mapError(todo),
    },
    Mutation: {
      createTodo: mapError(createTodo),
      updateTodo: mapError(updateTodo),
      deleteTodo: mapError(deleteTodo),
    },
  },
});
