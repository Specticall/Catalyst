import { Router } from "express";
import { getRequest, updateRequest } from "../controllers/RequestController";

const requestRouter = Router();

/**
 * Insert your routes here
 * @example exampleRouter.get("/", getExample)
 */
requestRouter.get("/:requestId", getRequest);
requestRouter.put("/", updateRequest);

export default requestRouter;
