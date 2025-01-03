import axiosInstance from "./axiosConfig";

const studentApi = {
    getStudentDashBoard() {
        return axiosInstance.get( 
      "/classroom/student",
            {attachToken: true}
        );
    },
}

export default studentApi;