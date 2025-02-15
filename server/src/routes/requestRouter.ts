import { Router } from "express";
import { RequestsController } from "../controllers";

const requestRouter = Router();

/**
 * Insert your routes here
 * @example exampleRouter.get("/", getExample)
 */
requestRouter.get("/:requestId", RequestsController.getRequests);
requestRouter.post("/:requestId", RequestsController.createRequests);
requestRouter.put("/", RequestsController.updateRequests);

export default requestRouter;
