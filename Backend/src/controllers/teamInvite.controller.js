// src/controllers/teamInvite.controller.js

import {
    createInviteService,
    joinTeamService
} from "../services/teamInvite.service.js";

export const createInvite = async (req, res, next) => {
    try {
        const { teamId } = req.body;

        const invite = await createInviteService(teamId, req.userId);

        res.status(201).json({
            success: true,
            data: invite
        });

    } catch (err) {
        next(err);
    }
};

export const joinTeam = async (req, res, next) => {
    try {
        const { token } = req.body;

        const member = await joinTeamService(token, req.userId);

        res.status(200).json({
            success: true,
            message: "Joined team",
            data: member
        });

    } catch (err) {
        next(err);
    }
};