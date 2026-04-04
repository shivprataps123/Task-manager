import prisma from "../prisma/prisma.js"

export const logActivity = async ({
    action,
    entity,
    entityId,
    userId,
    projectId,
    details
}) => {
    await prisma.activity.create({
        data: {
            action,
            entity,
            entityId,
            userId,
            projectId,
            details: details ? JSON.parse(details) : undefined
        }
    })
}

export const getActivitiesService = async (userId, teamId, page = 1, limit = 20) => {

    const whereClause = {
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
        whereClause.project.teamId = teamId;
    }

    const skip = (page - 1) * limit;

    const [activities, total] = await Promise.all([
        prisma.activity.findMany({
            where: whereClause,
            skip,
            take: Number(limit),
            orderBy: {
                createdAt: "desc"
            },
            include: {
                user: {
                    select: { id: true, email: true, name: true }
                },
                project: {
                    select: { id: true, name: true }
                }
            }
        }),
        prisma.activity.count({
            where: whereClause
        })
    ]);

    return {
        activities,
        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit)
        }
    };
};