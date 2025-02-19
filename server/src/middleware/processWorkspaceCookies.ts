import { RequestHandler } from "express";
import { AppError } from "../utils/errors/AppError";
import { STATUS } from "../utils/http/statusCodes";
import { CookieManager } from "../utils/http/CookieManager";

export const processWorkspaceCookies: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const { workspace } = request.body;
    const cookies = workspace.cookies as string[];
    if (!cookies) {
      throw new AppError(
        "Workspace cookies does not exist in the request body",
        STATUS.BAD_REQUEST
      );
    }

    const parsedCookies = CookieManager.parseCookies(cookies);

    next();
  } catch (error) {
    next(error);
  }
};
