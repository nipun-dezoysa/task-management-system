import type { CalendarDateTime } from "@internationalized/date";

export type TaskStatusType = "PENDING" | "IN_PROGRESS" | "COMPLETED";

export type TaskRequestType = {
  title: string;
  description: string;
  deadline: CalendarDateTime | null;
  status: TaskStatusType;
};

export type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatusType;
  userId: number;
  createdDate: string;
  deadline: string;
};

