'use client';
import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useSidebar } from '@/hooks/useSidebar';
import Menu from '@/components/new-dashboard-nav';
//import { DashboardNav } from '@/components/dashboard-nav';

type SidebarProps = {
    className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
    const [status, setStatus] = useState(false);
    const { isMinimized, toggle } = useSidebar();

    const handleToggle = () => {
        setStatus(true);
        toggle();
        setTimeout(() => setStatus(false), 500);
    };
    return (
        <nav
            className={cn(
                `relative hidden h-screen flex-none border-r z-10 pt-20 md:block`,
                status && 'duration-500',
                !isMinimized ? 'w-40' : 'w-[75px]',
                className
            )}
        >
            <ChevronLeft
                onClick={handleToggle}
                className={cn(
                    'absolute -right-3 top-20 cursor-pointer rounded-full border bg-background text-3xl text-foreground',
                    isMinimized && 'rotate-180'
                )}
            />
            {/* <div className="space-y-4 py-4">
                <div className="mt-3 space-y-1">
                    <Menu isOpen={!isMinimized} />
                </div>
            </div> */}
        </nav>
    );
}
