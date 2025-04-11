"use client";

import Link from "next/link";
import { FaCoffee } from "react-icons/fa";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
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
            <>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="w-24">
                  <p className="truncate w-20">
                    <span className="w-full flex  flex-row items-center gap-2 justify-start">
                      <FaCoffee /> {user.name}
                    </span>
                  </p>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenu orientation="horizontal">
                    <NavigationMenuList className="w-full flex flex-col">
                      <NavigationMenuItem>
                        <NavigationMenuLink
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "cursor-pointer"
                          )}
                          onClick={logoutFunction}
                        >
                          <FaUser className="mr-2" />
                          Logout
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </>
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
