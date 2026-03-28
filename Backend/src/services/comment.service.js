import prisma from "../prisma/prisma.js";
import AppError from "../utils/AppError.js";
import { logActivity } from "./activity.service.js";

export const createCommentService = async (text, taskId, userId) => {

    // 1. Get task with team
    const task = await prisma.task.findUnique({
        where: { id: taskId },
        include: {
            project: {
                include: {
                    team: {
                        include: {
                            members: true
                        }
                    }
                }
            }
        }
    });

    if (!task) {
        throw new AppError("Task not found", 404);
    }

    // 2. Check user is part of team
    const isMember = task.project.team.members.some(
        (m) => m.userId === userId
    );

    if (!isMember) {
        throw new AppError("Not authorized", 403);
    }

    // 3. Create comment
    const comment = await prisma.comment.create({
        data: {
            text,
            taskId,
            userId
        },
        include: {
            user: {
                select: { id: true, email: true }
            }
        }
    });
    await logActivity({
        action: "comment_added",
        entity: "comment",
        entityId: comment.id,
        userId,
        projectId: task.projectId
    });

    return comment;
};

export const getCommentsService = async (taskId, userId) => {

    // 1. Validate access
    const task = await prisma.task.findUnique({
        where: { id: taskId },
        include: {
            project: {
                include: {
                    team: {
                        include: {
                            members: true
                        }
                    }
                }
            }
        }
    });

    if (!task) {
        throw new AppError("Task not found", 404);
    }

    const isMember = task.project.team.members.some(
        (m) => m.userId === userId
    );

    if (!isMember) {
        throw new AppError("Access denied", 403);
    }

    // 2. Fetch comments
    const comments = await prisma.comment.findMany({
        where: { taskId },
        orderBy: { createdAt: "asc" },
        include: {
            user: {
                select: { id: true, email: true }
            }
        }
    });

    return comments;
};