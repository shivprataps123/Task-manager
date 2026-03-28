import prisma from "../prisma/prisma.js";
import AppError from "../utils/AppError.js";
import crypto from "crypto";

export const createInviteService = async (teamId, userId) => {

    // check user role
    const member = await prisma.teamMember.findFirst({
        where: { teamId, userId }
    });

    if (!member || !["owner", "admin"].includes(member.role)) {
        throw new AppError("Not authorized", 403);
    }

    const token = crypto.randomBytes(20).toString("hex");

    const invite = await prisma.teamInvite.create({
        data: {
            teamId,
            token,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24) // 24 hrs
        }
    });

    return invite;
};

export const joinTeamService = async (token, userId) => {

    const invite = await prisma.teamInvite.findUnique({
        where: { token }
    });

    if (!invite) {
        throw new AppError("Invalid invite", 404);
    }

    if (new Date() > invite.expiresAt) {
        throw new AppError("Invite expired", 400);
    }

    // check already member
    const existing = await prisma.teamMember.findFirst({
        where: {
            teamId: invite.teamId,
            userId
        }
    });

    if (existing) {
        throw new AppError("Already in team", 409);
    }

    // join team
    const member = await prisma.teamMember.create({
        data: {
            teamId: invite.teamId,
            userId,
            role: "member"
        }
    });

    return member;
};