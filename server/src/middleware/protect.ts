import { RequestHandler } from "express";
import { AppError } from "../utils/errors/AppError";
import { JWTManager, JWTPayload } from "../utils/auth/JWTManager";
import { STATUS } from "../utils/http/statusCodes";

declare global {
  namespace Express {
    interface Request {
      currentUser?: JWTPayload;
    }
  }
}

export const protect: RequestHandler = async (request, response, next) => {
  try {
    const token = request.cookies.jwt;

    if (!token) {
      throw new AppError("User does not have a token", STATUS.UNAUTHORIZED);
    }
    const payload = JWTManager.verify(token);

    request.currentUser = payload;

    next();
  } catch (error) {
    next(error);
  }
};
