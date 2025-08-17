import { useCallback, useEffect, useState } from "react";

//import { useDrawerStore } from "@/store/drawerStore";
import type { Task } from "../../types/task.type";
import { useUserStore } from "../../stores/userStore";
import { getUserCreatedTasks } from "../../api/taskApi";
import TaskTable from "./components/TaskTable";

function Page() {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const user = useUserStore((state) => state.user);
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
      getUserCreatedTasks()
        .then((response) => {
          setAllTasks(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user tasks:", error);
        });
    }
  }, [user]);

  return <TaskTable title="Created Tasks" allTasks={allTasks} onDelete={deleteTaskFromList} onEdit={updateTaskInList} />;
}

export default Page;
