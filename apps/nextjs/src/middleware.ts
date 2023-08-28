import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  //add current path as a custom header
  const authCookie = request.cookies.get("next-auth.session-token");
  const pathName = request.nextUrl.pathname;

  if (!authCookie && pathName !== "/login") {
    console.log("redirecting to login");
    return NextResponse.redirect("/login");
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
