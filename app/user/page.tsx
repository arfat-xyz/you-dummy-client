"use client";
import JumbotronComponent from "@/components/jumbotron";
import axiosInstance from "@/lib/axios-instance";
import { frontendErrorResponse } from "@/lib/frontend-toast-response";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const UserPage = () => {
  const router = useRouter();
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axiosInstance.get("/auth/current-user");
      if (data?.success) {
        router.push(`/`);
        return;
      }
      return frontendErrorResponse(data?.message);
    } catch (err) {
      frontendErrorResponse();
      console.log("response error", err);
      router.push("/login");
    }
  };
  return (
    <>
      <JumbotronComponent text="User" />
    </>
  );
};

export default UserPage;
