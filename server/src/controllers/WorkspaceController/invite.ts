import { RequestHandler } from "express";
import { z } from "zod";
import { validateSchema } from "../../utils/validateSchema";
import { prisma } from "../../config/config";
import { AppError } from "../../utils/errors/AppError";
import { STATUS } from "../../utils/http/statusCodes";

const inviteSchema = z.object({
  recepientId: z.number(),
});
export const invite: RequestHandler = async (request, response, next) => {
  try {
    const { recepientId } = validateSchema(inviteSchema, request.body);
    const workspaceId = request.cookies.workspaceId;

    if (!workspaceId) {
      throw new AppError("Workspace id does not exist", STATUS.BAD_REQUEST);
    }

    const user = request.currentUser;
    if (!user) {
      throw new AppError(
        "Protect middleware should be called before",
        STATUS.INTERNAL_SERVER_ERROR
      );
    }

    const userData = await prisma.user.findUnique({
      select: {
        id: true,
      },
      where: {
        id: user.id,
      },
    });
    if (!userData) {
      throw new AppError("User does not exist", STATUS.BAD_REQUEST);
    }

    const invitation = await prisma.userWorkspace.create({
      data: {
        isPendingInvite: true,
        role: "viewer",
        userId: recepientId,
        workspaceId: Number(workspaceId),
      },
    });

    response.send({
      message: "Successfuly sent invite",
      data: invitation,
    });
  } catch (error) {
    next(error);
  }
};
