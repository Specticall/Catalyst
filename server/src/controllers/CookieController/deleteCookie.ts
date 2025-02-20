import { RequestHandler } from "express";
import { AppError } from "../../utils/errors/AppError";
import { STATUS } from "../../utils/http/statusCodes";
import { prisma } from "../../config/config";

export const deleteCookie: RequestHandler = async (request, response, next) => {
  try {
    const { cookieId } = request.params;
    const query = request.query;
    if (!cookieId) {
      throw new AppError(
        "Cookie id was not found in the request parameter",
        STATUS.BAD_REQUEST
      );
    }

    await prisma.collectionCookie.delete({
      where: {
        id: Number(cookieId),
      },
    });

    response.send({
      message: "Successfuly deleted cookie",
    });
  } catch (error) {
    next(error);
  }
};
