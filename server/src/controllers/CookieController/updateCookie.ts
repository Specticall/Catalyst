import { RequestHandler } from "express";
import { prisma } from "../../config/config";
import { cookieSchema } from "../../utils/schemas";
import { validateSchema } from "../../utils/validateSchema";

export const updateCookie: RequestHandler = async (request, response, next) => {
  try {
    const body = validateSchema(cookieSchema, request.body);

    const cookie = await prisma.collectionCookie.update({
      where: {
        id: Number(body.id),
      },
      data: body,
    });

    response.send({
      message: "Successfuly updated cookie",
      data: cookie,
    });
  } catch (error) {
    next(error);
  }
};
