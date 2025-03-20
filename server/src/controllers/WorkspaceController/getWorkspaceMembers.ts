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
    isPendingInvite: z.boolean(),
  })
);
export const getWorkspaceMembers: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const workspaceId = request.headers.workspaceid;
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

    const workspaceMembers = await prisma.$queryRaw`
      SELECT u."id", u."username", u."email", uw."role", u."profilePicture", uw."isPendingInvite" 
      FROM "UserWorkspace" AS uw
      JOIN "User" AS u ON u."id" = uw."userId"
      WHERE uw."workspaceId" = ${Number(workspaceId)} 
    `;
    const validated = validateSchema(workspaceMembersSchema, workspaceMembers);

    // Sort the validated array to move elements with isPendingInvite true to the back
    const sortedMembers = validated.sort((a, b) => {
      if (a.isPendingInvite === b.isPendingInvite) return 0;
      return a.isPendingInvite ? 1 : -1;
    });

    response.send({
      message: "Succefully retrieved workspace members",
      data: sortedMembers,
    });
  } catch (error) {
    next(error);
  }
};
