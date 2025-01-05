import axiosInstance from "./axiosConfig";

const questionApi = {
    getBySessionId(id:number){
        const url = "/question/" + id;
        return axiosInstance.get(url);
    },
    create(sessionId: number, content: string, parentId: number| undefined){
        const body = parentId !== undefined ? {sessionId, content, parentId}: {sessionId, content}
        return axiosInstance.post("/question/add", body);
    }
}

export default questionApi;