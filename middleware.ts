import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { ITokenUser } from "./lib/interface/token-user-interface";

// Define the matcher to run the middleware only on specific routes
export const config = {
  matcher: ["/login", "/register", "/dashboard", "/"],
};

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Extract the token using NextAuth's JWT utility
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  // For login and register pages: redirect to dashboard if user is logged in
  if ((pathname === "/login" || pathname === "/register") && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // For dashboard page: redirect to login if no token
  if (pathname === "/dashboard" && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If a token exists, decode it
  if (token) {
    const decodedToken = jwt.decode(token);

    // Check if the decoded token is valid and matches ITokenUser type
    if (!decodedToken || typeof decodedToken !== "object") {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Cast to ITokenUser
    const user: ITokenUser = decodedToken as ITokenUser;

    // Ensure user has a valid email (or other user-specific checks)
    if (!user?.email) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Allow the request to continue if all checks pass
  return NextResponse.next();
}
