import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    assignTask
} from "../controllers/task.controller.js";

const taskRouter = express.Router();

taskRouter.post("/tasks", authMiddleware, createTask);
taskRouter.get("/tasks", authMiddleware, getTasks);
taskRouter.patch("/tasks/:id", authMiddleware, updateTask);
taskRouter.delete("/tasks/:id", authMiddleware, deleteTask);
taskRouter.patch("/tasks/:id/assign", authMiddleware, assignTask);

export default taskRouter;