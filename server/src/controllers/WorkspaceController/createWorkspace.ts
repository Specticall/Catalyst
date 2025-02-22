import { z } from "zod";
import { validateSchema } from "../../utils/validateSchema";
import { RequestHandler } from "express";
import { prisma } from "../../config/config";
import { AppError } from "../../utils/errors/AppError";
import { STATUS } from "../../utils/http/statusCodes";

export const createWorkspace: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const user = request.currentUser;
    const { name } = validateSchema(
      z.object({ name: z.string() }),
      request.body
    );
    if (!user) {
      throw new AppError(
        "protect should be called before this controller",
        STATUS.INTERNAL_SERVER_ERROR
      );
    }

    const newWorkspace = await prisma.$transaction(async (prisma) => {
      const newWorkspace = await prisma.workspace.create({
        data: {
          name,
          explorer: [],
        },
      });
      await prisma.userWorkspace.create({
        data: {
          userId: user?.id,
          role: "owner",
          workspaceId: newWorkspace.id,
          isPendingInvite: false,
        },
      });
      response.cookie("workspaceId", newWorkspace.id, {
        httpOnly: false,
        // Note: Ideally this should be Infinity but Chrome can only set max cookie expiration date 400 days into the future, so 1 year is fine ig (unless some there's some weird edge cases, not too tho important rn)
        maxAge: 365 * 24 * 60 * 60 * 1000,
      });

      return newWorkspace;
    });

    response.send({
      message: "Successfuly created new workspace",
      data: newWorkspace,
    });
  } catch (error) {
    next(error);
  }
};
