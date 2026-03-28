import prisma from "../prisma/prisma.js"
import AppError from "../utils/Apperror.js"

export const createTeamService = async (name, userId) => {

    if (!name) {
        throw new AppError("Name is required", 422)
    }

    const team = await prisma.team.create({
        data: {
            name,
            ownerId: userId,
            members: {
                create: {
                    userId,
                    role: "owner"
                }
            }
        }
    })
    return team
}

export const getUserTeamService = async (userId) => {
    const teams = await prisma.teamMember.findMany({
        where: { userId },
        include: {
            team: true
        }
    })
    return teams
} 