import { Router } from "express";
import { useProxy } from "../controllers/ProxyController";

const proxyRouter = Router();

/**
 * Insert your routes here
 * @example exampleRouter.get("/", getExample)
 */
proxyRouter.post("/", useProxy);

export default proxyRouter;
