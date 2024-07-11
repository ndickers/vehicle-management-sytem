import { Context } from "hono";
import type { ZodError } from "zod";

type TResult<T> =
  | { success: true; data: T }
  | { success: false; error: ZodError; data: T };

export function validateInput<T>(result: TResult<T>, c: Context) {
  if (!result.success) {
    let message = "";

    result?.error.issues.forEach((input) => {
      message += `Input of ${input.path[0]} ${input.message.toLowerCase()}. `;
    });
    return c.json({ error: message }, 404);
  }
}
