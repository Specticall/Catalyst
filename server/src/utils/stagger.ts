import { request, RequestHandler, response } from "express";

/**
 * Artificially delays a response for testing
 */
export function stagger(timeMS: number = 0): RequestHandler {
  return async (_, __, next) => {
    await new Promise<void>((resolve) => {
      setTimeout(() => resolve(), timeMS);
    });

    next();
  };
}
