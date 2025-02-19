import { RequestHandler } from "express";
import { AppError } from "../../utils/errors/AppError";
import { STATUS } from "../../utils/http/statusCodes";
import { prisma } from "../../config/config";

export const updateExplorer: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const { workspace } = request.body;
    if (!workspace) {
      throw new AppError(
        "explorer was not provided in the request body",
        STATUS.BAD_REQUEST
      );
    }
    const updatedWorkspace = await prisma.workspace.update({
      where: {
        id: workspace.id,
      },
      data: {
        explorer: workspace.explorer,
        name: workspace.name,
      },
    });

    response.send({
      message: "Successfuly updated explorer",
    });
  } catch (err) {
    next(err);
  }
};
