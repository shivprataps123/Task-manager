import { createTeamService, getUserTeamService } from "../services/team.service.js";

export const createTeam = async (req, res, next) => {
    try {
        const { name } = req.body;
        const team = await createTeamService(name, req.userId);

        res.status(201).json({
            success: true,
            message: "Team created",
            data: team
        })
    } catch (error) {
        next(error)
    }
}

export const getTeams = async (req, res, next) => {
    try {
        const teams = await getUserTeamService(req.userId);
        res.status(200).json({
            success: true,
            data: teams
        })
    } catch (error) {
        next(error)
    }
}