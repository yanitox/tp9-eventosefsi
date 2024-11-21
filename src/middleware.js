import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // Soporte para Next.js 13+

const publicRoutes = ["/", "/registro"];

export default async function middleware(req) {
  const path = req.nextUrl.pathname;

  const isProtectedRoute = !publicRoutes.includes(path);

  // Leer cookies
  const userToken =
    req.cookies?.get("user_token")?.value || cookies().get("user_token")?.value;

  console.log("Cookie user_token:", userToken);

  if (isProtectedRoute && !userToken) {
    console.log("Redirigiendo a login por falta de cookie");
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)",
    "/home",
  ],
};
