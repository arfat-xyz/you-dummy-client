"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/instructor", label: "Dashboard" },
  { href: "/instructor/course/create", label: "Course Create" },
  { href: "/instructor/revenue", label: "Revenue" },
];

const InstructorNav = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col mt-2">
      {navItems.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`text-gray-700 hover:text-blue-600 py-2 px-4 rounded-md transition-all duration-200 ${
            pathname === href ? "bg-blue-500 text-white" : "bg-transparent"
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};

export default InstructorNav;
