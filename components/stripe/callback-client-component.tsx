"use client";
import SpinnerLoader from "@/components/loader";
import { useAuth } from "@/index";
import axiosInstance from "@/lib/axios-instance";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const StripeCallBackPageClientComponent = () => {
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    console.log({ user });
    if (user) {
      axiosInstance
        .post("/instructor/get-account-status", user)
        .then(({ data }) => {
          window.localStorage.setItem("user", JSON.stringify(data?.data));
          router.push("/instructor");
        });
    }
  }, [user]);
  return (
    <>
      <div className="w-full h-[calc(100vh-30px)] flex justify-center items-center  ">
        <SpinnerLoader />
      </div>
    </>
  );
};

export default StripeCallBackPageClientComponent;
