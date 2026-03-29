import axios from "@/lib/axios";

export const getActivitiesAPI = (teamId?: string) => {
    const params = teamId ? { teamId } : {};
    return axios.get("/activities", { params });
};
