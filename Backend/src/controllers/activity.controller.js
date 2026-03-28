import { getActivitiesService } from "../services/activity.service.js";

export const getActivities = async (req, res, next) => {
    try {
        const activities = await getActivitiesService(req.userId);

        res.status(200).json({
            success: true,
            data: activities
        });

    } catch (err) {
        next(err);
    }
};