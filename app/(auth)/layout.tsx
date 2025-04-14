"use client";
import { frontendErrorResponse } from "@/lib/frontend-toast-response";
import { hasUserRole } from "@/lib/interface/local-role-access";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  useEffect(() => {
    if (hasUserRole(["Subscriber", "Instructor", "Admin"])) {
      frontendErrorResponse("You're loggedin");
      if (window) {
        window.location.href = "/user";
      } else {
        router.push("/user");
      }
      return;
    }
  }, []);
  return <>{children}</>;
};

export default AuthLayout;
