import axios from "@/lib/axios";

export const createProjectAPI = (data) => {
    return axios.post("/projects", data);
};

export const getProjectsAPI = (teamId?: string) => {
    const params = teamId ? { teamId } : {};
    return axios.get("/projects", { params });
};
