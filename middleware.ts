import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/signin(.*)", "/signup(.*)", "/"]);

export default clerkMiddleware((auth, request, response) => {
    const { userId } = auth();

    if (userId) {
        // If the user is authenticated and trying to access a public route, redirect to /collections
        if (isPublicRoute(request)) {
            return NextResponse.redirect(new URL("/collections", request.url));
        }
    } else {
        // If the user is not authenticated and trying to access a protected route, protect it
        if (!isPublicRoute(request)) {
            auth().protect();
        }
    }
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
