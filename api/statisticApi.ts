import axiosInstance from "./axiosConfig";

const statisticApi = {
    student(){
        return axiosInstance.get("/statistic/student");
    },
    teacher(id: number){
        const url = "/statistic/teacher/" + id;
        return axiosInstance.get(url);
    },
    manager(timeDigit: string){
        const url = "/statistic/"+ timeDigit;
        return axiosInstance.get(url);
    }
}

export default statisticApi;