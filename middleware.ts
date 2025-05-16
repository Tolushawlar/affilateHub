import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const routeMatchers = {
  auth: createRouteMatcher(["/login", "/register"]),
  protected: createRouteMatcher(["/dashboard/(.*)"])
};

export default clerkMiddleware(async (auth, req) => {
  const { auth: authRoutes, protected: protectedRoutes } = routeMatchers;
  const { sessionClaims } = await auth();
  const isAuthenticated = !!sessionClaims;

  // Redirect unauthenticated users to login for protected routes
  if (!isAuthenticated && protectedRoutes(req)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Redirect authenticated users to dashboard if trying to access auth routes
  if (isAuthenticated && authRoutes(req)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Allow all other requests to proceed
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Match all routes except static files and Next.js internals
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
