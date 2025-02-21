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
import { CollectionCookie } from "@prisma/client";

function serializeHeaders(
  headers: RequestData["headers"],
  cookies: CollectionCookie[]
) {
  const headersRes = headers.reduce((res: Record<string, unknown>, cur) => {
    if (!cur.key) return res;
    if (cur.enabled) {
      res[cur.key] = cur.value;
    }
    return res;
  }, {});

  const serializedCookies = CookieManager.serializeCookies(cookies);
  if (serializedCookies.length > 0) {
    headersRes["Cookie"] = serializedCookies.join("; ");
  }

  return headersRes as RawAxiosRequestHeaders;
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
  return {
    size: sizeKB,
    statusCode: data.status,
    statusMessage: httpStatus[data?.status as keyof typeof httpStatus],
    data: responseData || undefined,
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
    let errorMessage = "";
    try {
      result = await axios({
        url: url,
        data: body ? JSON.parse(body) : undefined,
        headers: serializeHeaders(headers, cookies),
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
      errorMessage = err.message;
    }

    // Append error message
    const responseDetails = { ...getResponseDetails(result), errorMessage };

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
        cookieToBeCreated.push({
          ...cookie,
          collectionId,
          expiration: cookie.expiration || null,
        });
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
