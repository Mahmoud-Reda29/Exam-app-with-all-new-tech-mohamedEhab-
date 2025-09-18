import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Authentication Middleware
 * -------------------------
 * - Protects routes from unauthorized access.
 * - Redirects unauthenticated users to `/login`.
 * - Redirects authenticated users away from auth routes (login, register, forgot-password) to `/`.
 * - Uses `next-auth` JWT for session validation.
 */
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Routes that don't require authentication
  const isAuthRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/forgot-password");

  // Redirect unauthenticated users to login
  if (!token && !isAuthRoute) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users away from auth routes
  if (token && isAuthRoute) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Allow access if authenticated or visiting public routes
  return NextResponse.next();
}

// Apply middleware to all routes except API, _next static files, images, and favicon
export const config = {
  matcher: [
  "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
],
};
