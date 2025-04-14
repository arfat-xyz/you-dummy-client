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
import { CiBookmarkCheck } from "react-icons/ci";
import { FaUsersRays } from "react-icons/fa6";
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
                <span className="hidden md:block">App</span>
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
              {user?.role.includes("Instructor") ? (
                <>
                  <NavigationMenuItem>
                    <Link href="/instructor" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          isActive("/instructor")
                        )}
                      >
                        <MdApps className="mr-2" />
                        <span className="hidden md:block">Instructor</span>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link
                      href="/instructor/course/create"
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          isActive("/instructor/course/create")
                        )}
                      >
                        <CiBookmarkCheck className="mr-2" />
                        <span className="hidden md:block">Create Course</span>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </>
              ) : (
                <>
                  <NavigationMenuItem>
                    <Link
                      href="/user/become-instructor"
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          isActive("/user/become-instructor")
                        )}
                      >
                        <FaUsersRays className="mr-2" />
                        <span className="hidden md:block">
                          Become Instructor
                        </span>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </>
              )}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="min-w-24">
                  <p className="truncate w-20">
                    <span className="w-full flex  flex-row items-center gap-2 justify-start">
                      <FaCoffee /> {user.name.slice(0, 4)}
                    </span>
                  </p>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenu orientation="horizontal" className="min-w-32">
                    <NavigationMenuList className="w-full flex flex-col text-start">
                      <NavigationMenuItem className="text-start">
                        <NavigationMenuLink
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "cursor-pointer flex justify-start items-start"
                          )}
                          asChild
                        >
                          <Link href="/user">
                            {" "}
                            <FaUser className="mr-2" />
                            Dashboard
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuLink
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "cursor-pointer items-start"
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
                    <CiLogin className="mr-2" />
                    <span className="hidden md:block">Login</span>
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

                    <span className="hidden md:block">Register</span>
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
