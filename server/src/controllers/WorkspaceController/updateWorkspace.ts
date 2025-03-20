import { RequestHandler } from "express";
import { z } from "zod";
import { validateSchema } from "../../utils/validateSchema";
import { AppError } from "../../utils/errors/AppError";
import { STATUS } from "../../utils/http/statusCodes";
import { prisma } from "../../config/config";

const schema = z.object({
  name: z.string(),
});
export const updateWorkspace: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const workspaceId = request.headers.workspaceid;
    const { name } = validateSchema(schema, request.body);

    if (!workspaceId) {
      throw new AppError(
        "Workspace id was not found",
        STATUS.INTERNAL_SERVER_ERROR
      );
    }

    await prisma.workspace.update({
      where: {
        id: Number(workspaceId),
      },
      data: {
        name,
      },
    });

    response.send({
      message: "Successfuly updated workspace",
    });
  } catch (error) {
    next(error);
  }
};
