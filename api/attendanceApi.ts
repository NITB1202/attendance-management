import axiosInstance from "./axiosConfig";

const attendanceApi = {
    create(id: number){
        const url = "/attendance/" + id;
        return axiosInstance.post(
            url,
            {},
            {attachToken: true}
        );
    }
}

export default attendanceApi;