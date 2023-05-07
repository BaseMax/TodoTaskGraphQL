import { GraphQLError } from "graphql";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export class BaseError extends Error {}

export class TodoNotFoundError extends BaseError {
  constructor(public id: string) {
    super();
  }
}
// open for extending with new error types and checking against BaseError

export function mapError(fn: any) {
  return async (...args: any[]) => {
    try {
      return await fn(...args);
    } catch (e) {
      if (e instanceof TodoNotFoundError) {
        throw new GraphQLError("todo not found", {
          extensions: { code: "NOT_FOUND", id: e.id },
        });
      } else if (e instanceof ZodError) {
        throw new GraphQLError("validation failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            error: fromZodError(e),
          },
        });
      } else {
        throw e;
      }
    }
  };
}
