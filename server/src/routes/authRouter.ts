import { Router } from "express";
import { login } from "../controllers/AuthController/login";
import { getAuthenticatedUser } from "../controllers/AuthController/getAuthenticatedUser";
import { logout } from "../controllers/AuthController/logout";

const authRouter = Router();

/**
 * Insert your routes here
 * @example exampleRouter.get("/", getExample)
 */
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/user", getAuthenticatedUser);

export default authRouter;
