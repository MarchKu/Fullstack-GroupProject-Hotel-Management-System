import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req) {
  const token = cookies().get("adminToken");
  const userToken = cookies().get("token");
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (token) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  } else {
    if (userToken) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
}

export const config = {
  matcher: [
    "/admin/bookings",
    "/admin/hotel-information",
    "/admin/booking-detail/:path*",
    "/admin/room-management",
    "/admin/room-property-all/:path*",
    "/booking/:path*",
    "/payment-success/:path*",
    "/profile/:path*",
  ],
};
