import axios from "@/lib/axios";

export const createLabelAPI = (data) => {
    return axios.post("/labels", data);
};

export const getLabelsAPI = (projectId: string) => {
    return axios.get(`/labels/project/${projectId}`);
};

export const updateLabelAPI = (id: string, data) => {
    return axios.patch(`/labels/${id}`, data);
};

export const deleteLabelAPI = (id: string) => {
    return axios.delete(`/labels/${id}`);
};

export const addLabelToTaskAPI = (taskId: string, labelId: string) => {
    return axios.post(`/labels/task/${taskId}/label/${labelId}`);
};

export const removeLabelFromTaskAPI = (taskId: string, labelId: string) => {
    return axios.delete(`/labels/task/${taskId}/label/${labelId}`);
};
