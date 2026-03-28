import axios from "@/lib/axios";

export const createProjectAPI = (data) => {
    return axios.post("/projects", data);
};

export const getProjectsAPI = () => {
    return axios.get("/projects");
};
