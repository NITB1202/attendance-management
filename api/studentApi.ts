import axiosInstance from "./axiosConfig";

const studentApi = {
    getStudentDashBoard() {
        return axiosInstance.get("/classroom/student");
    },
}

export default studentApi;