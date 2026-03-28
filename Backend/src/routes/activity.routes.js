import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getActivities } from "../controllers/activity.controller.js";

const activityRouter = express.Router();

activityRouter.get("/activities", authMiddleware, getActivities);

export default activityRouter;