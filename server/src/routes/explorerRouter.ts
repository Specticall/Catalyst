import { Router } from "express";
import {
  createExplorerNode,
  deleteExplorerNode,
  updateExplorer,
} from "../controllers/ExplorerController";

const explorerRouter = Router();

/**
 * Insert your routes here
 * @example exampleRouter.get("/", getExample)
 */
explorerRouter.put("/remove/:requestId", deleteExplorerNode);
explorerRouter.put("/create/:requestId", createExplorerNode);
explorerRouter.put("/", updateExplorer);

export default explorerRouter;
