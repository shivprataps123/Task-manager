import axios from "@/lib/axios";

export const getActivitiesAPI = (teamId?: string, page?: number, limit?: number) => {
    const params: Record<string, string | number> = {};
    if (teamId) params.teamId = teamId;
    if (page) params.page = page;
    if (limit) params.limit = limit;
    return axios.get("/activities", { params });
};
