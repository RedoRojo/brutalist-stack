import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get("admin_session")?.value;

  // If attempting to access admin dashboard without a session cookie, redirect to login
  if (pathname === "/admin") {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // If attempting to access login page with an active session cookie, redirect to dashboard
  if (pathname === "/admin/login") {
    if (sessionCookie) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/login"],
};
