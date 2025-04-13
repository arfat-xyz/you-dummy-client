import UserLayoutClientComponent from "@/components/user/user-layout-client-component";
import React, { ReactNode } from "react";

const UserLayout = ({ children }: { children: ReactNode }) => {
  return <UserLayoutClientComponent>{children}</UserLayoutClientComponent>;
};

export default UserLayout;
