import axiosInstance from "./axiosConfig";

const classApi = {
    getRollCallClasses(){
        return axiosInstance.get("/classroom/roll-call");
    },
    getByStudentId(){
        return axiosInstance.get("/classroom/student");
    },
    getById(id:number){
        const url = "/classroom/" + id;
        return axiosInstance.get(url);
    }
}

export default classApi;