import { Router } from "express";
import { WorkspaceController } from "../controllers";

const workspaceRouter = Router();

/**
 * Insert your routes here
 * @example exampleRouter.get("/", getExample)
 */
workspaceRouter.put("/:workspaceId", WorkspaceController.updateWorkspace);
workspaceRouter.get("/:workspaceId", WorkspaceController.getWorkspace);

export default workspaceRouter;
