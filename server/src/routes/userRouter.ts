import { Router } from "express";
import { search } from "../controllers/UserController/search";

const userRouter = Router();

/**
 * Insert your routes here
 * @example exampleRouter.get("/", getExample)
 */
userRouter.post("/search", search);

export default userRouter;
