import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { deleteTask } from "../../../api/taskApi";
import { toast } from "react-toastify";
import { useState } from "react";

function DeleteConfirmation({
  isOpen,
  onOpenChange,
  onConfirm,
  taskTitle,
  taskId,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  taskTitle: string;
  taskId: number;
}) {
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    deleteTask(taskId)
      .then((res) => {
        toast.success("Task deleted successfully");
        onConfirm();
      })
      .catch((err) => {
        toast.error("Failed to delete task");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Confirm Deletion
            </ModalHeader>
            <ModalBody>
              <p>
                Are you sure you want to delete the task{" "}
                <strong>"{taskTitle}"</strong>? This action cannot be undone.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button isDisabled={loading} variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button isLoading={loading} color="danger" onPress={handleDelete}>
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default DeleteConfirmation;
