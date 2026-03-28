import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { createTeam, getTeams } from "../controllers/team.controller.js";

const teamRouter = express.Router();

teamRouter.post("/team", authMiddleware, createTeam);
teamRouter.get("/teams", authMiddleware, getTeams);

export default teamRouter