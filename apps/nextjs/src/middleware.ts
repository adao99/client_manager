import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  //add current path as a custom header
  request.headers.set("x-request-path", request.nextUrl.pathname);

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/:path*",
};
