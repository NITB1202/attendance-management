import axiosInstance from "./axiosConfig";

const courseApi = {
    getAll(){
        return axiosInstance.get("/course");
    },
    create(body: any){
        return axiosInstance.post("/course", body);
    },
    update(id: number, name: string, courseCode: string){
        const url = "/course/"+id;
        return axiosInstance.put(url, {name, courseCode});
    }
}

export default courseApi;