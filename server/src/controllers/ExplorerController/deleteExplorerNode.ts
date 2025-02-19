import { RequestHandler } from "express";
import { AppError } from "../../utils/errors/AppError";
import { STATUS } from "../../utils/http/statusCodes";
import { prisma } from "../../config/config";
import { z } from "zod";

export const deleteExplorerNodeSchema = z.object({
  // Probably should type this soon
  explorer: z.any(),
  workspaceId: z.number(),
  childrenIds: z.array(z.string()).optional(),
});
export const deleteExplorerNode: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const { explorer, workspaceId, childrenIds } =
      deleteExplorerNodeSchema.parse(request.body);
    const { requestId } = request.params;
    if (!workspaceId) {
      throw new AppError("workspaceId is missing", STATUS.BAD_REQUEST);
    }

    await prisma.$transaction(async (prisma) => {
      await prisma.workspace.update({
        where: {
          id: Number(workspaceId),
        },
        data: {
          explorer,
        },
      });

      // Ensures node is a request before attempting to delete
      const nodeIsRequest = await prisma.request.findFirst({
        where: { id: requestId },
      });

      if (nodeIsRequest) {
        // Delete the current child node.
        await prisma.request.delete({
          where: {
            id: requestId,
          },
        });
      } else if (childrenIds && childrenIds.length > 0) {
        // Attempt to delete any child nodes if they exist
        await prisma.request.deleteMany({
          where: {
            id: {
              in: childrenIds,
            },
          },
        });
      }
    });

    response.send({
      message: "Successfuly delete explorer node",
    });
  } catch (err) {
    next(err);
  }
};
