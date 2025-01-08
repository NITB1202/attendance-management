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
    },
    sendSurvey(sessionId: number, underStandingRate: number, efficientRate: number){
        return axiosInstance.put("/attendance/survey",
            {sessionId, underStandingRate, efficientRate}
        );
    }
}

export default userApi;