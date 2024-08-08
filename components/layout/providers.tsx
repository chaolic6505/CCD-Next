"use client";

import React from "react";
import { ClerkProvider, useAuth } from "@clerk/nextjs";

import ThemeProvider from "./ThemeToggle/theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            enableSystem
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
            themes={[
                "light",
                "dark",
                "slateLight",
                "slateDark",
                "redLight",
                "redDark",
            ]}
        >
            <ClerkProvider
                publishableKey={
                    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? ""
                }
            >
                {children}
            </ClerkProvider>
        </ThemeProvider>
    );
}
