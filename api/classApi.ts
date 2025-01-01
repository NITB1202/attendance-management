import axiosInstance from "./axiosConfig";

const classApi = {
    getRollCallClasses(){
        return axiosInstance.get(
            "/classroom/roll-call",
            {attachToken: true}
        )
    }
}

export default classApi;