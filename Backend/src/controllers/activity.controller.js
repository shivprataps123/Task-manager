import { getActivitiesService } from "../services/activity.service.js";

export const getActivities = async (req, res, next) => {
    try {
        const { teamId, page, limit } = req.query;
        const result = await getActivitiesService(req.userId, teamId, page, limit);

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (err) {
        next(err);
    }
};