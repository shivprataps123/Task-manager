import axios from "@/lib/axios";

export const createCommentAPI = (data) => {
    return axios.post("/comments", data);
};

export const getCommentsAPI = (taskId) => {
    return axios.get(`/comments?taskId=${taskId}`);
};
