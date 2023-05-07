import prisma from "./prisma";
import { server } from "./server";
beforeAll(async () => {
  await prisma.todo.deleteMany();
});
it("should return some todos", async () => {
  await prisma.todo.create({
    data: { title: "Hello", description: "test", completed: false },
  });
  await prisma.todo.create({
    data: { title: "Hello 2", description: "test", completed: false },
  });
  const { body }: any = await server.executeOperation({
    query: `query ExampleQuery {
              todos {
                id
                title
                description
                completed
              }
            }`,
  });
  const results = body.singleResult.data.todos;
  expect(results).toEqual([
    {
      id: expect.any(String),
      title: "Hello",
      completed: false,
      description: "test",
    },
    {
      id: expect.any(String),
      title: "Hello 2",
      completed: false,
      description: "test",
    },
  ]);
});
it("should update an existing todo", async () => {
  const existingTodo = await prisma.todo.create({
    data: { title: "Existing Todo", description: "test", completed: false },
  });

  const { body }: any = await server.executeOperation({
    query: `mutation UpdateTodoMutation($updateTodoInput: UpdateTodoInput!) {
              updateTodo(input: $updateTodoInput) {
                id
                title
                description
                completed
              }
            }`,
    variables: {
      updateTodoInput: {
        id: existingTodo.id,
        title: "Updated Todo",
        description: "test",
        completed: false,
      },
    },
  });

  const updatedTodo = body.singleResult.data.updateTodo;
  expect(updatedTodo.id).toEqual(existingTodo.id);
  expect(updatedTodo.title).toEqual("Updated Todo");
  expect(updatedTodo.description).toEqual("test");
  expect(updatedTodo.completed).toEqual(false);
});

it("should delete an existing todo", async () => {
  const existingTodo = await prisma.todo.create({
    data: { title: "Existing Todo", description: "test", completed: false },
  });

  const { body }: any = await server.executeOperation({
    query: `mutation DeleteTodoMutation($id: ID!) {
              deleteTodo(id: $id)
            }`,
    variables: {
      id: existingTodo.id,
    },
  });

  const deletedTodoId = body.singleResult.data.deleteTodo;
  expect(deletedTodoId).toEqual(existingTodo.id);

  const deletedTodo = await prisma.todo.findUnique({
    where: { id: existingTodo.id },
  });
  expect(deletedTodo).toBeNull();
});

it("should return a single todo", async () => {
  const existingTodo = await prisma.todo.create({
    data: { title: "Existing Todo", description: "test", completed: false },
  });

  const { body }: any = await server.executeOperation({
    query: `query TodoQuery($id: ID!) {
              todo(id: $id) {
                id
                title
                description
                completed
              }
            }`,
    variables: {
      id: existingTodo.id,
    },
  });

  const queriedTodo = body.singleResult.data.todo;
  expect(queriedTodo.id).toEqual(existingTodo.id);
  expect(queriedTodo.title).toEqual("Existing Todo");
  expect(queriedTodo.description).toEqual("test");
  expect(queriedTodo.completed).toEqual(false);
});

it("should throw an error when creating a todo with a long title", async () => {
  const { body }: any = await server.executeOperation({
    query: `mutation CreateTodoMutation($createTodoInput: CreateTodoInput!) {
              createTodo(input: $createTodoInput) {
                id
                title
                description
                completed
              }
            }`,
    variables: {
      createTodoInput: {
        title:
          "This is a very long title that exceeds the maximum length of 100 characters and should cause the create mutation to fail",
        description: "test",
        completed: false,
      },
    },
  });
  expect(body.singleResult.errors[0].extensions.code).toBe("BAD_USER_INPUT");
  expect(body.singleResult.errors).toHaveLength(1);
});

it("should throw an error when creating a todo with a long description", async () => {
  const { body }: any = await server.executeOperation({
    query: `mutation CreateTodoMutation($createTodoInput: CreateTodoInput!) {
              createTodo(input: $createTodoInput) {
                id
                title
                description
                completed
              }
            }`,
    variables: {
      createTodoInput: {
        title: "Test Todo",
        description:
          "This is a very long description that exceeds the maximum length of 500 characters and should cause the create mutation to fail. ".repeat(
            100
          ),
        completed: false,
      },
    },
  });

  expect(body.singleResult.errors[0].extensions.code).toBe("BAD_USER_INPUT");
  expect(body.singleResult.errors).toHaveLength(1);
});

it("should throw an error when updating a todo with a long title", async () => {
  const existingTodo = await prisma.todo.create({
    data: { title: "Existing Todo", description: "test", completed: false },
  });

  const { body }: any = await server.executeOperation({
    query: `mutation UpdateTodoMutation($updateTodoInput: UpdateTodoInput!) {
              updateTodo(input: $updateTodoInput) {
                id
                title
                description
                completed
              }
            }`,
    variables: {
      updateTodoInput: {
        id: existingTodo.id,
        title:
          "This is a very long title that exceeds the maximum length of 100 characters and should cause the update mutation to fail",
        description: "test",
        completed: false,
      },
    },
  });

  expect(body.singleResult.errors[0].extensions.code).toBe("BAD_USER_INPUT");
  expect(body.singleResult.errors).toHaveLength(1);
});

it("should throw an error when updating a todo with a long description", async () => {
  const existingTodo = await prisma.todo.create({
    data: { title: "Existing Todo", description: "test", completed: false },
  });

  const { body }: any = await server.executeOperation({
    query: `mutation UpdateTodoMutation($updateTodoInput: UpdateTodoInput!) {
              updateTodo(input: $updateTodoInput) {
                id
                title
                description
                completed
              }
            }`,
    variables: {
      updateTodoInput: {
        id: existingTodo.id,
        title: "Test Todo",
        description:
          "This is a very long description that exceeds the maximum length of 500 characters and should cause the update mutation to fail. ".repeat(
            100
          ),
        completed: false,
      },
    },
  });

  expect(body.singleResult.errors[0].extensions.code).toBe("BAD_USER_INPUT");
  expect(body.singleResult.errors).toHaveLength(1);
});

it("should return an error when attempting to delete a non-existent todo", async () => {
  const nonExistentId = "non-existent-id";

  const { body }: any = await server.executeOperation({
    query: `mutation DeleteTodoMutation($id: ID!) {
              deleteTodo(id: $id)
            }`,
    variables: {
      id: nonExistentId,
    },
  });

  expect(body.singleResult.errors[0].extensions.code).toBe("NOT_FOUND");
});

it("should return an error when attempting to update a non-existent todo", async () => {
  const nonExistentId = "non-existent-id";

  const { body }: any = await server.executeOperation({
    query: `mutation UpdateTodoMutation($updateTodoInput: UpdateTodoInput!) {
              updateTodo(input: $updateTodoInput) {title}
            }`,
    variables: {
      updateTodoInput: {
        id: nonExistentId,
        title: "Updated Todo",
        description: "test",
        completed: true,
      },
    },
  });

  expect(body.singleResult.errors[0].extensions.code).toBe("NOT_FOUND");
});
