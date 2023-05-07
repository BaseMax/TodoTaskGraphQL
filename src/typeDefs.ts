export default `#graphql

type Todo {
  id: ID!
  title: String!
  description: String!
  completed: Boolean!
}

input CreateTodoInput {
  title: String!
  description: String!
}

input UpdateTodoInput {
  id: ID!
  title: String
  description: String
  completed: Boolean
}

type Mutation {
  createTodo(input: CreateTodoInput!): Todo!
  updateTodo(input: UpdateTodoInput!): Todo!
  deleteTodo(id: ID!): ID!
}

type Query {
  todos: [Todo!]!
  todo(id: ID!): Todo
}
`;
