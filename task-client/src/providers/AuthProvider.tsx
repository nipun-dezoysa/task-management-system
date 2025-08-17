
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuthStore } from "../stores/authStore";
import { getUserDetails } from "../api/userApi";
import { useUserStore } from "../stores/userStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = useAuthStore((state) => state.token);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      getUserDetails()
        .then((response) => {
          useUserStore.getState().setUser(response.data.data);
        })
        .catch((error) => {
          console.error("Failed to fetch user details:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
}
