import express from "express";
import cors from "cors"
import authRouter from "./routes/auth.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import teamRouter from "./routes/team.route.js";
import teamMemberRouter from "./routes/teamMember.routes.js";
import teamInviteRouter from "./routes/teamInvite.routes.js";
import projectRouter from "./routes/project.routes.js";
import taskRouter from "./routes/task.routes.js";
import commentRouter from "./routes/comment.routes.js";
import activityRouter from "./routes/activity.routes.js";

const app = express();

app.use(cors())

app.use(express.json());

// routes
app.use("/api/auth", authRouter);
app.use("/api", teamRouter)
app.use("/api", teamMemberRouter);
app.use("/api", teamInviteRouter);
app.use("/api", projectRouter);
app.use("/api", taskRouter);
app.use("/api", commentRouter);
app.use("/api", activityRouter);

// error handler (ALWAYS LAST)
app.use(errorHandler);

export default app;