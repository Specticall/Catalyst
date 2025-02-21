import { RequestHandler } from "express";
import { JWTManager } from "../../utils/auth/JWTManager";
import { AppError } from "../../utils/errors/AppError";
import { STATUS } from "../../utils/http/statusCodes";

export const getAuthenticatedUser: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const token = request.cookies.jwt;

    if (!token) {
      throw new AppError("User does not have a token", STATUS.UNAUTHORIZED);
    }
    const payload = JWTManager.verify(token);

    response.send({
      message: "Successfuly",
      data: payload,
    });
  } catch (error) {
    next(error);
  }
};
