import {
    createLabelService,
    getLabelsService,
    updateLabelService,
    deleteLabelService,
    addLabelToTaskService,
    removeLabelFromTaskService
} from "../services/label.service.js";

export const createLabel = async (req, res, next) => {
    try {
        const { name, color, projectId } = req.body;

        const label = await createLabelService(
            name,
            color,
            projectId,
            req.userId
        );

        res.status(201).json({
            success: true,
            data: label
        });

    } catch (err) {
        next(err);
    }
};

export const getLabels = async (req, res, next) => {
    try {
        const { projectId } = req.params;

        const labels = await getLabelsService(
            projectId,
            req.userId
        );

        res.status(200).json({
            success: true,
            data: labels
        });

    } catch (err) {
        next(err);
    }
};

export const updateLabel = async (req, res, next) => {
    try {
        const label = await updateLabelService(
            req.params.id,
            req.body,
            req.userId
        );

        res.status(200).json({
            success: true,
            data: label
        });

    } catch (err) {
        next(err);
    }
};

export const deleteLabel = async (req, res, next) => {
    try {
        const result = await deleteLabelService(
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

export const addLabelToTask = async (req, res, next) => {
    try {
        const { taskId, labelId } = req.params;

        const taskLabel = await addLabelToTaskService(
            taskId,
            labelId,
            req.userId
        );

        res.status(200).json({
            success: true,
            data: taskLabel
        });

    } catch (err) {
        next(err);
    }
};

export const removeLabelFromTask = async (req, res, next) => {
    try {
        const { taskId, labelId } = req.params;

        const result = await removeLabelFromTaskService(
            taskId,
            labelId,
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
