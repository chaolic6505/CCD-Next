import "./globals.css";
import "@uploadthing/react/styles.css";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Transition from "@/components/Transition";
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
            <body className={`${inter.className} overflow-y-auto`}>
                {/* <NextTopLoader showSpinner={false} /> */}
                <Providers>
                    <Toaster />
                    <Transition>{children}</Transition>
                </Providers>
            </body>
        </html>
    );
}
