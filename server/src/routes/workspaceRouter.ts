import { Router } from "express";
import { getWorkspace } from "../controllers/WorkspaceController";
import { getAllWorkspaces } from "../controllers/WorkspaceController/getAllWorkspace";
import { protect } from "../middleware/protect";
import { getWorkspaceMembers } from "../controllers/WorkspaceController/getWorkspaceMembers";
import { createWorkspace } from "../controllers/WorkspaceController/createWorkspace";
import { invite } from "../controllers/WorkspaceController/invite";
import { acceptInvite } from "../controllers/WorkspaceController/acceptInvite";
import { updateWorkspace } from "../controllers/WorkspaceController/updateWorkspace";
import { allowOnly } from "../middleware/allowOnly";

const workspaceRouter = Router();

/**
 * Insert your routes here
 * @example exampleRouter.get("/", getExample)
 */
workspaceRouter.get("/", getWorkspace);
workspaceRouter.get("/all", getAllWorkspaces);
workspaceRouter.get("/members", getWorkspaceMembers);
workspaceRouter.post("/", createWorkspace);
workspaceRouter.post("/invite", invite);
workspaceRouter.post("/accept-invite", acceptInvite);
workspaceRouter.put("/", allowOnly("owner"), updateWorkspace);

export default workspaceRouter;
