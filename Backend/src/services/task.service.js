import prisma from "../prisma/prisma.js";
import AppError from "../utils/AppError.js";
// import redisClient from "../utils/redis.js";
import { logActivity } from "./activity.service.js";

export const createTaskService = async (data, userId) => {
    const { title, description, projectId, assignedToId } = data;

    // 1. Check user is part of project team
    const project = await prisma.project.findUnique({
        where: { id: projectId },
        include: {
            team: {
                include: {
                    members: true
                }
            }
        }
    });

    if (!project) {
        throw new AppError("Project not found", 404);
    }

    const isMember = project.team.members.some(
        (m) => m.userId === userId
    );

    if (!isMember) {
        throw new AppError("Not authorized", 403);
    }

    // 2. Optional: check assigned user is in team
    if (assignedToId) {
        const validUser = project.team.members.some(
            (m) => m.userId === assignedToId
        );

        if (!validUser) {
            throw new AppError("Assigned user not in team", 400);
        }
    }

    // 3. Create task
    const task = await prisma.task.create({
        data: {
            title,
            description,
            projectId,
            assignedToId,
            status: "todo"
        },
        include: {
            assignedTo: {
                select: { id: true, email: true, name: true }
            }
        }
    });

    if (assignedToId) {
        await logActivity({
            action: "task_assigned",
            entity: "task",
            entityId: task.id,
            userId,
            projectId: task.projectId,
            details: JSON.stringify({
                assignedTo: {
                    id: task.assignedTo.id,
                    email: task.assignedTo.email,
                    name: task.assignedTo.name || task.assignedTo.email
                }
            })
        });
    } else {
        await logActivity({
            action: "task_created",
            entity: "task",
            entityId: task.id,
            userId,
            projectId: task.projectId
        });
    }

    return task;
};

export const getTasksService = async (
    userId,
    page = 1,
    limit = 10,
    status,
    assignedTo,
    teamId,
    projectId
) => {

    const cacheKey = `tasks:${userId}:${page}:${limit}:${status || "all"}:${assignedTo || "all"}:${teamId || "all"}:${projectId || "all"}`;

    // 🔥 1. Check Cache
    // const cached = await redisClient.get(cacheKey);

    // if (cached) {
    //     console.log("CACHE HIT 🔥");
    //     return JSON.parse(cached);
    // }

    console.log("CACHE MISS ❌");

    const skip = (page - 1) * limit;

    const filters = {
        project: {
            team: {
                members: {
                    some: { userId }
                }
            }
        }
    };

    // If teamId is provided, filter by that specific team
    if (teamId) {
        filters.project.teamId = teamId;
    }

    if (status) {
        filters.status = status;
    }

    if (assignedTo) {
        filters.assignedToId = assignedTo;
    }

    if (projectId) {
        filters.projectId = projectId;
    }

    const [tasks, total] = await Promise.all([
        prisma.task.findMany({
            where: filters,
            skip,
            take: Number(limit),
            orderBy: {
                createdAt: "desc"
            },
            include: {
                project: {
                    select: { id: true, name: true }
                },
                assignedTo: {
                    select: { id: true, email: true, name: true }
                }
            }
        }),

        prisma.task.count({
            where: filters
        })
    ]);

    const result = {
        tasks,
        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit)
        }
    };

    // 🔥 2. Store in Redis (TTL = 60 sec)
    // await redisClient.setEx(
    //     cacheKey,
    //     60,
    //     JSON.stringify(result)
    // );

    return result;
};

export const updateTaskService = async (taskId, data, userId) => {

    const task = await prisma.task.findUnique({
        where: { id: taskId },
        include: {
            project: {
                include: {
                    team: {
                        include: { members: true }
                    }
                }
            },
            assignedTo: {
                select: { id: true, email: true, name: true }
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
        throw new AppError("Not authorized", 403);
    }

    const updated = await prisma.task.update({
        where: { id: taskId },
        data,
        include: {
            assignedTo: {
                select: { id: true, email: true, name: true }
            }
        }
    });

    if (data.assignedToId !== undefined) {
        if (data.assignedToId) {
            await logActivity({
                action: "task_assigned",
                entity: "task",
                entityId: task.id,
                userId,
                projectId: task.projectId,
                details: JSON.stringify({
                    assignedTo: {
                        id: updated.assignedTo?.id || data.assignedToId,
                        email: updated.assignedTo?.email || "Unknown",
                        name: updated.assignedTo?.name || updated.assignedTo?.email || "Unknown"
                    }
                })
            });
        } else {
            await logActivity({
                action: "task_unassigned",
                entity: "task",
                entityId: task.id,
                userId,
                projectId: task.projectId
            });
        }
    } else {
        await logActivity({
            action: "task_updated",
            entity: "task",
            entityId: task.id,
            userId,
            projectId: task.projectId
        });
    }

    return updated;
};

export const deleteTaskService = async (taskId, userId) => {

    const task = await prisma.task.findUnique({
        where: { id: taskId },
        include: {
            project: {
                include: {
                    team: {
                        include: { members: true }
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
        throw new AppError("Not authorized", 403);
    }

    await prisma.task.delete({
        where: { id: taskId }
    });

    await logActivity({
        action: "task_deleted",
        entity: "task",
        entityId: taskId,
        userId,
        projectId: task.projectId
    });

    return { message: "Task deleted" };
};

export const assignTaskService = async (taskId, assignedToId, userId) => {

    // 1. Get task with team info
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

    const teamMembers = task.project.team.members;

    // 2. Check current user is part of team
    const isUserMember = teamMembers.some(
        (m) => m.userId === userId
    );

    if (!isUserMember) {
        throw new AppError("Not authorized", 403);
    }

    // 3. Handle unassignment
    if (!assignedToId) {
        const updatedTask = await prisma.task.update({
            where: { id: taskId },
            data: { assignedToId: null },
            include: {
                assignedTo: {
                    select: { id: true, email: true, name: true }
                }
            }
        });

        await logActivity({
            action: "task_unassigned",
            entity: "task",
            entityId: task.id,
            userId,
            projectId: task.projectId
        });

        return updatedTask;
    }

    // 4. Check assigned user is part of team
    const isValidAssignee = teamMembers.some(
        (m) => m.userId === assignedToId
    );

    if (!isValidAssignee) {
        throw new AppError("User not in team", 400);
    }

    // 5. Assign task
    const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: {
            assignedToId
        },
        include: {
            assignedTo: {
                select: { id: true, email: true }
            }
        }
    });

    const assignee = await prisma.user.findUnique({
        where: { id: assignedToId },
        select: { id: true, email: true, name: true }
    });

    await logActivity({
        action: "task_assigned",
        entity: "task",
        entityId: task.id,
        userId,
        projectId: task.projectId,
        details: JSON.stringify({
            assignedTo: {
                id: assignee.id,
                email: assignee.email,
                name: assignee.name || assignee.email
            },
            assignedBy: userId
        })
    });

    return updatedTask;
};