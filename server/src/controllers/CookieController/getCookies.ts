import { RequestHandler } from "express";
import { AppError } from "../../utils/errors/AppError";
import { STATUS } from "../../utils/http/statusCodes";
import { prisma } from "../../config/config";

type CompactCookie = { id: number; name: string; domain: string };
export const getCookies: RequestHandler = async (request, response, next) => {
  try {
    const { collectionId } = request.params;
    if (!collectionId) {
      throw new AppError(
        "Collection id missing in the url parameter",
        STATUS.BAD_REQUEST
      );
    }

    const cookies = await prisma.collectionCookie.findMany({
      where: {
        collectionId,
      },
      select: {
        id: true,
        name: true,
        domain: true,
      },
    });
    const cookiesGroupedByDomain = cookies.reduce(
      (group: Record<string, CompactCookie[]>, cookie) => {
        if (cookie.domain in group) {
          group[cookie.domain].push(cookie);
        } else {
          group[cookie.domain] = [cookie];
        }
        return group;
      },
      {}
    );

    response.send({
      message: "Successfuly retrieved cookies",
      data: cookiesGroupedByDomain,
    });
  } catch (error) {
    next(error);
  }
};
