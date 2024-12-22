import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Allow all static resources (CSS, JS, images, etc.)
  if (pathname.endsWith('.css') || pathname.endsWith('.js') || pathname.endsWith('.png') || pathname.endsWith('.jpg')) {
    return NextResponse.next();
  }

  // Allow Next.js internal routes (_next/*)
  if (pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  // Allow the /api/register and /api/signin APIs
  if (pathname.startsWith("/api/register") || pathname.startsWith("/api/signin")) {
    return NextResponse.next();
  }

  // If the user is trying to access the root (/) and doesn't have the adminid cookie, don't redirect
  if (pathname === "/") {
    return NextResponse.next();
  }

  // Check if the adminid cookie exists
  const adminId = req.cookies.get("adminid");

  // If no adminId cookie and not on the root page, redirect to the root page
  if (!adminId) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If adminId exists, allow the request to continue
  return NextResponse.next();
}

export const config = {
  // Apply middleware to all routes except /api/register, /api/signin
  matcher: [
    "/((?!api/register|api/signin).*)", // Excludes /api/register and /api/signin routes
  ],
};
