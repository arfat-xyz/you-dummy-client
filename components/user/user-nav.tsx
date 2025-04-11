"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const UserNav = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col mt-2">
      <Link
        href="/user"
        className={`text-gray-700 hover:text-blue-600 py-2 px-4 rounded-md transition-all duration-200 ${
          pathname === "/user" ? "bg-blue-500 text-white" : "bg-transparent"
        }`}
      >
        Dashboard
      </Link>
    </div>
  );
};

export default UserNav;
