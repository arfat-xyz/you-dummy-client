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
import { useAuth } from "..";

export default function TopNav() {
  const path = usePathname();
  const isActive = (href: string) =>
    path === href ? "border-b-primary" : "bg-transparent text-black";

  const { logoutFunction, user } = useAuth();

  return (
    <div
      className={cn(
        "flex w-full items-center",
        user?._id ? "justify-between" : "justify-start"
      )}
    >
      {/* Left-aligned menu */}
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
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Right-aligned menu */}
      <NavigationMenu>
        <NavigationMenuList>
          {user ? (
            <NavigationMenuItem>
              <NavigationMenuLink
                className={cn(navigationMenuTriggerStyle(), "cursor-pointer")}
                onClick={logoutFunction}
              >
                <FaUser className="mr-2" />
                Logout
              </NavigationMenuLink>
            </NavigationMenuItem>
          ) : (
            <>
              <NavigationMenuItem>
                <Link href="/login" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      isActive("/login")
                    )}
                  >
                    <CiLogin className="mr-2" /> Login
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
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
            </>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
