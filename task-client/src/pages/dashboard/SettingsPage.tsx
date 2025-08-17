"use client";
import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Avatar,
} from "@heroui/react";
import { FiUser, FiMail, FiSave, FiEdit2 } from "react-icons/fi";
// import { updateUser } from "@/services/userService";
import { useUserStore } from "../../stores/userStore";
import ChangePasswords from "./components/ChangePasswords";
import { toast } from "react-toastify";
import { updateUser } from "../../api/userApi";

function SettingsPage() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<{
    firstName: string;
    lastName: string;
    email: string;
  }>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (user) {
      updateUser(form)
        .then(() => {
          setUser({ id: user.id, ...form });
          setEditMode(false);
          toast.success("Profile updated!");
        })
        .catch(() => {
          toast.error("Something went wrong while updating your profile.");
        });
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-semibold text-2xl mb-2 text-gray-900">Settings</h1>
      <p className="text-gray-600 mb-8">Manage your account information</p>

      <div className="mb-10">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <FiUser className="inline-block" /> Profile
        </h2>
        <div className="border-b border-gray-200 mb-4" />
        <Card className="shadow-none">
          <CardHeader className="flex items-center gap-4 bg-gray-50">
            <Avatar
              src={`https://ui-avatars.com/api/?name=${form.firstName}+${form.lastName}`}
              size="lg"
              className="ring-2 ring-primary-500"
            />
            <div>
              <div className="font-semibold text-xl text-gray-900">
                {user?.firstName} {user?.lastName}
              </div>
              <div className="text-sm text-gray-500">{user?.email}</div>
            </div>
          </CardHeader>
          <CardBody>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    First Name
                  </label>
                  <Input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    startContent={<FiUser />}
                    disabled={!editMode}
                    variant="bordered"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Last Name
                  </label>
                  <Input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    startContent={<FiUser />}
                    disabled={!editMode}
                    variant="bordered"
                    className="w-full"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Email
                </label>
                <Input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  startContent={<FiMail />}
                  disabled
                  variant="bordered"
                  className="w-full"
                />
              </div>
              <div className="flex gap-3 mt-6">
                {editMode ? (
                  <>
                    <Button
                      color="primary"
                      startContent={<FiSave />}
                      onClick={handleSave}
                      type="button"
                      className="min-w-[120px]"
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="light"
                      onClick={() => {
                        setEditMode(false);
                        setForm({
                          firstName: user?.firstName || "",
                          lastName: user?.lastName || "",
                          email: user?.email || "",
                        });
                      }}
                      className="min-w-[100px]"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    color="secondary"
                    startContent={<FiEdit2 />}
                    onClick={() => setEditMode(true)}
                    type="button"
                    className="min-w-[120px]"
                  >
                    Edit Profile
                  </Button>
                )}
              </div>
            </form>
          </CardBody>
        </Card>
      </div>

      <ChangePasswords />
    </div>
  );
}

export default SettingsPage;
