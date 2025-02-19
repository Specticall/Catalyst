import { Router } from "express";
import { getWorkspace } from "../controllers/WorkspaceController";

const workspaceRouter = Router();

/**
 * Insert your routes here
 * @example exampleRouter.get("/", getExample)
 */
workspaceRouter.get("/:workspaceId", getWorkspace);

export default workspaceRouter;
