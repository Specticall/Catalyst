import cookieRouter from "./cookieRouter";
import proxyRouter from "./proxyRouter";
import explorerRouter from "./explorerRouter";
import requestRouter from "./requestRouter";
import workspaceRouter from "./workspaceRouter";
import { Router } from "express";

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

router.use("/workspaces", workspaceRouter);
router.use("/requests", requestRouter);
router.use("/explorers", explorerRouter);

router.use("/proxy", proxyRouter);

router.use("/cookies", cookieRouter);

export default router;