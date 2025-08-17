
import { Button, Divider, Card, CardBody, useDisclosure } from "@heroui/react";
import {
  AiOutlineHome,
  AiOutlineCheckSquare,
  AiOutlineTeam,
  AiOutlineUserSwitch,
  AiOutlineBarChart,
  AiOutlineClose,
  AiOutlineSetting,
  AiOutlineLogout,
} from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import { BiPlus } from "react-icons/bi";
import { useSideBarStore } from "../../../stores/dashStore";
import { useAuthStore } from "../../../stores/authStore";
import { useUserStore } from "../../../stores/userStore";
import { Link, useLocation } from "react-router-dom";
import CreateTaskModal from "./CreateTaskModal";

const iconMap = {
  Home: AiOutlineHome,
  CheckSquare: AiOutlineCheckSquare,
  Plus: MdOutlineEdit,
  Users: AiOutlineTeam,
  UserCog: AiOutlineUserSwitch,
  BarChart: AiOutlineBarChart,
};

export default function DashboardSidebar() {
  const location = useLocation();
  const { isOpen: isDisclosureOpen, onOpen, onOpenChange } = useDisclosure();
  const sidebarOpen = useSideBarStore((state) => state.sidebarOpen);
  const setSidebarOpen = useSideBarStore((state) => state.setSidebarOpen);

  const onClose = () => {
    setSidebarOpen(false);
  };

  const commonMenuItems = [
    { href: "/dashboard", label: "Overview", icon: "Home" },
    { href: "/dashboard/all-tasks", label: "All Tasks", icon: "CheckSquare" },
  ];


  return (
    <>
      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 max-lg:z-50
          w-64 bg-white
          transform transition-transform duration-300 ease-in-out
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <Card shadow="none" className="h-full rounded-none shadow-none">
          <CardBody className="p-0">
            {/* Header */}
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">
                  Dashboard
                </h2>
                <Button
                  isIconOnly
                  variant="light"
                  className="lg:hidden"
                  onPress={onClose}
                >
                  <AiOutlineClose className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <div className="px-4">
              <Button
                onPress={onOpen}
                className="w-full justify-start h-12 px-4"
                color="primary"
                startContent={<BiPlus className="w-5 h-5" />}
              >
                Create Task
              </Button>
            </div>
            {/* Navigation */}
            <nav className="flex-1 p-4">
              <div className="space-y-1">
                {commonMenuItems.map((item) => {
                  const IconComponent =
                    iconMap[item.icon as keyof typeof iconMap];
                  const isActive = location.pathname === item.href;

                  return (
                    <Button
                      key={item.href}
                      as={Link}
                      to={item.href}
                      variant={isActive ? "flat" : "light"}
                      color={isActive ? "primary" : "default"}
                      className={`
                        w-full justify-start h-12 px-4
                        ${
                          isActive
                            ? "bg-primary-50 border-r-3 border-primary"
                            : "hover:bg-gray-100"
                        }
                      `}
                      startContent={
                        IconComponent && <IconComponent className="w-5 h-5" />
                      }
                      onClick={() => {
                        // Close sidebar on mobile when item is clicked
                        if (window.innerWidth < 1024) {
                          onClose();
                        }
                      }}
                    >
                      <span className="text-left flex-1">{item.label}</span>
                    </Button>
                  );
                })}
              </div>

              <Divider className="my-4" />

              <div className="space-y-2">
                <Button
                  as={Link}
                  to="/dashboard/settings"
                  variant="light"
                  className={`
                        w-full justify-start h-12 px-4
                        ${
                          location.pathname === "/dashboard/settings"
                            ? "bg-primary-50 border-r-3 border-primary"
                            : "hover:bg-gray-100"
                        }
                      `}
                  startContent={<AiOutlineSetting className="w-4 h-4" />}
                >
                  Settings
                </Button>
                <Button
                  variant="light"
                  color="danger"
                  className="w-full justify-start h-10 px-4"
                  startContent={<AiOutlineLogout className="w-4 h-4" />}
                  onClick={() => {
                    useAuthStore.getState().clearToken();
                    useUserStore.getState().clearUser();
                  }}
                >
                  Logout
                </Button>
              </div>
            </nav>
          </CardBody>
        </Card>
      </aside>
      <CreateTaskModal isOpen={isDisclosureOpen} onOpenChange={onOpenChange} />
    </>
  );
}
