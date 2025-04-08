"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { CiLogin } from "react-icons/ci";
import { MdApps } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function TopNav() {
  const path = usePathname();
  const isActive = (href: string) =>
    path === href ? "border-b-primary" : "bg-transparent text-black";

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(navigationMenuTriggerStyle(), isActive("/"))}
            >
              <MdApps className="mr-2" />
              App
            </NavigationMenuLink>
          </Link>
          <Link href="/login" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "",
                isActive("/login")
              )}
            >
              <CiLogin className="mr-2" /> Login
            </NavigationMenuLink>
          </Link>
          <Link href="/register" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                isActive("/register")
              )}
            >
              <FaUser className="mr-2" />
              Register
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
