import { Router } from "express";
import { getWorkspace } from "../controllers/WorkspaceController";
import { getAllWorkspaces } from "../controllers/WorkspaceController/getAllWorkspace";
import { protect } from "../middleware/protect";

const workspaceRouter = Router();

/**
 * Insert your routes here
 * @example exampleRouter.get("/", getExample)
 */
workspaceRouter.get("/", getWorkspace);
workspaceRouter.get("/all", protect, getAllWorkspaces);

export default workspaceRouter;
