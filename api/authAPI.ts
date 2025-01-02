import axiosInstance from "./axiosConfig";

const authAPI = {
  login: (username: string, password: string) => {
    return axiosInstance.post(
      "/auth/login", 
      { username, password }
    );
  },
  sendCode: (email: string) => {
    return axiosInstance.post(
      "/user/update-password/code", 
      { email }
    );
  },
  verify: (email: string, code: string) => {
    const url = "/user/update-password/verify-code/"  + code;
    return axiosInstance.post(
      url,
      { email }
    );
  },
  reset: (email: string, newPassword: string) => {
    return axiosInstance.put(
      "/user/update-password",
      { email, newPassword }
    )
  }
};

export default authAPI;
