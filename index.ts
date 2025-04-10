import { create } from "zustand";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect } from "react";
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

  // Axios interceptor for handling 401 errors and logging out
  // useEffect(() => {
  //   const interceptor = axiosInstance.interceptors.response.use(
  //     (response) => response,
  //     (error) => {
  //       const res = error.response;
  //       if (res?.status === 401 && res.config && !res.config.__isRetryRequest) {
  //         return new Promise((resolve, reject) => {
  //           axiosInstance
  //             .get("/auth/logout")
  //             .then(async () => {
  //               console.log("/402 error > logout");
  //               logout();
  //               await removeTokenFromCookie();
  //               window.localStorage.removeItem("user");
  //               router.push("/login");
  //             })
  //             .catch((err) => {
  //               console.log("AXIOS INTERCEPTORS ERR", err);
  //               reject(err);
  //             });
  //         });
  //       }
  //       return Promise.reject(error);
  //     }
  //   );

  //   return () => {
  //     axiosInstance.interceptors.response.eject(interceptor);
  //   };
  // }, [logout, router]);

  // CSRF token setup
  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        const { data } = await axios.get(
          "https://youdemy-server.onrender.com/api/csrf-token"
        );
        axios.defaults.headers["X-CSRF-Token"] = data.getCsrfToken;
      } catch (error) {
        console.error("Error getting CSRF token", error);
      }
    };
    getCsrfToken();
  }, []);
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
