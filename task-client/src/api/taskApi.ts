import axiosInstance from "../configs/axiosInstance";
import type { TaskStatusType } from "../types/task.type";

export const createTask = async (payload: {
  title: string;
  description: string;
  deadline: string | null;
  status: TaskStatusType;
}) => {
  const response = await axiosInstance.post("/tasks", payload);
  return response.data;
};

export const getUserCreatedTasks = async () => {
  const response = await axiosInstance.get("/tasks");
  return response.data;
};

export const deleteTask = async (id: number) => {
  const response = await axiosInstance.delete(`/tasks/${id}`);
  return response.data;
};
