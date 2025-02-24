import userRouter from "./userRouter";
import authRouter from "./authRouter";
import cookieRouter from "./cookieRouter";
import proxyRouter from "./proxyRouter";
import explorerRouter from "./explorerRouter";
import requestRouter from "./requestRouter";
import workspaceRouter from "./workspaceRouter";
import { Router } from "express";
import { protect } from "../middleware/protect";
import { protectWorkspace } from "../middleware/protectWorkspace";

const router = Router();

// API Welcome Message
router.get("/", (_, response) => {
  response.send({
    message: "My-API-Name v0.0.1",
  });
});

/**
 * Insert your router here
 * @example router.use("/example", exampleRouter)
 */
router.use("/auth", authRouter);

// Ensure the user is logged in before using all the routes below
router.use(protect);
router.use("/workspaces", workspaceRouter);

// Ensures user editing the workspace has the approriate permission
router.use(protectWorkspace);
router.use("/requests", requestRouter);
router.use("/explorers", explorerRouter);
router.use("/proxy", proxyRouter);
router.use("/cookies", cookieRouter);
router.use("/users", userRouter);

export default router;
