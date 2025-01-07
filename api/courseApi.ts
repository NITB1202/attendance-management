import axiosInstance from "./axiosConfig";

const courseApi = {
    getAll(){
        return axiosInstance.get("/course");
    }
}