import Header from '@/components/layout/header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Chao Chao Dog',
    description: 'Basic dashboard with Next.js and Shadcn'
};

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <div className="flex h-screen overflow-y-auto mb-40">
                <main className="flex-1 overflow-hidden pt-16">{children}</main>
            </div>
        </>
    );
}
