import axiosInstance from "./axiosConfig";

const attendanceApi = {
    create(id: number){
        const url = "/attendance/" + id;
        return axiosInstance.post(url);
    },
    search(studentCode: string, startDate: string, endDate: string){
        const url = "/student/search?studentCode="+ studentCode + "&startDate="+
        startDate + "&endDate=" + endDate;
        return axiosInstance.get(url);
    },
    get(){
        return axiosInstance.get("/attendance");
    }
}

export default attendanceApi;