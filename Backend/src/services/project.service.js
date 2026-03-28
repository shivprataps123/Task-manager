import prisma from "../prisma/prisma.js"
import AppError from "../utils/AppError.js"

export const createProjectService = async (name, teamId, userId) => {
    //check if user belongs to team
    const member = await prisma.teamMember.findFirst({
        where: {
            teamId,
            userId
        }
    })
    if (!member) {
        throw new AppError("Not part of this team", 403)
    }

    //create project
    const project = await prisma.project.create({
        data: {
            name, teamId
        }
    })
    return project
}

export const getProjectsService = async (userId) => {
    const projects = await prisma.project.findMany({
        where: {
            team: {
                members: {
                    some: {
                        userId
                    }
                }
            }
        },
        include: {
            team: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    })
    return projects
}