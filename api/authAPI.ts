import axiosInstance from "./axiosConfig";

const authAPI = {
  login: (username: string, password: string) => {
    return axiosInstance.post(
      "/auth/login", 
      { username, password }, 
      { attachToken: false }
    );
  },
  sendCode: (email: string) => {
    return axiosInstance.post(
      "/user/update-password/code", 
      { email }, 
      { attachToken: false }
    );
  },
  verify: (email: string, code: string) => {
    const url = "/user/update-password/verify-code/"  + code;
    return axiosInstance.post(
      url,
      {email},
      {attachToken: false}
    );
  },
  reset: (email: string, newPassword: string) => {
    return axiosInstance.put(
      "/user/update-password",
      {email, newPassword},
      {attachToken: false}
    )
  }
};

export default authAPI;
