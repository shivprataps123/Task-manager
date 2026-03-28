import { addMemberService, getMemberService } from "../services/teamMember.service.js";

export const addMember = async (req, res, next) => {
    try {
        const { teamId } = req.params;
        const { email, role } = req.body;

        const member = await addMemberService(teamId, email, role, req.userId)
        res.status(201).json({
            success: true,
            message: "Member added",
            data: member
        });

    } catch (err) {
        next(err);
    }
};

export const getMembers = async (req, res, next) => {
    try {
        const { teamId } = req.params;

        const members = await getMemberService(teamId, req.userId);

        res.status(200).json({
            success: true,
            data: members
        });

    } catch (err) {
        next(err);
    }
};