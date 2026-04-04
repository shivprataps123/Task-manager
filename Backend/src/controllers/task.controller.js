import {
    createTaskService,
    getTasksService,
    updateTaskService,
    deleteTaskService,
    assignTaskService
} from "../services/task.service.js";

export const createTask = async (req, res, next) => {
    try {
        const task = await createTaskService(req.body, req.userId);

        res.status(201).json({
            success: true,
            data: task
        });

    } catch (err) {
        next(err);
    }
};

export const getTasks = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, status, assignedTo, teamId, projectId } = req.query;

        const result = await getTasksService(
            req.userId,
            Number(page),
            Number(limit),
            status,
            assignedTo,
            teamId,
            projectId
        );

        res.status(200).json({
            success: true,
            ...result
        });

    } catch (err) {
        next(err);
    }
};

export const updateTask = async (req, res, next) => {
    try {
        const task = await updateTaskService(
            req.params.id,
            req.body,
            req.userId
        );

        res.status(200).json({
            success: true,
            data: task
        });

    } catch (err) {
        next(err);
    }
};

export const deleteTask = async (req, res, next) => {
    try {
        const result = await deleteTaskService(
            req.params.id,
            req.userId
        );

        res.status(200).json({
            success: true,
            message: result.message
        });

    } catch (err) {
        next(err);
    }
};

export const assignTask = async (req, res, next) => {
    try {
        const { assignedToId } = req.body;

        const task = await assignTaskService(
            req.params.id,
            assignedToId,
            req.userId
        );

        res.status(200).json({
            success: true,
            message: "Task assigned",
            data: task
        });

    } catch (err) {
        next(err);
    }
};