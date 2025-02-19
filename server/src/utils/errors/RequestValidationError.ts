import { ZodError } from "zod";
import { AppError } from "./AppError";
import { STATUS } from "../http/statusCodes";

export class RequestValidationError extends AppError {
  errors: { message: string; field: string | number }[];

  constructor(errors: ZodError) {
    super("Invalid request", STATUS.BAD_REQUEST);

    this.errors = errors.errors.map((error) => {
      return { message: error.message, field: error.path[0] };
    });
  }
}
