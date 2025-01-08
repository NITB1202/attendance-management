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
    },
    updateClassMonitor(classId: any, studentId: any){
        const url = "/classroom/"+ classId +"/"+ studentId;
        return axiosInstance.post(url);
    },
    getAll(){
        return axiosInstance.get("/classroom");
    }
}

export default classApi;