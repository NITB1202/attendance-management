import axiosInstance from "./axiosConfig";

const classApi = {
    getRollCallClasses(){
        return axiosInstance.get("/classroom/roll-call");
    },
    getByUser(){
        return axiosInstance.get("/classroom/user");
    }
}

export default classApi;