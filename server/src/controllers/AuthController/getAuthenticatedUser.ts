import { RequestHandler } from "express";
import { JWTManager } from "../../utils/auth/JWTManager";
import { AppError } from "../../utils/errors/AppError";
import { STATUS } from "../../utils/http/statusCodes";
import { prisma } from "../../config/config";

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

    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });

    response.send({
      message: "Successfuly",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
