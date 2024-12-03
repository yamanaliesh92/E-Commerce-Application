import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// Middleware function
export function middleware(req: NextRequest) {
  console.log("++++++++", req);
  const { pathname, searchParams } = req.nextUrl;

  const protectedRoutes = ["/create", "/dashboard/:path*"];

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const tokenCookie = req.cookies.get("token");

    if (!tokenCookie) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const token = tokenCookie.value;

    try {
      jwt.verify(token, process.env.JWT_SECRET_KEY!);
    } catch (error) {
      console.error("Token verification failed:", error);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  let locale = req.cookies.get("NEXT_LOCALE")?.value || "en";

  if (searchParams.has("locale")) {
    locale = searchParams.get("locale") || "en";
    req.cookies.set("NEXT_LOCALE", locale);
    const response = NextResponse.next();
    response.cookies.set("NEXT_LOCALE", locale, { path: "/" });
    return response;
  }

  const response = NextResponse.next();
  response.cookies.set("NEXT_LOCALE", locale, { path: "/" });

  return response;
}

export const config = {
  matcher: ["/create", "/dashboard/:path*"],
};
