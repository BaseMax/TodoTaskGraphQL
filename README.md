# Todo Task Project using GraphQL

<<<<<<< HEAD

## Overview

# This project is a Todo task manager that uses GraphQL instead of JSON for its data structure. The project allows users to create, read, update and delete tasks using the GraphQL API.

This project is a Todo task manager that uses GraphQL instead of JSON for its data structure. The project allows users to create, read, update and delete tasks using the GraphQL API.

> > > > > > > 7f33eff05f25afaa97e992b3d08ad2e8d635dd19

## Requirements

To complete this project, you will need the following tools and technologies:

- Node.js
- TypeScript
- GraphQL
- Sqlite

## Overview

The assignment for this project is to create a backend API that allows users to manage their Todo tasks using GraphQL. The API should be able to handle the following requests:

- Create a new Todo task
- Retrieve a list of Todo tasks
- Retrieve a single Todo task by ID
- Update an existing Todo task
- Delete an existing Todo task

The data for the Todo tasks should be stored in a Sqlite or any other database of your choice. You should also create a set of tests to ensure that the API is functioning correctly.

## Getting Started

To get started with the project, follow these steps:

- Clone the repository to your local machine.
- Install the required dependencies by running npm install.
- Start the development server by running npm run start:dev.
- GraphQL Schema

The GraphQL schema for this project should include the following types:

- Todo: This type represents a single Todo task with the following fields:
  - id: The unique identifier for the Todo task.
  - title: The title of the Todo task.
  - description: The description of the Todo task.
  - completed: A boolean value indicating whether or not the Todo task is completed.
- CreateTodoInput: This input type represents the data needed to create a new Todo task with the following fields:
  - title: The title of the Todo task.
  - description: The description of the Todo task.
- UpdateTodoInput: This input type represents the data needed to update an existing Todo task with the following fields:
  - id: The unique identifier for the Todo task.
  - title: The new title of the Todo task.
  - description: The new description of the Todo task.
  - completed: The new completed status of the Todo task.

The GraphQL schema should include the following mutations:

- createTodo: This mutation creates a new Todo task with the provided data.
- updateTodo: This mutation updates an existing Todo task with the provided data.
- deleteTodo: This mutation deletes an existing Todo task with the provided ID.

The GraphQL schema should include the following queries:

- todos: This query returns a list of all Todo tasks.
- todo: This query returns a single Todo task with the provided ID.

## Scripts

you can run the following scripts using

```sh
npm run <script-name>
```

| name        | description                            | script under the hood                                              |
| ----------- | -------------------------------------- | ------------------------------------------------------------------ |
| test        | run tests                              | `jest `                                                            |
| test:cov    | run tests with coverage                | `jest --coverage `                                                 |
| build       | compile typescript                     | `tsc `                                                             |
| lint        | run linter                             | `eslint . `                                                        |
| format      | format code                            | `prettier . --write `                                              |
| fmt         | alias for format                       | `npm run format `                                                  |
| lint-fmt    | lint and foramt at the same time       | `npm run lint && npm run fmt `                                     |
| build:watch | build and watch for cahnges            | `tsc --watch `                                                     |
| start       | start (useful for servers)             | `node dist/index.js --enable-source-maps `                         |
| start:dev   | start in development mode (watch mode) | `concurrently \"nodemon dist/index.js\" \"npm run build:watch\"" ` |
| prepare     | husky prepare                          | `husky install `                                                   |

## Demo

![Todo Task Project using GraphQL](https://user-images.githubusercontent.com/2658040/236685299-178fa7dd-620e-4501-a864-07415a48dc99.png)

## Testing

To run the tests for the project, run the following command:

```
npm run test
```

## Conclusion

That's it! You should now have everything you need to get started with the Todo task project using GraphQL. If you have any questions, feel free to reach out to us.

## Authors

- Ehsan
- Max Base

Copyright 2023, Max Base
