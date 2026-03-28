// src/routes/teamInvite.routes.js

import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
    createInvite,
    joinTeam
} from "../controllers/teamInvite.controller.js";

const teamInviteRouter = express.Router();

teamInviteRouter.post("/team/invite", authMiddleware, createInvite);
teamInviteRouter.post("/team/join", authMiddleware, joinTeam);

export default teamInviteRouter;