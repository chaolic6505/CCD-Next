"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useConvexAuth } from "convex/react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import UserAuthForm from "@/components/forms/user-auth-form";

import { api } from "@/convex/_generated/api";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function AuthenticationPage() {
    return (
        // <main>
        //     <SignedOut>
        //         <SignInButton />
        //     </SignedOut>
        //     <SignedIn>
        //         <UserButton />
        //         <Content />
        //     </SignedIn>
        // </main>

        function App() {
            const { isLoading, isAuthenticated } = useConvexAuth();

            return (
                <div className="App">
                    {isAuthenticated
                        ? "Logged in"
                        : "Logged out or still loading"}
                </div>
            );
        }
    );
}

function Content() {
    //const messages = useQuery(api.messages.getForCurrentUser);
    return <div>Authenticated content: 123123123</div>;
}
