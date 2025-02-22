import { RequestHandler } from "express";
import { AppError } from "../../utils/errors/AppError";
import { STATUS } from "../../utils/http/statusCodes";
import { prisma } from "../../config/config";
import { Prisma } from "@prisma/client";

export const search: RequestHandler = async (request, response, next) => {
  try {
    const user = request.currentUser;
    const workspaceId = request.cookies.workspaceId;
    if (!workspaceId) {
      throw new AppError("Workspace id not found", STATUS.BAD_REQUEST);
    }
    const searchQuery = request.query.searchQuery as string | undefined;
    if (!user) {
      throw new AppError(
        "protect middleware should be called before this controller",
        STATUS.INTERNAL_SERVER_ERROR
      );
    }

    let result;
    if (searchQuery) {
      result = await prisma.$queryRaw`
        SELECT u."username", u."email", u."profilePicture", u."id" 
        FROM "User" AS u  
        JOIN "UserWorkspace" AS uw ON uw."userId" = u."id" 
        -- Prevents duplicate users
        GROUP BY u."id" 
        HAVING (username ILIKE ${"%" + searchQuery + "%"} 
        OR email ILIKE ${"%" + searchQuery + "%"})
        -- Exclude the current user
        AND u."id" != ${user.id}
        -- Exclude users that is already inside the workspace
        AND COUNT(CASE WHEN uw."workspaceId" = ${Number(
          workspaceId
        )} THEN 1 END) = 0;
      `;
      // Note on how the count part works : if there are more than one workspaceId inside an aggregated group then exclude that row
    }

    response.send({
      message: "Successfuly queried user search result",
      data: result || [],
    });
  } catch (error) {
    next(error);
  }
};
