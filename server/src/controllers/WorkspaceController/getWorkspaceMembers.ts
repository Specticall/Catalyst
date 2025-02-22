import { RequestHandler } from "express";
import { AppError } from "../../utils/errors/AppError";
import { STATUS } from "../../utils/http/statusCodes";
import { prisma } from "../../config/config";
import { z } from "zod";
import { validateSchema } from "../../utils/validateSchema";

const workspaceMembersSchema = z.array(
  z.object({
    username: z.string(),
    email: z.string(),
    profilePicture: z.string(),
    id: z.number(),
    role: z.enum(["owner", "editor", "viewer"]),
  })
);
export const getWorkspaceMembers: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const workspaceId = request.cookies.workspaceId;
    const user = request.currentUser;
    if (!workspaceId) {
      throw new AppError("Workspace id was not found", STATUS.BAD_REQUEST);
    }
    if (!user) {
      throw new AppError(
        "Protect middleware should used before this controller",
        STATUS.INTERNAL_SERVER_ERROR
      );
    }

    // const userworksp
    const workspaceMembers = await prisma.$queryRaw`
      SELECT u."id", u."username", u."email", uw."role", u."profilePicture" FROM "UserWorkspace" AS uw
      JOIN "User" AS u ON u."id" = uw."userId"
      WHERE uw."workspaceId" = ${Number(workspaceId)} AND uw."userId" = ${
      user.id
    }
    `;
    const validated = validateSchema(workspaceMembersSchema, workspaceMembers);

    response.send({
      message: "Succefully retrieved workspace members",
      data: validated,
    });
  } catch (error) {
    next(error);
  }
};
