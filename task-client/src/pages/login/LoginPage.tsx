import { Button, Input, Link, Switch } from "@heroui/react";
import { Formik, Form } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import PasswordInput from "../../components/PasswordInput";
import { useAuthStore } from "../../stores/authStore";
import { useUserStore } from "../../stores/userStore";
import { loginToAccount } from "../../api/authApi";

interface FormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function LoginPage() {
  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  //const router = useRouter();

  const user = useUserStore((state) => state.user);

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setFieldError, resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      const response = await loginToAccount(values);
      useAuthStore.getState().setToken(response.data.accessToken);
      useUserStore.getState().setUser(response.data.user);
      resetForm();
      toast.success(response.message);
      //router.push("/dashboard");
    } catch (error) {
      

      if (axios.isAxiosError(error) && error.response?.data) {
        toast.error(error.response.data.message);
        setFieldError("email", error.response.data.data?.email || "Check your email");
        setFieldError("password", error.response.data.data?.password || "Check your password");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center flex-1">
      {user && (
        <div className="absolute top-4 right-4">
          <p className="text-sm">
            Logged in as: <strong>{user.email}</strong>
          </p>
        </div>
      )}
      <div className="w-[400px] font-poppins flex flex-col gap-3 ">
        <h1 className="text-2xl font-medium text-center">
          Log in to your account
        </h1>

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
            setFieldValue,
          }) => (
            <Form className="flex flex-col gap-3">
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

              <PasswordInput
                lable="Password"
                value={values.password}
                setState={(value: string) => setFieldValue("password", value)}
                isInvalid={touched.password && !!errors.password}
                errorMessage={touched.password && errors.password}
              />
              <div className="flex justify-between items-center">
                <Switch size="sm">Remember me</Switch>
                <Link className="text-blue-500 text-sm" href="/forgot-password">
                  Forget password?
                </Link>
              </div>
              <Button
                isLoading={isSubmitting}
                type="submit"
                size="lg"
                color="primary"
              >
                Log in
              </Button>
            </Form>
          )}
        </Formik>

        <p className="text-center text-xs">
          Dont have an account?{" "}
          <Link href="/register" className="text-blue-500">
            Sign up now
          </Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
