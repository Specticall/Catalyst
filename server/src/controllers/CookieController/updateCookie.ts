import { RequestHandler } from "express";
import { prisma } from "../../config/config";
import { validateBody } from "../../utils/validateBody";
import { cookieSchema } from "../../utils/schemas";

export const updateCookie: RequestHandler = async (request, response, next) => {
  try {
    const body = validateBody(cookieSchema, request);

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
