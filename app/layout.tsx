import "./globals.css";
import "@uploadthing/react/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Analytics } from "@vercel/analytics/react";

import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/layout/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Chao Chao Dog",
    description: "AI personal assistant for your daily tasks",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className} overflow-y-auto`} suppressHydrationWarning>
                {/* <NextTopLoader showSpinner={false} /> */}
                <Providers>
                    <Toaster />
                    {children}
                    <Analytics />
                </Providers>
            </body>
        </html>
    );
}
