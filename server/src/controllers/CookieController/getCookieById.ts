import { RequestHandler } from "express";
import { AppError } from "../../utils/errors/AppError";
import { STATUS } from "../../utils/http/statusCodes";
import { prisma } from "../../config/config";

export const getCookieById: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const { cookieId } = request.params;
    if (!cookieId) {
      throw new AppError(
        "Cookie id is missing in the request parameter",
        STATUS.BAD_REQUEST
      );
    }

    const cookie = await prisma.collectionCookie.findUnique({
      where: {
        id: Number(cookieId),
      },
    });

    response.send({
      message: "Successfuly retrieved cookie details",
      data: cookie,
    });
  } catch (error) {
    next(error);
  }
};
