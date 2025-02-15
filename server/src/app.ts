import express from "express";
import cors from "cors";
import router from "./routes";
import { AppError } from "./utils/http/AppError";
import { STATUS } from "./utils/http/statusCodes";
import { ErrorController } from "./controllers";

const app = express();

/**
 * Enable Cross-Origin Resource Sharing (CORS) for all routes
 * This allows your API to be accessed from different domains
 */
app.use(cors());

/**
 * Middleware to parse incoming JSON requests
 * This allows you to access the request body as `request.body`
 */
app.use(express.json());

/**
 * Register all application routes
 * This includes all the endpoints defined in the router
 */
app.use(router);

/**
 * Handle requests to undefined routes
 * If a route is not found, throw an AppError with a 404 status code
 */
app.use("*", (_, __, next) => {
  next(new AppError("Route not found", STATUS.NOT_FOUND));
});

/**
 * Global error handling middleware
 * This will catch all errors and send an appropriate response to the client
 */
app.use(ErrorController);

export default app;
