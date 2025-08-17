
import { useEffect, useState } from "react";
// import TaskDrawer from "@/components/Dashboard/TaskDrawer";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../pages/dashboard/components/DashboardSidebar";
import { useUserStore } from "../stores/userStore";
import { useAuthStore } from "../stores/authStore";
import LoadingSpinner from "../components/LoadingSpinner";
import Unauthorized from "../pages/unauthorized/UnauthorizedPage";

export default function DashboardLayout() {
  //const { isOpen, onClose } = useDrawerStore();
  const user = useUserStore((state) => state.user);

  //const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  useEffect(() => {
    const isHydrated = useAuthStore.getState().isHydrated;

    if (isHydrated) {
      if (user) {
        setHasAccess(true);
      }
      setLoading(false);
    }
  }, [user,  useAuthStore.getState().isHydrated]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!hasAccess || !user) {
    return <Unauthorized />;
  }

  return (
    <div className="flex bg-gray-100 flex-1">
      <DashboardSidebar />

      <main className="flex-1 overflow-y-auto lg:ml-0 h-full">
        <div className="p-8 h-full w-full">
          <Outlet />
        </div>
      </main>
      {/* <TaskDrawer isOpen={isOpen} onOpenChange={onClose} /> */}
    </div>
  );
}
