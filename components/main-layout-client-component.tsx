"use client";
import React, { ReactNode, useEffect } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import TopNav from "./top-nav";
import { useAuth } from "..";

const MainLayoutClientComponent = ({ children }: { children: ReactNode }) => {
  const { login } = useAuth();
  // On mount, try to load the user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(
      window.localStorage.getItem("user") || "null"
    );
    if (storedUser) {
      login(storedUser);
    }
  }, []);
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        // pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <TopNav />
      {children}
    </>
  );
};

export default MainLayoutClientComponent;
