import { RequestHandler } from "express";
import { prisma } from "../../config/config";
import { z } from "zod";
import { validateSchema } from "../../utils/validateSchema";

const workspaceCompactSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    role: z.enum(["owner", "editor", "viewer"]),
    isPendingInvite: z.boolean(),
    userWorkspaceId: z.number(),
    profilePictures: z.array(z.string()),
  })
);

type WorkspaceCompact = z.infer<typeof workspaceCompactSchema>[number];

export const getAllWorkspaces: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const userId = request.currentUser?.id;

    const workspaces = await prisma.$queryRaw`
      SELECT 
        w."id", 
        w."name", 
        (ARRAY_AGG(uw."isPendingInvite") FILTER (WHERE uw."userId" = ${userId}))[1] AS "isPendingInvite",
        (ARRAY_AGG(uw."role") FILTER (WHERE uw."userId" = ${userId}))[1] AS "role",
        (ARRAY_AGG(uw."id") FILTER (WHERE uw."userId" = ${userId}))[1] AS "userWorkspaceId",
        (ARRAY_AGG(u."profilePicture"))[1:3] AS "profilePictures"
      FROM "UserWorkspace" AS uw
      JOIN "Workspace" AS w ON  w."id" = uw."workspaceId"
      JOIN "User" AS u ON u."id" = uw."userId"
      GROUP BY w."id"
      HAVING COUNT(CASE WHEN uw."userId" = ${userId} THEN 1 ELSE NULL END) = 1
    `;
    const parsedData = validateSchema(workspaceCompactSchema, workspaces);

    // Group based on invite status
    const groupedWorkspaces = parsedData.reduce(
      (result: Record<string, WorkspaceCompact[]>, currentWorkspace) => {
        const key = currentWorkspace.isPendingInvite ? "pending" : "workspace";
        result[key].push(currentWorkspace);
        return result;
      },
      { workspace: [], pending: [] }
    );

    response.send({
      message: "Succesfuly retrieved user workspaces",
      data: groupedWorkspaces,
    });
  } catch (error) {
    next(error);
  }
};
