import { RequestHandler } from "express";

export const logout: RequestHandler = async (request, response, next) => {
  try {
    response.clearCookie("jwt", {
      httpOnly: true,
    });
    response.send({
      message: "Succesfuly logged user out",
    });
  } catch (error) {
    next(error);
  }
};
