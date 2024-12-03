import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Middleware function
export async function middleware(req: NextRequest) {
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
      // Use jose library to verify the token
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET_KEY)
      );
      console.log("Token payload:", payload);
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
