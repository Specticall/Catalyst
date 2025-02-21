import z from "zod";
import { RequestValidationError } from "./errors/RequestValidationError";

export function validateSchema<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown
) {
  const validated = schema.safeParse(data);
  if (!validated.success) {
    throw new RequestValidationError(validated.error);
  }
  return validated.data as z.infer<T>;
}
