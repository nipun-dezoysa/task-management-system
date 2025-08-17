import { Button, Link } from "@heroui/react";
import { Formik, Form } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput";
import { useEffect, useState } from "react";
import { getResetTokenDetails, resetPassword } from "../../api/authApi";
import LoadingSpinner from "../../components/LoadingSpinner";

interface FormValues {
  password: string;
  confirmPassword: string;
}

const passwordValidationSchema = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/,
      "Must contain 8-15 characters, 1 uppercase, 1 lowercase, 1 number & 1 special character"
    ),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

type ErrorState = {
  type: "expired" | "invalid" | "generic" | "missing";
  message: string;
} | null;

function ResetPasswordPage() {
  const { token } = useParams();
  const [email, setEmail] = useState("");
  const [isDataFetching, setIsDataFetching] = useState(true);
  const [errorState, setErrorState] = useState<ErrorState>(null);

  useEffect(() => {
    if (!token) {
      setErrorState({
        type: "missing",
        message: "Password reset link is invalid (missing token)",
      });
      setIsDataFetching(false);
      return;
    }

    getResetTokenDetails(token)
      .then((data) => {
        if (!data?.data) {
          throw new Error("No email associated with token");
        }
        setEmail(data.data);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 406) {
            setErrorState({
              type: "expired",
              message: "Password reset link has expired",
            });
          } else if (error.response?.status === 404) {
            setErrorState({
              type: "invalid",
              message: "Invalid password reset link",
            });
          } else {
            setErrorState({
              type: "generic",
              message:
                error.response?.data?.message ||
                "Failed to verify reset link. Please try again.",
            });
          }
        } else {
          setErrorState({
            type: "generic",
            message: "An unexpected error occurred",
          });
        }
        toast.error("Failed to verify reset token");
      })
      .finally(() => {
        setIsDataFetching(false);
      });
  }, [token]);

  const navigate = useNavigate();
  const initialValues: FormValues = {
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    if (!token || !email) {
      toast.error("Invalid token or email address.");
      return;
    }
    try {
      const response = await resetPassword({
        token,
        email,
        newPassword: values.password,
      });

      toast.success(response.message || "Password updated successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Password reset failed:", error);
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            "Failed to reset password. Please try again."
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (isDataFetching) {
    return <LoadingSpinner />;
  }

  if (errorState) {
    return (
      <section className="flex justify-center items-center flex-1">
        <div className="w-[400px] font-poppins flex flex-col gap-3 text-center justify-center">
          <div className="p-6 rounded-lg">
            <svg
              className="mx-auto h-12 w-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>

            <p className="mt-4 text-gray-600">{errorState.message}</p>

            {(errorState.type === "expired" ||
              errorState.type === "invalid") && (
              <Button
                className="mt-4"
                color="primary"
                onClick={() => navigate("/forgot-password")}
              >
                Request New Reset Link
              </Button>
            )}
          </div>

          <Link href="/login" className="text-blue-500 text-sm mt-4">
            Back to Login
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="flex justify-center items-center flex-1">
      <div className="w-[400px] font-poppins flex flex-col gap-3">
        <h1 className="text-2xl font-medium text-center">
          Reset your password
        </h1>

        <p className="text-sm text-center text-gray-500 mb-4">
          You're changing the password for{" "}
          <span className="font-medium">{email}</span>.
          <br />
          Please enter and confirm your new password below.
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={passwordValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, isSubmitting, setFieldValue, errors, touched }) => (
            <Form className="flex flex-col gap-3">
              <PasswordInput
                lable="New Password"
                value={values.password} // Use values.password instead of initialValues.password
                setState={(value) => setFieldValue("password", value)}
                isInvalid={touched.password && !!errors.password}
                errorMessage={touched.password && errors.password}
              />

              <PasswordInput
                lable="Confirm New Password"
                value={values.confirmPassword} // Use values.confirmPassword instead of initialValues.confirmPassword
                setState={(value) => setFieldValue("confirmPassword", value)}
                isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                errorMessage={touched.confirmPassword && errors.confirmPassword}
                validate={(t: string) =>
                  values.password !== t ? "Password does not match" : true
                }
              />

              <Button
                isLoading={isSubmitting}
                type="submit"
                size="lg"
                color="primary"
              >
                Update Password
              </Button>
            </Form>
          )}
        </Formik>

        <p className="text-center text-xs">
          Remember your password?{" "}
          <Link href="/login" className="text-blue-500">
            Log in instead
          </Link>
        </p>
      </div>
    </section>
  );
}

export default ResetPasswordPage;
