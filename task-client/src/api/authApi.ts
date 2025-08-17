import axiosInstance from "../configs/axiosInstance";

export const loginToAccount = async (payload: {
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.post("/login", payload);
  return response.data;
};

export const registerAccount = async (payload: {
  fname: string;
  lname: string;
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.post("/register", payload);
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await axiosInstance.post("/forgot-password", { email });
  return response.data;
};

export const getResetTokenDetails = async (token: string) => {
  const response = await axiosInstance.get(`/reset-token/${token}`);
  return response.data;
};

export const resetPassword = async (payload: {
  token: string;
  email: string;
  newPassword: string;
}) => {
  const response = await axiosInstance.post("/reset-password", payload);
  return response.data;
};

export const changePassword = async (payload: {
  currentPassword: string;
  newPassword: string;
}) => {
  const response = await axiosInstance.post("/change-password", payload);
  return response.data;
};
