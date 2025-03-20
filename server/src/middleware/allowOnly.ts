import { WorkspaceRole } from "@prisma/client";
import { RequestHandler } from "express";
import { AppError } from "../utils/errors/AppError";
import { STATUS } from "../utils/http/statusCodes";
import { prisma } from "../config/config";

type AuthorizationMiddleware = (...roles: WorkspaceRole[]) => RequestHandler;
export const allowOnly: AuthorizationMiddleware = function (...roles) {
  return async (request, response, next) => {
    try {
      const user = request.currentUser;
      if (!user) {
        throw new AppError(
          "Protect middleware should be called before authorzation",
          STATUS.INTERNAL_SERVER_ERROR
        );
      }

      // Users can attach workspaceId via cookie or the body depending the the usage
      // e.g. editing a form requires the workspaceId to appended on the body
      let workspaceId = undefined;

      // Attempt to get it from body
      workspaceId = request.headers.workspaceid;

      // If it does not exist try to get it from the cookie
      if (workspaceId === undefined) {
        workspaceId = request.headers.workspaceidd;
      }

      // If cookie also does not contain it then the user has no cookie
      if (!workspaceId) {
        throw new AppError("Workspace id was not found", STATUS.BAD_REQUEST);
      }

      // Ensures the cookie proccesed in the middlware the one retrived either from the body or from the cookie.
      request.headers.workspaceid = workspaceId;

      const userWorkspace = await prisma.userWorkspace.findFirst({
        select: {
          role: true,
        },
        where: {
          userId: user.id,
          workspaceId: Number(workspaceId),
        },
      });

      if (userWorkspace && roles.includes(userWorkspace?.role)) {
        next();
        return;
      }

      throw new AppError(
        "User have insufficient permission",
        STATUS.UNAUTHORIZED
      );
    } catch (err) {
      next(err);
    }
  };
};
