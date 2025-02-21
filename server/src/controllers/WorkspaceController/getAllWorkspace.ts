import { RequestHandler } from "express";
import { prisma } from "../../config/config";
import { z } from "zod";
import { validateSchema } from "../../utils/validateSchema";

const workspaceCompactSchema = z.array(
  z.object({
    name: z.string(),
    id: z.number(),
    role: z.enum(["owner", "editor", "viewer"]),
  })
);

export const getAllWorkspaces: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const userId = request.currentUser?.id;

    const workspaces = await prisma.$queryRaw`
      SELECT w.id, w.name, uw.role FROM "UserWorkspace" AS uw
      JOIN "Workspace" AS w ON  w."id" = uw."workspaceId" 
      WHERE uw."userId" = ${userId}
    `;
    const parsedData = validateSchema(workspaceCompactSchema, workspaces);

    response.send({
      message: "Succesfuly retrieved user workspaces",
      data: parsedData,
    });
  } catch (error) {
    next(error);
  }
};
