import express from "express";
import auth from "../../middleware/auth";
import logger from "../../middleware/logger";
import { userControllers } from "./user.controller";

const router = express.Router();
// user routes
router.post("/", userControllers.createUser);
router.get("/", logger, auth("admin"), userControllers.getAllUsers);
router.get("/:id", auth("admin", "user"), userControllers.getSingleUser);
router.put("/:id", userControllers.updateUser);
router.delete("/:id", userControllers.deleteUser);

export const userRoutes = router;
