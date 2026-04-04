import axios from "@/lib/axios";

export const createTaskAPI = (data) => {
    return axios.post("/tasks", data);
};

export const getTasksAPI = (teamId?: string, projectId?: string) => {
    const params: Record<string, string> = {};
    if (teamId) params.teamId = teamId;
    if (projectId) params.projectId = projectId;
    return axios.get("/tasks", { params });
};

export const updateTaskAPI = (id, data) => {
    return axios.patch(`/tasks/${id}`, data);
};

export const deleteTaskAPI = (id) => {
    return axios.delete(`/tasks/${id}`);
};

export const assignTaskAPI = (id, data: { assigneeId: string }) => {
    return axios.patch(`/tasks/${id}/assign`, { assignedToId: data.assigneeId });
};
