// components/RouteChangeHandler.tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { useStore } from "@/hooks/use-store";

export function RouteChangeHandler() {
    const pathname = usePathname();
    const closeSidebar = useSidebarToggle((state) => state.close);
    const sidebar = useStore(useSidebarToggle, (state) => state);

    useEffect(() => {
        console.log("RouteChangeHandler", pathname);
        if (sidebar?.isOpen) closeSidebar();
    }, [pathname, closeSidebar]);

    return null;
}
