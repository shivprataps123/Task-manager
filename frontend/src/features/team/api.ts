import axios from "@/lib/axios";

export const inviteMemberAPI = (data: { email: string; teamId: string }) => {
    return axios.post("/team/invite", data);
};

export const getMembersAPI = (teamId: string) => {
    return axios.get(`/team/${teamId}/members`);
};

export const getTeamsAPI = () => {
    return axios.get("/teams");
};

export const createTeamAPI = (data: { name: string; description?: string }) => {
    return axios.post("/team", data);
};

export const joinTeamAPI = (data: { inviteCode: string }) => {
    return axios.post("/team/join", data);
};

export const addMemberAPI = (teamId: string, data: { email: string; role: string }) => {
    return axios.post(`/team/${teamId}/members`, data);
};
