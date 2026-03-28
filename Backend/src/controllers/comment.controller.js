import {
    createCommentService,
    getCommentsService
} from "../services/comment.service.js";

export const createComment = async (req, res, next) => {
    try {
        const { text, taskId } = req.body;

        const comment = await createCommentService(
            text,
            taskId,
            req.userId
        );

        res.status(201).json({
            success: true,
            message: "Comment added",
            data: comment
        });

    } catch (err) {
        next(err);
    }
};

export const getComments = async (req, res, next) => {
    try {
        const { taskId } = req.query;

        const comments = await getCommentsService(
            taskId,
            req.userId
        );

        res.status(200).json({
            success: true,
            data: comments
        });

    } catch (err) {
        next(err);
    }
};