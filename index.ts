import { create } from "zustand";
import { useRouter } from "next/navigation";
import { IUser } from "./lib/interface/token-user-interface";
import axiosInstance from "./lib/axios-instance";
import { removeTokenFromCookie } from "./lib/handle-cookie";
import {
  frontendErrorResponse,
  frontendSuccessResponse,
} from "./lib/frontend-toast-response";

interface Store {
  user: IUser | null;
  login: (user: IUser) => void;
  logout: () => void;
}

// Create the Zustand store
const useStore = create<Store>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

const useAuth = () => {
  const router = useRouter();
  const { user, login, logout } = useStore();

  const loginFunction = (user: IUser) => {
    login(user);
    window.localStorage.setItem("user", JSON.stringify(user));
  };
  const logoutFunction = async () => {
    axiosInstance
      .get("/auth/logout", {
        withCredentials: true,
      })
      .then(async ({ data }) => {
        console.log("/402 error > logout");

        if (data?.success) {
          logout();
          await removeTokenFromCookie();
          window.localStorage.removeItem("user");
          frontendSuccessResponse(data?.message);
          router.push("/login");
          return;
        }
        return frontendErrorResponse(data?.message);
      })
      .catch((err) => {
        frontendErrorResponse();
        console.log("AXIOS INTERCEPTORS ERR", err);
      });
  };
  return { user, login, logout, loginFunction, logoutFunction };
};

export { useAuth, useStore };
