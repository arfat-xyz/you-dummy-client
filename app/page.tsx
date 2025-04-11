"use client";
import JumbotronComponent from "@/components/jumbotron";
import axiosInstance from "@/lib/axios-instance";
import { useEffect } from "react";

const MainPage = ({ searchParams }: { searchParams: { auth: string } }) => {
  const handleRequest = async () => {
    const { data } = await axiosInstance.get(`/auth/send-test-email`);
    console.log(data);
  };
  useEffect(() => {
    if (window) {
      if (searchParams.auth === "false") {
        window.localStorage.removeItem("user");
      }
    }
  }, []);
  return (
    <>
      <JumbotronComponent text="Online Market Place" />{" "}
      <button
        type="button"
        onClick={() => {
          handleRequest();
        }}
        className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-primary text-white font-semibold disabled:bg-primary-foreground rounded-md hover:text-primary hover:bg-white border border-transparent hover:border-primary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/60"
      >
        handleRequest
      </button>
    </>
  );
};

export default MainPage;
