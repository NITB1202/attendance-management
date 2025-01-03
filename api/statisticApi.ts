import axiosInstance from "./axiosConfig";

const statisticApi = {
    student(){
        return axiosInstance.get("/statistic/student");
    }
}

export default statisticApi;