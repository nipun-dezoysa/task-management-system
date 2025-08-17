import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  useDisclosure,
} from "@heroui/react";
import { format } from "date-fns";
import type { Task } from "../../../types/task.type";
import { useState, useMemo } from "react";
import TaskDrawer from "./TaskDrawer";

const columns = [
  {
    key: "title",
    label: "TITLE",
  },
  {
    key: "created",
    label: "CREATED",
  },
  {
    key: "deadline",
    label: "DEADLINE",
  },
  {
    key: "status",
    label: "STATUS",
  },
];

type SortDirection = "asc" | "desc";
type SortField = "created" | "deadline";

function TaskTable({
  title,
  allTasks,
  onDelete,
  onEdit,
}: {
  title: string;
  allTasks: Task[];
  onDelete: (taskId: number) => void;
  onEdit: (values: Task) => void;
}) {
  const [sortField, setSortField] = useState<SortField>("created");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleTaskSelect = (task: Task) => {
    setSelectedTask(task);
    onOpen();
  };

  // Sort tasks
  const sortedTasks = useMemo(() => {
    const tasks = [...allTasks];

    tasks.sort((a, b) => {
      const dateA =
        sortField === "created"
          ? new Date(a.createdDate).getTime()
          : new Date(a.deadline).getTime();
      const dateB =
        sortField === "created"
          ? new Date(b.createdDate).getTime()
          : new Date(b.deadline).getTime();

      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    });

    return tasks;
  }, [allTasks, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Sort by:</span>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered">
                {sortField === "created" ? "Created Date" : "Deadline"} (
                {sortDirection})
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Sort options">
              <DropdownItem
                key="created"
                onClick={() => handleSort("created")}
                className={sortField === "created" ? "bg-gray-100" : ""}
              >
                Created Date{" "}
                {sortField === "created" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </DropdownItem>
              <DropdownItem
                key="deadline"
                onClick={() => handleSort("deadline")}
                className={sortField === "deadline" ? "bg-gray-100" : ""}
              >
                Deadline{" "}
                {sortField === "deadline" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <Table aria-label="Task table">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody>
            {sortedTasks.map((task) => (
              <TableRow
                key={task.id}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleTaskSelect(task)}
              >
                <TableCell>{task.title}</TableCell>
                <TableCell>
                  {format(new Date(task.createdDate), "PPP 'at' h:mm a")}
                </TableCell>
                <TableCell>
                  {format(new Date(task.deadline), "PPP 'at' h:mm a")}
                </TableCell>
                <TableCell>{task.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedTask && (
        <TaskDrawer
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          task={selectedTask}
          onDelete={() => {
            onDelete(selectedTask.id);
            setSelectedTask(null);
          }}
          onEdit={(task: Task) => {
            onEdit(task);
            setSelectedTask(task);
          }}
        />
      )}
    </div>
  );
}

export default TaskTable;
