"use client";
import React from "react";
import { ConvexReactClient } from "convex/react";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

import ThemeProvider from "./ThemeToggle/theme-provider";

const convex = new ConvexReactClient(
    process.env.NEXT_PUBLIC_CONVEX_URL as string
);

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            enableSystem
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
            themes={["light", "dark", "redLight", "redDark"]}
        >
            <ClerkProvider
                publishableKey={
                    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? ""
                }
            >
                <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                    {children}
                </ConvexProviderWithClerk>
            </ClerkProvider>
        </ThemeProvider>
    );
}
