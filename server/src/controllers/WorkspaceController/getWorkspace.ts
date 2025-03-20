import { RequestHandler } from "express";
import { AppError } from "../../utils/errors/AppError";
import { STATUS } from "../../utils/http/statusCodes";
import { prisma } from "../../config/config";

export const getWorkspace: RequestHandler = async (request, response, next) => {
  try {
    const workspaceId = request.headers.workspaceid;
    if (!workspaceId) {
      throw new AppError(
        "workspaceId was not found in the request parameter",
        STATUS.BAD_REQUEST
      );
    }
    const workspace = await prisma.workspace.findFirst({
      where: {
        id: Number(workspaceId),
      },
    });

    response.send({
      message: "Succesfuly retrieve workspace",
      data: workspace,
    });
  } catch (error) {
    next(error);
  }
};
