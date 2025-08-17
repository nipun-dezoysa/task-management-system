import axiosInstance from "../configs/axiosInstance";

export const getUserDetails = async () => {
  return axiosInstance.get("/user");
};

export const updateUser = async (data: {
  firstName: string;
  lastName: string;
  email: string;
}) => {
  return axiosInstance.put("/user", data);
};
