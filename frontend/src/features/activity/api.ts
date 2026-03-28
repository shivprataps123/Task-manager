import axios from "@/lib/axios";

export const getActivitiesAPI = () => {
    return axios.get("/activities");
};
