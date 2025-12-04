import express from "express";
import { todoControllers } from "./todo.controller";

const router = express.Router();

router.get("/", todoControllers.getAllTodos);
router.post("/", todoControllers.createTodo);
router.get("/:id", todoControllers.getSingleTodo);
router.put("/:id", todoControllers.updateTodo);
router.delete("/:id", todoControllers.deleteTodo);

export const todoRoutes = router;
