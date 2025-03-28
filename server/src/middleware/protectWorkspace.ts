import { RequestHandler } from "express";
import { AppError } from "../utils/errors/AppError";
import { STATUS } from "../utils/http/statusCodes";
import { prisma } from "../config/config";

/**
 * Ensures the user calling has the permission to edit / view a workspace
 */
export const protectWorkspace: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const workspaceId = request.headers.workspaceid;
    const userId = request.currentUser?.id;

    if (!userId) {
      throw new AppError(
        "Invalid middleware order, protect() should be called before protectWorkspace()",
        STATUS.INTERNAL_SERVER_ERROR
      );
    }

    if (!workspaceId) {
      throw new AppError("workspaceId not specified", STATUS.BAD_REQUEST);
    }

    const userHasPermission = await prisma.userWorkspace.findFirst({
      where: {
        userId,
        workspaceId: Number(workspaceId),
      },
    });
    if (
      !userHasPermission ||
      (userHasPermission && userHasPermission.isPendingInvite)
    ) {
      throw new AppError(
        "User doesn't have permission to do action on this workspace",
        STATUS.UNAUTHORIZED
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};
