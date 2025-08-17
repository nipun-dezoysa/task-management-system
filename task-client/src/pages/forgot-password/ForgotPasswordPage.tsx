import { Button, Input, Link } from "@heroui/react";
import { Formik, Form } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { forgotPassword } from "../../api/authApi";
import { useState } from "react";

interface FormValues {
  email: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

function ForgotPasswordPage() {
  const initialValues: FormValues = {
    email: "",
  };
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      await forgotPassword(values.email);
      resetForm();
      setIsSuccess(true);
      toast.success("Password reset link sent to your email!");
    } catch (error) {
      console.error("Password reset failed:", error);
      toast.error("Failed to send reset link. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="flex justify-center items-center flex-1">
      <div className="w-[400px] flex flex-col gap-3">
        {isSuccess ? (
          <div className="text-center">
            <div className=" p-6 rounded-lg">
              <svg
                className="mx-auto h-12 w-12 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <h1 className="text-2xl font-medium mt-4">Check your email</h1>
              <p className="text-gray-600 mt-2">
                We've sent a password reset link to your email address.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Didn't receive the email?{" "}
                <button
                  onClick={() => setIsSuccess(false)}
                  className="text-blue-500 hover:text-blue-700 font-medium"
                >
                  Try again
                </button>
              </p>
            </div>
            <div className="mt-4">
              <Link href="/login" className="text-blue-500 text-sm">
                Back to Login
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center">
              <h1 className="text-2xl font-medium">Forgot your password?</h1>
              <p className="text-sm text-gray-500 mt-2">
                Enter your email and we'll send you a link to reset your
                password.
              </p>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                isSubmitting,
              }) => (
                <Form className="flex flex-col gap-4 mt-4">
                  <Input
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isRequired
                    variant="bordered"
                    label="Email"
                    type="email"
                    isInvalid={touched.email && !!errors.email}
                    errorMessage={touched.email && errors.email}
                  />

                  <Button
                    isLoading={isSubmitting}
                    type="submit"
                    size="lg"
                    color="primary"
                  >
                    Send Reset Link
                  </Button>
                </Form>
              )}
            </Formik>

            <div className="text-center mt-4">
              <Link href="/login" className="text-blue-500 text-sm">
                Back to Login
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default ForgotPasswordPage;
