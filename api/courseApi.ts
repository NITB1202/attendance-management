import axiosInstance from "./axiosConfig";

const courseApi = {
    getAll(){
        return axiosInstance.get("/course");
    },
    create(body: any){
        return axiosInstance.post("/course", body);
    }
}

export default courseApi;