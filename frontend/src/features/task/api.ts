import axios from "@/lib/axios";

export const createTaskAPI = (data) => {
    return axios.post("/tasks", data);
};

export const getTasksAPI = () => {
    return axios.get("/tasks");
};

export const updateTaskAPI = (id, data) => {
    return axios.patch(`/tasks/${id}`, data);
};

export const deleteTaskAPI = (id) => {
    return axios.delete(`/tasks/${id}`);
};

export const assignTaskAPI = (id, data) => {
    return axios.patch(`/tasks/${id}/assign`, data);
};
