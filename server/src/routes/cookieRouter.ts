import { Router } from "express";
import { getCookies } from "../controllers/CookieController/getCookies";
import { getCookieById } from "../controllers/CookieController/getCookieById";
import { updateCookie } from "../controllers/CookieController/updateCookie";
import { createCookie } from "../controllers/CookieController/createCookie";
import { deleteCookie } from "../controllers/CookieController/deleteCookie";

const cookieRouter = Router();

/**
 * Insert your routes here
 * @example exampleRouter.get("/", getExample)
 */
cookieRouter.get("/all/:collectionId", getCookies);
cookieRouter.get("/:cookieId", getCookieById);
cookieRouter.put("/", updateCookie);
cookieRouter.post("/", createCookie);
cookieRouter.delete("/:cookieId?", deleteCookie);

export default cookieRouter;
