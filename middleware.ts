import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/signin(.*)", "/signup(.*)", "/"]);

export default clerkMiddleware((auth, request, response) => {
    const { userId } = auth();
console.log('userId', userId)
    if (userId) {
        // If the user is authenticated and trying to access a public route, redirect to /collections
        if (isPublicRoute(request) &&  userId === 'user_2gfs8voqQwlIuXC4cuu5ugMtfrj') {
            return NextResponse.redirect(new URL("/dashboard", request.url));
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
