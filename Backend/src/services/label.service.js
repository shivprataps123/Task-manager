import prisma from "../prisma/prisma.js"
import AppError from "../utils/AppError.js"

export const createLabelService = async (name, color, projectId, userId) => {
    // If projectId is provided, check if user is part of project team
    if (projectId) {
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
    }

    // Create label (global if projectId is null, project-specific otherwise)
    const label = await prisma.label.create({
        data: {
            name,
            color,
            projectId
        }
    });

    return label;
}

export const getLabelsService = async (projectId, userId) => {
    // If projectId is provided, check if user is part of project team
    if (projectId) {
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
    }

    // Fetch labels (global if projectId is null, project-specific otherwise)
    const labels = await prisma.label.findMany({
        where: { projectId },
        orderBy: { createdAt: "desc" }
    });

    return labels;
}

export const updateLabelService = async (labelId, data, userId) => {
    const label = await prisma.label.findUnique({
        where: { id: labelId },
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

    if (!label) {
        throw new AppError("Label not found", 404);
    }

    const isMember = label.project.team.members.some(
        (m) => m.userId === userId
    );

    if (!isMember) {
        throw new AppError("Not authorized", 403);
    }

    const updated = await prisma.label.update({
        where: { id: labelId },
        data
    });

    return updated;
}

export const deleteLabelService = async (labelId, userId) => {
    const label = await prisma.label.findUnique({
        where: { id: labelId },
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

    if (!label) {
        throw new AppError("Label not found", 404);
    }

    const isMember = label.project.team.members.some(
        (m) => m.userId === userId
    );

    if (!isMember) {
        throw new AppError("Not authorized", 403);
    }

    await prisma.label.delete({
        where: { id: labelId }
    });

    return { message: "Label deleted" };
}

export const addLabelToTaskService = async (taskId, labelId, userId) => {
    // Check if task exists and user is authorized
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

    // Check if label exists and belongs to same project
    const label = await prisma.label.findUnique({
        where: { id: labelId }
    });

    if (!label) {
        throw new AppError("Label not found", 404);
    }

    if (label.projectId !== task.projectId) {
        throw new AppError("Label does not belong to this project", 400);
    }

    // Add label to task
    const taskLabel = await prisma.taskLabel.create({
        data: {
            taskId,
            labelId
        },
        include: {
            label: true
        }
    });

    return taskLabel;
}

export const removeLabelFromTaskService = async (taskId, labelId, userId) => {
    // Check if task exists and user is authorized
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

    // Remove label from task
    await prisma.taskLabel.deleteMany({
        where: {
            taskId,
            labelId
        }
    });

    return { message: "Label removed from task" };
}
