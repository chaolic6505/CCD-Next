import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/signin(.*)", "/signup(.*)", "/"]);
const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/collections(.*)", "/invoices(.*)"]);

export default clerkMiddleware((auth, request) => {
    const { userId } = auth();

    if (!userId && isProtectedRoute(request)) return NextResponse.redirect(new URL("/", request.url));;
    if (isProtectedRoute(request)) auth().protect();
    if (isPublicRoute(request) && userId && userId == 'user_2gfs8voqQwlIuXC4cuu5ugMtfrj') return NextResponse.redirect(new URL("/invoices", request.url));
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};