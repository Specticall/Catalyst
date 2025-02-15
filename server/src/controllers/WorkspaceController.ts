import { RequestHandler } from "express";
import { AppError } from "../utils/http/AppError";
import { STATUS } from "../utils/http/statusCodes";
import { prisma } from "../config/config";

const getWorkspace: RequestHandler = async (request, response, next) => {
  try {
    const { workspaceId } = request.params;
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

const updateWorkspace: RequestHandler = async (request, response, next) => {
  try {
    const { explorer } = request.body;
    const { workspaceId } = request.params;
    if (!explorer) {
      throw new AppError(
        "explorer was not provided in the request body",
        STATUS.BAD_REQUEST
      );
    }
    if (!workspaceId) {
      throw new AppError(
        "workspaceId or userId is missing",
        STATUS.BAD_REQUEST
      );
    }
    const updatedWorkspace = await prisma.workspace.update({
      where: {
        id: Number(workspaceId),
      },
      data: {
        explorer,
      },
    });

    response.send({
      message: "Successfuly updated workspace",
      data: updatedWorkspace,
    });
  } catch (error) {
    next(error);
  }
};

export default { getWorkspace, updateWorkspace };
