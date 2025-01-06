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
    },
    getByTeacherId(){
        return axiosInstance.get("/classroom/teacher");
    },
    update(id: any, body: any){
        const url = "/classroom/update/"+id;
        return axiosInstance.put(url, body);
    }
}

export default classApi;