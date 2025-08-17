import { useCallback, useEffect, useState } from "react";

//import { useDrawerStore } from "@/store/drawerStore";
import type { Task } from "../../types/task.type";
import { useUserStore } from "../../stores/userStore";
import { getUserTodayTasks } from "../../api/taskApi";
import TaskTable from "./components/TaskTable";
import { format } from "date-fns";
import SummaryCards from "./components/SummaryCards";

function Page() {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const user = useUserStore((state) => state.user);
  const dateString = format(new Date(), "EEEE, d MMMM yyyy");

  //const { onOpen } = useDrawerStore();

  const updateTaskInList = useCallback((updatedTask: Task) => {
    setAllTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  }, []);

  const deleteTaskFromList = useCallback((taskId: number) => {
    setAllTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }, []);

  useEffect(() => {
    if (user) {
      getUserTodayTasks()
        .then((response) => {
          setAllTasks(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user tasks:", error);
        });
    }
  }, [user]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-semibold text-2xl text-gray-900">
          Good Morning, {user?.firstName || "User"}!
        </h1>
        <p className="text-gray-600">it&apos;s {dateString}</p>
      </div>
      <SummaryCards />
      <TaskTable
        title="Today Tasks"
        allTasks={allTasks}
        onDelete={deleteTaskFromList}
        onEdit={updateTaskInList}
      />
    </div>
  );
}

export default Page;
