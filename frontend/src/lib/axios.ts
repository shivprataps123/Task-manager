import axios from "axios";
import Cookies from 'js-cookie'

const instance = axios.create({
    baseURL: "http://localhost:3000/api",
});

// attach token automatically
instance.interceptors.request.use((config) => {
    const token = Cookies.get("token");

    if (token) {
        config.headers.Authorization = token;
    }

    return config;
});

export default instance;