import {  useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  DatePicker,
  Select,
  SelectItem,
} from "@heroui/react";
import { Formik, Form, Field, type FieldInputProps } from "formik";
import * as Yup from "yup";
import {
  now,
  getLocalTimeZone,
  parseDate,
} from "@internationalized/date";
import { toast } from "react-toastify";
import type { TaskRequestType, TaskStatusType } from "../../../types/task.type";
import { createTask } from "../../../api/taskApi";

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Task title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  description: Yup.string()
    .required("Task description is required")
    .min(5, "Description must be at least 5 characters"),
  status: Yup.string().required("Please assign a status to the task"),
  deadline: Yup.mixed().nullable(),
});

function CreateTaskModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues: TaskRequestType = {
    title: "",
    description: "",
    deadline: null,
    status: "PENDING",
  };

  const handleSubmit = async (
    values: TaskRequestType,
    { resetForm }: { resetForm: () => void }
  ) => {
    setIsSubmitting(true);

    try {
      const requestData = {
        ...values,
        deadline: values.deadline
          ? values.deadline.toString() // Already in correct format from DatePicker
          : null,
      };

      await createTask(requestData);
      toast.success("Task created successfully!");
      resetForm();
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, setFieldValue, isValid, dirty }) => (
              <Form>
                <ModalHeader className="flex flex-col gap-1">
                  Create New Task
                </ModalHeader>
                <ModalBody className="gap-4">
                  <Field name="title">
                    {({ field }: { field: FieldInputProps<string> }) => (
                      <Input
                        {...field}
                        label="Task Title"
                        placeholder="Enter task title"
                        isRequired
                        isInvalid={touched.title && !!errors.title}
                        errorMessage={touched.title && errors.title}
                        variant="bordered"
                      />
                    )}
                  </Field>

                  <Field name="description">
                    {({ field }: { field: FieldInputProps<string> }) => (
                      <Textarea
                        {...field}
                        label="Task Description"
                        placeholder="Enter task description"
                        isRequired
                        isInvalid={touched.description && !!errors.description}
                        errorMessage={touched.description && errors.description}
                        variant="bordered"
                        minRows={3}
                        maxRows={6}
                      />
                    )}
                  </Field>

                  <div className="flex flex-col gap-4 md:flex-row">
                    <Field name="deadline">
                      {() => (
                        <DatePicker
                          label="Deadline (Optional)"
                          variant="bordered"
                          value={values.deadline}
                          onChange={(date) => setFieldValue("deadline", date)}
                          minValue={now(getLocalTimeZone())}
                          showMonthAndYearPickers
                          granularity="minute"
                          hideTimeZone
                          isRequired
                        />
                      )}
                    </Field>
                    <Field name="status">
                      {() => (
                        <Select
                          label="Status"
                          variant="bordered"
                          defaultSelectedKeys={["PENDING"]}
                          selectedKeys={[String(values.status)]}
                          onSelectionChange={(key) =>
                            setFieldValue(
                              "status",
                              Array.from(key)[0] as TaskStatusType
                            )
                          }
                          isRequired
                        >
                          <SelectItem key="PENDING">PENDING</SelectItem>
                          <SelectItem key="IN_PROGRESS">IN PROGRESS</SelectItem>
                          <SelectItem key="COMPLETED">COMPLETED</SelectItem>
                        </Select>
                      )}
                    </Field>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={onClose}
                    isDisabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    isLoading={isSubmitting}
                    isDisabled={!isValid || !dirty}
                  >
                    {isSubmitting ? "Creating..." : "Create Task"}
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        )}
      </ModalContent>
    </Modal>
  );
}

export default CreateTaskModal;
