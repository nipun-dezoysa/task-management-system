import axiosInstance from "../configs/axiosInstance";
import type { TaskRequestType, TaskStatusType } from "../types/task.type";

export const createTask = async (payload: {
  title: string;
  description: string;
  deadline: string | null;
  status: TaskStatusType;
}) => {
  const response = await axiosInstance.post("/tasks", payload);
  return response.data;
};
