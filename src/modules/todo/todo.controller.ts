import { Request, Response } from "express";
import { todoServices } from "./todo.service";

const createTodo = async (req: Request, res: Response) => {
  const { user_id, title } = req.body;
  try {
    const result = await todoServices.createTodo(user_id, title);
    res.status(201).json({
      success: true,
      message: "todo created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};
const getAllTodos = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.getAllTodos();
    res.status(200).json({
      success: true,
      message: "todos fetched successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const getSingleTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await todoServices.getSingleTodo(id as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "todo not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "todo fetched successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const result = await todoServices.updateTodo(
      id as string,
      title,
      description
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "todo not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "todo updated successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await todoServices.deleteTodo(id as string);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "todo not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "todo deleted successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

export const todoControllers = {
  getAllTodos,
  createTodo,
  getSingleTodo,
  updateTodo,
  deleteTodo,
};
