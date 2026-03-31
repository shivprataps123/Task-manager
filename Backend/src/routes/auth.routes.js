import express from "express";
import { login, signup, getMe, updateProfile } from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/me", authMiddleware, getMe);
authRouter.put("/profile", authMiddleware, updateProfile);

export default authRouter;