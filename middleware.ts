import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { ITokenUser } from "./lib/interface/token-user-interface";

// Define route conditions for different types of routes
const ROUTES = {
  // Public routes: accessible to everyone (authenticated and unauthenticated users)
  public: ["/", "/contact"],

  // Routes that require a valid token to access
  protected: ["/user", "/instructor", "/stripe"],

  // Routes that are only accessible when there is no token (login, register, forgot-password)
  noTokenRequired: ["/login", "/register", "/forgot-password"],
};

export const config = {
  matcher: [
    "/login",
    "/register",
    "/forgot-password",
    "/user/:path*",
    "/dashboard/:path*",
    "/instructor/:path*",
    "/contact",
    "/", // Note: this applies middleware to root route as well
  ],
};

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  console.log({ token, cookieStore });

  // Check if the route is public (accessible for both authenticated and unauthenticated users)
  if (ROUTES.public.includes(pathname)) {
    return NextResponse.next();
  }

  // Check if the route is no-token-required (only accessible if there is no token)
  if (ROUTES.noTokenRequired.includes(pathname) && token) {
    // If there is a token, redirect to home page or a different page
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Check if the route is protected (requires a valid token to access)
  if (ROUTES.protected.some((route) => pathname.startsWith(route)) && !token) {
    // Redirect to login page if there is no token for protected routes
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If there is a token, decode it and validate it
  if (token) {
    try {
      const decodedToken = jwt.decode(token);

      // If the token is invalid or doesn't contain the expected data, redirect to login
      if (!decodedToken || typeof decodedToken !== "object") {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      // Cast to ITokenUser and ensure the user has the required data
      const user: ITokenUser = decodedToken as ITokenUser;
      if (!user?.email) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      // Additional role-based check for /instructor route
      if (
        pathname.startsWith("/instructor") &&
        !user.role.includes("Instructor")
      ) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      // If there's an error decoding the token, redirect to login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Allow the request to continue if all checks pass
  return NextResponse.next();
}
