import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Select,
  SelectItem,
  Button,
  Divider,
  useDisclosure,
} from "@heroui/react";
import { FiEdit2, FiTrash2, FiCalendar, FiClock, FiInfo } from "react-icons/fi";
import type { Task } from "../../../types/task.type";
import { format } from "date-fns";
import DeleteConfirmation from "./DeleteConfirmation";

function TaskDrawer({
  isOpen,
  onOpenChange,
  task,
  onDelete,
  onEdit,
  onStatusChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task;
  onDelete: () => void;
  onEdit: () => void;
  onStatusChange: (status: string) => void;
}) {
  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onOpenChange: onConfirmOpenChange,
  } = useDisclosure();
  return (
    <>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="right">
        <DrawerContent className="max-w-md">
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">{task.title}</h2>
                  <div className="flex gap-2">
                    <Button
                      isIconOnly
                      variant="light"
                      onPress={onEdit}
                      aria-label="Edit task"
                    >
                      <FiEdit2 className="text-gray-600" />
                    </Button>
                    <Button
                      isIconOnly
                      variant="light"
                      color="danger"
                      onPress={onConfirmOpen}
                      aria-label="Delete task"
                    >
                      <FiTrash2 />
                    </Button>
                  </div>
                </div>
              </DrawerHeader>

              <Divider />

              <DrawerBody className="space-y-6">
                {task.description && (
                  <div>
                    <h2>Description</h2>
                    <p className="text-gray-700">{task.description}</p>
                  </div>
                )}

                <Select
                  selectedKeys={[task.status]}
                  onChange={(e) => onStatusChange(e.target.value)}
                  label="Update Status"
                  variant="bordered"
                  className="w-full"
                >
                  <SelectItem key="PENDING">PENDING</SelectItem>
                  <SelectItem key="IN_PROGRESS">IN PROGRESS</SelectItem>
                  <SelectItem key="COMPLETED">COMPLETED</SelectItem>
                </Select>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <FiCalendar className="mt-1 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Created at</p>
                      <p className="text-gray-700">
                        {format(new Date(task.createdDate), "PPP 'at' h:mm a")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FiClock className="mt-1 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Deadline</p>
                      <p className="text-gray-700">
                        {format(new Date(task.deadline), "PPP 'at' h:mm a")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    variant="bordered"
                    onPress={onClose}
                    className="flex-1"
                  >
                    Close
                  </Button>
                  <Button color="primary" onPress={onEdit} className="flex-1">
                    Edit Task
                  </Button>
                </div>
              </DrawerBody>
              <DeleteConfirmation
                isOpen={isConfirmOpen}
                onOpenChange={onConfirmOpenChange}
                taskId={task.id}
                onConfirm={() => {
                  onDelete();
                  onConfirmOpenChange();
                  onClose();
                }}
                taskTitle={task.title}
              />
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default TaskDrawer;
