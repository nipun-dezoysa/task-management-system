import { HeroUIProvider } from "@heroui/react";
import { Route, Routes, useHref, useNavigate } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import { ToastContainer } from "react-toastify";
import { toastConfig } from "./configs/toastConfig";
import AuthProvider from "./providers/AuthProvider";
import ForgotPasswordPage from "./pages/forgot-password/ForgotPasswordPage";
import ResetPasswordPage from "./pages/reset-password/ResetPassword";
import DashboardPage from "./pages/dashboard/DashboardPage";
import DashboardLayout from "./layouts/DashLayout";
import AllTasksPage from "./pages/dashboard/AllTasksPage";

function App() {
  const navigate = useNavigate();
  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route
              path="/reset-password/:token"
              element={<ResetPasswordPage />}
            />
            <Route path="/dashboard/" element={<DashboardLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="all-tasks" element={<AllTasksPage />} />
            </Route>
          </Route>
        </Routes>
        <ToastContainer {...toastConfig} />
      </AuthProvider>
    </HeroUIProvider>
  );
}

export default App;
