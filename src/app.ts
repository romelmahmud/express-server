import express, { Request, Response } from "express";
import config from "./config";
import initDB from "./config/db";
import logger from "./middleware/logger";
import { authRoutes } from "./modules/auth/auth.route";
import { todoRoutes } from "./modules/todo/todo.routes";
import { userRoutes } from "./modules/user/user.route";

export const app = express();
const port = config.port;
// parser
app.use(express.json());
// for form data
app.use(express.urlencoded({ extended: true }));

// initializing database

initDB();

app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello, Express with TypeScript!");
});

app.use("/users", userRoutes);
app.use("/todos", todoRoutes);
app.use("/auth", authRoutes);
// handle invalid routes
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

export default app;
