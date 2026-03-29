import prisma from "../prisma/prisma.js"

export const logActivity = async ({
    action,
    entity,
    entityId,
    userId,
    projectId
}) => {
    await prisma.activity.create({
        data: {
            action,
            entity,
            entityId,
            userId,
            projectId
        }
    })
}

export const getActivitiesService = async (userId, teamId) => {

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

    const activities = await prisma.activity.findMany({
        where: whereClause,
        orderBy: {
            createdAt: "desc"
        },
        include: {
            user: {
                select: { id: true, email: true }
            },
            project: {
                select: { id: true, name: true }
            }
        }
    });

    return activities;
};