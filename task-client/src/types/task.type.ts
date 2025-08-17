import type { CalendarDateTime } from "@internationalized/date";
import type { IconType } from "react-icons";

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

export interface SummaryCard {
  title: string;
  value: number;
  icon: IconType;
  color: string;
  textColor: string;
  bgColor: string;
}
