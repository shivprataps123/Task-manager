import express from "express";
import {
    createLabel,
    getLabels,
    updateLabel,
    deleteLabel,
    addLabelToTask,
    removeLabelFromTask
} from "../controllers/label.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const labelRouter = express.Router();

labelRouter.post("/", authMiddleware, createLabel);
labelRouter.get("/project/:projectId", authMiddleware, getLabels);
labelRouter.patch("/:id", authMiddleware, updateLabel);
labelRouter.delete("/:id", authMiddleware, deleteLabel);
labelRouter.post("/task/:taskId/label/:labelId", authMiddleware, addLabelToTask);
labelRouter.delete("/task/:taskId/label/:labelId", authMiddleware, removeLabelFromTask);

export default labelRouter;
