import axios from "@/lib/axios"

export const signupAPI = (data) => {
    return axios.post("/auth/signup", data);
};

export const loginAPI = (data) => {
    return axios.post("/auth/login", data);
};

export const getMeAPI = () => {
    return axios.get("/auth/me");
};

export const updateProfileAPI = (data) => {
    return axios.put("/auth/profile", data);
};