/**
 * Wrapper class over the error class to accomodate for API needs.
 * @example throw new AppError("Couldn't find user", STATUS.NOT_FOUND)
 */
export class AppError extends Error {
  statusCode: number;
  status: "fail" | "success";
  operational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.status = statusCode.toString().startsWith("2") ? "success" : "fail";
    this.operational = true;

    /**
     *
     * The code below is used to instanceof can be used with this class.
     *
     * The babel transpiler has issues when converting ES6 classes to older versions casing `instanceof` to not recognize their class. To handle we have to manually set the prototype of this class as `Error` (accessed through `AppError.prototype` which strangely works)
     */
    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
