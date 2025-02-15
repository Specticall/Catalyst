import { RequestHandler } from "express";
import { AppError } from "../utils/http/AppError";
import { STATUS } from "../utils/http/statusCodes";
import { prisma } from "../config/config";
import { z } from "zod";

const getRequests: RequestHandler = async (request, response, next) => {
  try {
    const { requestId } = request.params;
    if (!requestId) {
      throw new AppError("requestId was not found", STATUS.BAD_REQUEST);
    }

    const req = await prisma.request.findFirst({
      where: {
        id: requestId,
      },
    });
    response.send({
      message: "Successfuly retrieved request",
      data: req,
    });
  } catch (error) {
    next(error);
  }
};

const defaultHeaders = [
  { key: "Content-Type", value: "application/json", id: "1", enabled: true },
  { key: "Accept", value: "*/*", id: "2", enabled: true },
  { key: "Authorization", value: "", id: "3", enabled: true },
];

const createRequests: RequestHandler = async (request, response, next) => {
  try {
    const { requestId } = request.params;
    if (!requestId) {
      throw new AppError(
        "requstData missing in the request body",
        STATUS.NOT_FOUND
      );
    }

    // {
    //   // "Content-Encoding": "",
    //   // "Content-Length": "application/json", -> Automatically set
    //   // "User-Agent": "", -> Automatically set
    //   "Content-Type": "application/json",
    //   Accept: "*/*",
    //   Authorization: "",
    // }
    await prisma.request.create({
      data: {
        body: "",
        id: requestId,
        method: "GET",
        name: "New Request",
        url: "",
        headers: defaultHeaders,
      },
    });

    response.send({
      message: "Successfuly created request",
    });
  } catch (error) {
    next(error);
  }
};

const requestDataSchema = z.object({
  body: z.string(),
  headers: z.array(
    z.object({
      key: z.string(),
      value: z.string(),
      enabled: z.boolean(),
    })
  ),
  id: z.string(),
  method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
  name: z.string(),
  url: z.string(),
});
const updateRequests: RequestHandler = async (request, response, next) => {
  try {
    const { requestData } = request.body;
    if (!requestData) {
      throw new AppError(
        "Request data was not found in the request body",
        STATUS.BAD_REQUEST
      );
    }
    const { body, headers, id, method, name, url } =
      requestDataSchema.parse(requestData);

    console.log(headers);

    await prisma.request.update({
      where: {
        id,
      },
      data: {
        body,
        method,
        name,
        url,
        headers,
      },
    });

    response.send({
      message: "Successfuly saved request",
    });
  } catch (error) {
    next(error);
  }
};

export default { getRequests, createRequests, updateRequests };
