import "./globals.css";
import "@uploadthing/react/styles.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { NextIntlClientProvider } from 'next-intl';
import { Analytics } from "@vercel/analytics/react";
import { getLocale, getMessages } from 'next-intl/server';
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";

import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/layout/providers";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Chao Chao Dog",
    description: "AI personal assistant for your daily wardrobe",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const locale = await getLocale();
    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${inter.className} overflow-y-auto`}
                suppressHydrationWarning
            >
                <NextSSRPlugin
                    /**
                     * The `extractRouterConfig` will extract **only** the route configs
                     * from the router to prevent additional information from being
                     * leaked to the client. The data passed to the client is the same
                     * as if you were to fetch `/api/uploadthing` directly.
                     */
                    routerConfig={extractRouterConfig(ourFileRouter)}
                />
                <NextTopLoader showSpinner={true} />
                <Providers>
                    <Toaster />
                    <NextIntlClientProvider messages={messages}>
                        {children}
                    </NextIntlClientProvider>
                    <Analytics />
                    <SpeedInsights />
                </Providers>
            </body>
        </html>
    );
}
