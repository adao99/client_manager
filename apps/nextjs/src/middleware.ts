import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  //add current path as a custom header

  console.log("cookies", request.cookies);

  const authCookie = request.cookies.get("next-auth.session-token");
  const pathName = request.nextUrl.pathname;

  if (!authCookie && pathName !== "/login") {
    console.log("redirecting to login");

    //redirect to login page using absolute path
    const redirectUrl = new URL("/login", request.nextUrl.origin);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
