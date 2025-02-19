import { RequestHandler } from "express";
import { AppError } from "../../utils/errors/AppError";
import { STATUS } from "../../utils/http/statusCodes";
import { prisma } from "../../config/config";

export const getRequest: RequestHandler = async (request, response, next) => {
  try {
    const { requestId } = request.params;
    if (!requestId) {
      throw new AppError("requestId was not found", STATUS.BAD_REQUEST);
    }

    const req = await prisma.request.findFirst({
      where: {
        id: requestId,
      },
    });
    response.send({
      message: "Successfuly retrieved request",
      data: req,
    });
  } catch (error) {
    next(error);
  }
};
