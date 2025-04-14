"use client";
import { frontendErrorResponse } from "@/lib/frontend-toast-response";
import { hasUserRole } from "@/lib/interface/local-role-access";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

const UserLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  useEffect(() => {
    if (!hasUserRole(["Subscriber", "Instructor"])) {
      frontendErrorResponse("You're not authorized");
      if (window) {
        window.location.href = "/";
      } else {
        router.push("/");
      }
      return;
    }
  }, []);
  return <>{children}</>;
};

export default UserLayout;
