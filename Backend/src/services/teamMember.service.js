import prisma from "../prisma/prisma.js"
import AppError from "../utils/Apperror.js"

export const addMemberService = async (teamId, email, role, currentUserId) => {
    //check if curr user is admin/owner
    const currentMember = await prisma.teamMember.findFirst({
        where: {
            teamId,
            userId: currentUserId
        }
    })

    if (!currentMember || !['owner', 'admin'].includes(currentMember.role)) {
        throw new AppError("Not authorized to add members", 403);
    }

    //find user by email
    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        throw new AppError("User not found", 404)
    }

    //check if already member
    const existing = await prisma.teamMember.findFirst({
        where: {
            teamId,
            userId: user.id
        }
    })

    if (existing) {
        throw new AppError("User already in team", 409)
    }

    //add member
    const member = await prisma.teamMember.create({
        data: {
            teamId,
            userId: user.id,
            role: role || "member"
        }
    })
    return member
}

export const getMemberService = async (teamId, userId) => {
    //check access
    const isMember = await prisma.teamMember.findFirst({
        where: { teamId, userId }
    })
    if (!isMember) {
        throw new AppError("Access Denied", 403)
    }

    const members = await prisma.teamMember.findMany({
        where: { teamId },
        include: {
            user: {
                select: { id: true, email: true }
            }
        }
    })
    return members
}