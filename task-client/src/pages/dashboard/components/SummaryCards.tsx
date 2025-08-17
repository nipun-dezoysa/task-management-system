import { type IconType } from "react-icons";
import { FiBarChart, FiCheckCircle, FiClock, FiPlus } from "react-icons/fi";
import type { SummaryCard } from "../../../types/task.type";
import { useEffect, useState } from "react";
import { useUserStore } from "../../../stores/userStore";
import { getUserSummary } from "../../../api/userApi";

export interface SummaryData {
  total: number;
  completed: number;
  progress: number;
  todo: number;
}

function SummaryCards() {
  const [summaryData, setSummaryData] = useState<SummaryData>({
    total: 0,
    completed: 0,
    progress: 0,
    todo: 0,
  });
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user) {
      getUserSummary()
        .then((response) => {
          setSummaryData(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching dashboard data:", error);
        });
    }
  }, [user]);

  const baseCards: SummaryCard[] = [
    {
      title: "Total Tasks",
      value: summaryData.total,
      icon: FiBarChart,
      color: "bg-blue-500",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Completed",
      value: summaryData.completed,
      icon: FiCheckCircle,
      color: "bg-green-500",
      textColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "In Progress",
      value: summaryData.progress,
      icon: FiClock,
      color: "bg-yellow-500",
      textColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Todo",
      value: summaryData.todo,
      icon: FiPlus,
      color: "bg-indigo-500",
      textColor: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
      {baseCards.map((card: SummaryCard, index: number) => {
        const IconComponent: IconType = card.icon;

        return (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 px-6 py-4 border border-gray-200 cursor-pointer hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {card.title}
                </p>
                <p className={`text-3xl font-bold ${card.textColor}`}>
                  {card.value}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${card.bgColor}`}>
                <IconComponent className={`h-6 w-6 ${card.textColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SummaryCards;
