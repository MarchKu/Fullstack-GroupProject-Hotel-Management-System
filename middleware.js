import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req) {
  const token = cookies().get("adminToken");
  if (token) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
}

export const config = {
  matcher: [
    "/admin/bookings",
    "/admin/hotel-information",
    "/admin/booking-detail/:path*",
    "/admin/room-management",
    "/admin/room-property-all/:path*",
  ],
};
