import { NextResponse } from "next/server";
import { auth } from "./lib/auth/auth";

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await request.headers,
  });
  const user = session?.user;

  const { pathname } = request.nextUrl;
  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register");

  if (!user && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/add-project",
    "/login",
    "/register"
  ],
};



