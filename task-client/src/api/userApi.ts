import axiosInstance from "../configs/axiosInstance";

export const getUserDetails = async () => {
  return axiosInstance.get("/user");
};
