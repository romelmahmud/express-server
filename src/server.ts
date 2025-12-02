import express, { Request, Response } from "express";
import config from "./config";
import initDB from "./config/db";
import logger from "./config/logger";
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
// user routes
app.use("/users", userRoutes);

// todo routes
app.use("/todos", todoRoutes);

// app.delete("/todos/:id", async (req: Request, res: Response) => {
//   try {
//     const result = await pool.query(`DELETE FROM todos WHERE id = $1`, [
//       req.params.id,
//     ]);

//     if (result.rowCount === 0) {
//       res.status(404).json({
//         success: false,
//         message: "todo not found",
//       });
//     } else {
//       res.status(200).json({
//         success: true,
//         message: "todo deleted successfully",
//         data: result.rows[0],
//       });
//     }
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//       details: error,
//     });
//   }
// });
// handle invalid routes
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
