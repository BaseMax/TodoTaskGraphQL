import { ApolloServer } from "@apollo/server";
import { createTodo, deleteTodo, updateTodo } from "./mutations";
import { todo, todos } from "./queries";
import typeDefs from "./typeDefs";

export const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      todos: todos,
      todo: todo,
    },
    Mutation: {
      createTodo: createTodo,
      updateTodo: updateTodo,
      deleteTodo: deleteTodo,
    },
  },
});
