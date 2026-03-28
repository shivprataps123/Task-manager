import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
    createComment,
    getComments
} from "../controllers/comment.controller.js";

const commentRouter = express.Router();

commentRouter.post("/comments", authMiddleware, createComment);
commentRouter.get("/comments", authMiddleware, getComments);

export default commentRouter;