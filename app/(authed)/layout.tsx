'use client';

import Header from '@/components/layout/header';
import { RouteChangeHandler } from '@/components/RouteChangeHandler';

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {

    return (
        <>
            <Header />
            <RouteChangeHandler />
            <div className="flex h-screen overflow-hidden">
                <main className="flex-1 overflow-hidden pt-16">{children}</main>
            </div>
        </>
    );
}
