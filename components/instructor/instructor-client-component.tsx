"use client";
import { ReactNode, useEffect } from "react";
import InstructorNav from "./instructor-nav";
import { useRouter } from "next/navigation";
import { hasUserRole } from "@/lib/interface/local-role-access";
import { frontendErrorResponse } from "@/lib/frontend-toast-response";

const InstructorLayoutClientComponent = ({
  children,
}: {
  children: ReactNode;
}) => {
  const router = useRouter();
  useEffect(() => {
    if (!hasUserRole(["Instructor"])) {
      console.log({ arfat: "araf" });
      frontendErrorResponse("You're not authorized");
      if (window) {
        window.location.href = "/";
      } else {
        router.push("/");
      }
      return;
    }
  }, []);
  return (
    <>
      {" "}
      <div className="w-full ">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-2">
            <InstructorNav />
          </div>
          <div className="col-span-10  bg-gray-50 py-10 px-4">
            <>{children}</>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstructorLayoutClientComponent;
