import { FiLock } from "react-icons/fi";
import * as Yup from "yup";
import { Formik, Form as FormikForm, type FormikHelpers } from "formik";
import { Button, Card, CardBody } from "@heroui/react";
import { toast } from "react-toastify";
import PasswordInput from "../../../components/PasswordInput";
import { changePassword } from "../../../api/authApi";
import axios from "axios";

const passwordSchema = Yup.object({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,}$/,
      "Must contain uppercase, lowercase, number and special character"
    ),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});

interface FormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

function ChangePasswords() {
  const initialValues: FormValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      const response = await changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      toast.success(response.message || "Password updated successfully!");
    } catch (error) {
      console.error("Password updating failed:", error);
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            "Failed to update password. Please try again."
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12">
      <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
        <FiLock className="inline-block" /> Change Password
      </h2>
      <div className="border-b border-gray-200 mb-4" />
      <Card className="shadow-none">
        <CardBody>
          <Formik
            initialValues={initialValues}
            validationSchema={passwordSchema}
            onSubmit={handleSubmit}
          >
            {({ values, isSubmitting, setFieldValue, errors, touched }) => (
              <FormikForm className="space-y-4">
                <PasswordInput
                  lable="Current Password"
                  value={values.currentPassword}
                  setState={(value) => setFieldValue("currentPassword", value)}
                  isInvalid={
                    touched.currentPassword && !!errors.currentPassword
                  }
                  errorMessage={
                    touched.currentPassword && errors.currentPassword
                  }
                />
                <PasswordInput
                  lable="New Password"
                  value={values.newPassword}
                  setState={(value) => setFieldValue("newPassword", value)}
                  isInvalid={touched.newPassword && !!errors.newPassword}
                  errorMessage={touched.newPassword && errors.newPassword}
                />
                <PasswordInput
                  lable="Confirm New Password"
                  value={values.confirmPassword} // Use values.confirmPassword instead of initialValues.confirmPassword
                  setState={(value) => setFieldValue("confirmPassword", value)}
                  isInvalid={
                    touched.confirmPassword && !!errors.confirmPassword
                  }
                  errorMessage={
                    touched.confirmPassword && errors.confirmPassword
                  }
                  validate={(t: string) =>
                    values.newPassword !== t ? "Password does not match" : true
                  }
                />

                <Button
                  color="primary"
                  type="submit"
                  isLoading={isSubmitting}
                  className="min-w-[120px]"
                >
                  Update Password
                </Button>
              </FormikForm>
            )}
          </Formik>
        </CardBody>
      </Card>
    </div>
  );
}

export default ChangePasswords;
