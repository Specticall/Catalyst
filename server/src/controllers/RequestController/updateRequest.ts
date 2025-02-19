import { RequestHandler } from "express";
import { AppError } from "../../utils/errors/AppError";
import { STATUS } from "../../utils/http/statusCodes";
import { prisma } from "../../config/config";
import { requestDataSchema } from "../../utils/schemas";

export const updateRequest: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const { requestData } = request.body;
    if (!requestData) {
      throw new AppError(
        "Request data was not found in the request body",
        STATUS.BAD_REQUEST
      );
    }
    const { body, headers, id, method, name, url, cookies } =
      requestDataSchema.parse(requestData);

    await prisma.request.update({
      where: {
        id,
      },
      data: {
        body,
        method,
        name,
        url,
        headers,
      },
    });

    response.send({
      message: "Successfuly saved request",
    });
  } catch (error) {
    next(error);
  }
};
