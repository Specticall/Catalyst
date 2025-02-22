import { Router } from "express";
import { getWorkspace } from "../controllers/WorkspaceController";
import { getAllWorkspaces } from "../controllers/WorkspaceController/getAllWorkspace";
import { protect } from "../middleware/protect";
import { getWorkspaceMembers } from "../controllers/WorkspaceController/getWorkspaceMembers";
import { createWorkspace } from "../controllers/WorkspaceController/createWorkspace";

const workspaceRouter = Router();

/**
 * Insert your routes here
 * @example exampleRouter.get("/", getExample)
 */
workspaceRouter.get("/", getWorkspace);
workspaceRouter.get("/all", protect, getAllWorkspaces);
workspaceRouter.get("/members", protect, getWorkspaceMembers);

workspaceRouter.post("/", protect, createWorkspace);

export default workspaceRouter;
