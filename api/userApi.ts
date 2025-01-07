import axiosInstance from "./axiosConfig";

const userApi = {
    getById(id: any){
        const url = "/user/"+ id;
        return axiosInstance.get(url);
    },
    getStudents(){
        return axiosInstance.get("/student");
    },
    getTeachers(){
        return axiosInstance.get("/teacher");
    }

}

export default userApi;