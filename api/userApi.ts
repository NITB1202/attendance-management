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
    },
    create(body: any){
        return axiosInstance.post("/user", body);
    }
}

export default userApi;