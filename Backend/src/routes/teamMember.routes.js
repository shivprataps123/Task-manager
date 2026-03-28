import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { addMember, getMembers } from "../controllers/teamMember.controller.js";

const teamMemberRouter = express.Router();

teamMemberRouter.post("/team/:teamId/members", authMiddleware, addMember);
teamMemberRouter.get("/team/:teamId/members", authMiddleware, getMembers)

export default teamMemberRouter