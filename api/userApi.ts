import axiosInstance from "./axiosConfig";

const userApi = {
    getById(id: any){
        const url = "/user/"+ id;
        return axiosInstance.get(url);
    }

}

export default userApi;