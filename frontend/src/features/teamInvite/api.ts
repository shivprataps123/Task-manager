import axios from "@/lib/axios";

export const createInviteAPI = (data: { email: string; teamId: string }) => {
    return axios.post("/team/invite", data);
};

export const joinTeamAPI = (data: { inviteCode: string }) => {
    return axios.post("/team/join", data);
};
