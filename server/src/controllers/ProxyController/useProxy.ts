import { RequestHandler, response } from "express";
import { RequestData, requestDataSchema } from "../../utils/schemas";
import axios, {
  AxiosError,
  AxiosResponse,
  isAxiosError,
  RawAxiosRequestHeaders,
} from "axios";
import { httpStatus } from "../../utils/http/httpStatus";
import { AppError } from "../../utils/errors/AppError";
import { STATUS } from "../../utils/http/statusCodes";
import { prisma } from "../../config/config";
import { parseDomain } from "../../utils/http/parseDomain";
import {
  CookieManager,
  ParsedCookie,
  TranslatedCookie,
} from "../../utils/http/CookieManager";

function serializeHeaders(headers: RequestData["headers"]) {
  return headers.reduce((res: Record<string, unknown>, cur) => {
    if (!cur.key) return res;
    if (cur.enabled) {
      res[cur.key] = cur.value;
    }
    return res;
  }, {}) as RawAxiosRequestHeaders;
}

function getResponseDetails(data?: AxiosError | AxiosResponse) {
  if (!data) return undefined;

  let sizeKB = 0;
  let cookies: string[] | undefined = undefined;
  let responseData: unknown = undefined;
  if (!isAxiosError(data)) {
    const contentLength = data?.headers["content-length"];
    sizeKB = (
      contentLength ? (Number(contentLength) * 0.001).toFixed(2) : 0
    ) as number;
    responseData = data.data;
    cookies = data.headers["set-cookie"];
  } else {
    responseData = data.response?.data || data.response;
    cookies = data.response?.headers["set-cookie"];
  }

  let failedToConnect;
  if ("errors" in data && Array.isArray(data.errors)) {
    const errors = data.errors.at(-1);
    failedToConnect = {
      message: "Couldn't send request",
      port: "port" in errors ? errors.port : "",
      address: "address" in errors ? errors.address : "",
      code: "code" in errors ? errors.code : "",
    };
  }

  return {
    size: sizeKB,
    statusCode: data.status,
    statusMessage: httpStatus[data?.status as keyof typeof httpStatus],
    data: responseData || failedToConnect,
    cookies,
  };
}

export const useProxy: RequestHandler = async (request, response, next) => {
  try {
    const { requestData, collectionId } = request.body;
    if (!collectionId) {
      throw new AppError(
        "collectionId was not found in the request body",
        STATUS.BAD_REQUEST
      );
    }

    const { body, headers, method, url } = requestDataSchema.parse(requestData);
    const domain = parseDomain(url);
    if (!domain) {
      throw new AppError("Invalid request URL", STATUS.BAD_REQUEST);
    }

    const cookies = await prisma.collectionCookie.findMany({
      where: {
        collectionId,
        domain,
      },
    });

    let result;
    try {
      result = await axios({
        url: url,
        data: body ? JSON.parse(body) : undefined,
        headers: serializeHeaders(headers),
        method: method,
      });
    } catch (err) {
      if (!isAxiosError(err)) {
        throw new AppError(
          "Proxy server response is not typed to axios",
          STATUS.INTERNAL_SERVER_ERROR
        );
      }
      result = err;
    }

    const responseDetails = getResponseDetails(result);

    // Store cookie to database
    const existingCookies = new Map(
      cookies.map((cookie) => [cookie.name, cookie.id])
    );
    const parsedCookies = CookieManager.parseCookies(responseDetails?.cookies);
    const newCookies = CookieManager.translateCookies(parsedCookies, domain);
    const cookieToBeUpdated: (TranslatedCookie & { id: number })[] = [];
    const cookieToBeCreated: (TranslatedCookie & { collectionId: string })[] =
      [];
    newCookies.forEach((cookie) => {
      if (existingCookies.has(cookie.name)) {
        cookieToBeUpdated.push({
          ...cookie,
          id: existingCookies.get(cookie.name)!,
        });
      } else {
        cookieToBeCreated.push({ ...cookie, collectionId });
      }
    });

    await prisma.$transaction(async (prisma) => {
      // Update cookies -> transaction will use the same connection
      await Promise.all(
        cookieToBeUpdated.map((cookie) => {
          return prisma.collectionCookie.update({
            where: { id: cookie.id },
            data: cookie,
          });
        })
      );

      // Create new cookies
      await prisma.collectionCookie.createMany({
        data: cookieToBeCreated,
        skipDuplicates: true,
      });
    });

    response.send({
      message: "Successfuly proxied request",
      data: responseDetails,
    });
  } catch (error) {
    next(error);
  }
};
