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
    },
    create(info: any, file: any){
        const url = "/classroom?classroom-info="+ info;

        const formData = new FormData();
        formData.append("classroom-info", info);
        formData.append("student-file", file);

        return axiosInstance.post("/classroom", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
        });
    },
    addSession(numberSessions: number, classRoomId: number){
       return axiosInstance.post("/session/7",
        {numberSessions, classRoomId: classRoomId}
       );
    },
    async assignRollCaller(studentId: number, sessionIds: number[]){
        try {
            const results = await Promise.all(
              sessionIds.map((sessionId) => {
                const url = `/session/${sessionId}/${studentId}`;
                return axiosInstance.put(url);
              })
            );
        
            return results;
          } catch (error) {
            console.error("Error occurred during API calls:", error);
            throw error;
          }
    },
    addStudent(classId: any, studentId: number){
        const url = "/classroom/"+ classId + "/"+ studentId;
        return axiosInstance.put(url);
    },
    getViolation(classId: any){
        const url = "/student/violation/"+ classId;
        return axiosInstance.get(url);
    },
    setRollCaller(studentId: number, sessionId: number){
        const url = "/session/"+sessionId+"/"+ studentId;
        return axiosInstance.put(url);
    }
}
export default classApi;