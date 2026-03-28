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

export const getActivitiesService = async (userId) => {

    const activities = await prisma.activity.findMany({
        where: {
            project: {
                team: {
                    members: {
                        some: { userId }
                    }
                }
            }
        },
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