import InstructorLayoutClientComponent from "@/components/instructor/instructor-client-component";
import React, { ReactNode } from "react";

const InstructorLayout = ({ children }: { children: ReactNode }) => {
  return (
    <InstructorLayoutClientComponent>
      {children}
    </InstructorLayoutClientComponent>
  );
};

export default InstructorLayout;
