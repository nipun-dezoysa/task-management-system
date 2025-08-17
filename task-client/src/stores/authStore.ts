import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState } from "../types/auth.type";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isHydrated: false,
      setToken: (token) => set({ token }),
      clearToken: () => set({ token: null }),
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: "auth-token-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);
