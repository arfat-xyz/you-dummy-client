"use client";
import { ReactNode } from "react";
import InstructorNav from "./instructor-nav";

const InstructorLayoutClientComponent = ({
  children,
}: {
  children: ReactNode;
}) => {
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
