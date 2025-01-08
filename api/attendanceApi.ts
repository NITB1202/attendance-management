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
    },
    getById(id: number){
        const url = "attendance/"+id;
        return axiosInstance.get(url);
    },
    async updateAbsent(sessionId: number, studentIds: number[]){
        try {
            const results = await Promise.all(
                studentIds.map((studentId) => {
                    const url = `/attendance/${sessionId}/${studentId}`;
                    return axiosInstance.post(url);
                })
            );
            return results;
        } catch (error) {
            console.error("Error occurred during API calls:", error);
            throw error;
        }

    }
}

export default attendanceApi;