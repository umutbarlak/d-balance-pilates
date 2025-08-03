// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin koruma
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("auth-token");
    if (!token && pathname !== "/admin/login") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Statik dosyaları atla
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 🔥 Dinamik sayfaları kontrol et ama blog gibi özel rotalara rewrite yapma
  const staticRoutes = ["/", "/contact", "/blog"];

  const isStaticRoute =
    staticRoutes.includes(pathname) || pathname.startsWith("/blog/");

  if (!isStaticRoute) {
    // Sadece özel dinamik sayfalar için rewrite
    return NextResponse.rewrite(new URL(`/dynamic${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
