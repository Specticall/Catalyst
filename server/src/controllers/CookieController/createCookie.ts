import { RequestHandler } from "express";
import { z } from "zod";
import { validateBody } from "../../utils/validateBody";
import { prisma } from "../../config/config";

export const bodyCookieSchema = z.object({
  domain: z.string(),
  path: z.string(),
  name: z.string(),
  value: z.string(),
  maxAge: z.number().optional(),
  secure: z.boolean(),
  httpOnly: z.boolean(),
  sameSite: z.enum(["Lax", "None", "Strict"]).optional(),
  collectionId: z.string(),
});
export const createCookie: RequestHandler = async (request, response, next) => {
  try {
    const body = validateBody(bodyCookieSchema, request);

    const newCookie = await prisma.collectionCookie.create({
      data: body,
    });

    response.send({
      message: "Successfuly created a new cookie",
      data: newCookie,
    });
  } catch (error) {
    next(error);
  }
};
