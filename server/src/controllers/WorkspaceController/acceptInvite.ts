import { RequestHandler } from "express";
import { z } from "zod";
import { validateSchema } from "../../utils/validateSchema";
import { prisma } from "../../config/config";

const schema = z.object({
  userWorkspaceId: z.number(),
});
export const acceptInvite: RequestHandler = async (request, response, next) => {
  try {
    const { userWorkspaceId } = validateSchema(schema, request.body);

    await prisma.userWorkspace.update({
      where: {
        id: userWorkspaceId,
      },
      data: {
        isPendingInvite: false,
      },
    });

    response.send({
      message: "Successfuly accepted invite",
    });
  } catch (error) {
    next(error);
  }
};
