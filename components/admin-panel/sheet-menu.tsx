"use client";

import Link from "next/link";
import { MenuIcon, PanelsTopLeft } from "lucide-react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import { Button } from "@/components/ui/button";
import { Menu } from "@/components/admin-panel/menu";
import {
    Sheet,
    SheetTitle,
    SheetHeader,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { DialogDescription } from "../ui/dialog";
import { useStore } from "@/hooks/use-store";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";

export function SheetMenu() {
    const sidebar = useStore(useSidebarToggle, (state) => state);
    return (
        <Sheet open={sidebar?.isOpen} onOpenChange={sidebar?.setIsOpen}>
            <SheetTrigger asChild>
                <Button className="h-8" variant="outline" size="icon">
                    <MenuIcon size={20} />
                </Button>
            </SheetTrigger>
            <SheetContent
                side="right"
                className="sm:w-72 px-3 h-full flex flex-col"
            >
                <DialogDescription>
                    <VisuallyHidden.Root>
                        Description goes here
                    </VisuallyHidden.Root>
                </DialogDescription>
                <SheetHeader>
                    <VisuallyHidden.Root>
                        <SheetTitle>Are you absolutely sure?</SheetTitle>
                    </VisuallyHidden.Root>
                    <Button
                        asChild
                        variant="link"
                        className="flex justify-center items-center pb-2 pt-1"
                    >
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-2"
                        >
                            <PanelsTopLeft className="w-6 h-6 mr-1" />
                            <h1 className="font-bold text-lg">CCD</h1>
                        </Link>
                    </Button>
                </SheetHeader>
                <Menu isOpen={sidebar?.isOpen} />
            </SheetContent>
        </Sheet>
    );
}
