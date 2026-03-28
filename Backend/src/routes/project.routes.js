import express from "express"
import authMiddleware from "../middleware/auth.middleware.js";
import { createProject, getProjects } from "../controllers/project.controller.js";

const projectRouter = express.Router();

projectRouter.post("/projects", authMiddleware, createProject);
projectRouter.get("/projects", authMiddleware, getProjects);

export default projectRouter