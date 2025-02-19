import { ZodObject, ZodRawShape } from "zod";
import { RequestValidationError } from "./errors/RequestValidationError";
import { Request } from "express";

export function validateBody<T extends ZodRawShape>(
  schema: ZodObject<T>,
  request: Request
) {
  const validatedBody = schema.safeParse(request.body);
  if (!validatedBody.success) {
    throw new RequestValidationError(validatedBody.error);
  }
  return validatedBody.data;
}
