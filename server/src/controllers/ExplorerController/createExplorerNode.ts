import { RequestHandler } from "express";
import { AppError } from "../../utils/errors/AppError";
import { STATUS } from "../../utils/http/statusCodes";
import { prisma } from "../../config/config";
import { createDefaultRequests } from "../../utils/createDefaultRequest";

export const createExplorerNode: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const { workspace } = request.body;
    const { requestId } = request.params;
    const shouldCreateRequest = request.query?.["new-request"] as string;
    if (!workspace) {
      throw new AppError(
        "explorer was not provided in the request body",
        STATUS.BAD_REQUEST
      );
    }
    if (!workspace) {
      throw new AppError(
        "workspaceId or userId is missing",
        STATUS.BAD_REQUEST
      );
    }
    await prisma.$transaction(async (prisma) => {
      await prisma.workspace.update({
        where: {
          id: workspace.id,
        },
        data: {
          explorer: workspace.explorer,
        },
      });

      if (shouldCreateRequest) {
        await prisma.request.create({
          data: createDefaultRequests(requestId),
        });
      }
    });

    response.send({
      message: "Successfuly create a new node",
    });
  } catch (error) {
    next(error);
  }
};
