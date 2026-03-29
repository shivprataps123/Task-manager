import { createProjectService, getProjectsService } from "../services/project.service.js";

export const createProject = async (req, res, next) => {
    try {
        const { name, teamId } = req.body;

        const project = await createProjectService(
            name,
            teamId,
            req.userId
        )
        res.status(201).json({
            success: true,
            message: "Project created",
            data: project
        })
    } catch (error) {
        next(error)
    }
}

export const getProjects = async (req, res, next) => {
    try {
        const { teamId } = req.query;
        const projects = await getProjectsService(req.userId, teamId);

        res.status(200).json({
            success: true,
            data: projects
        })
    } catch (error) {
        next(error)
    }
}