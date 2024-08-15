"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogOverlay, DialogContent, DialogTitle, DialogPortal, DialogDescription } from "./ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function Modal({
    children,
    defaultOpen = true,
}: { children: React.ReactNode, defaultOpen?: boolean; }) {
    const router = useRouter();
    const handleOpenChange = () => {
        router.back();
    };
    return (
        <Dialog defaultOpen={defaultOpen} open={defaultOpen} onOpenChange={handleOpenChange} >
            <DialogPortal>
                <DialogOverlay>
                    <VisuallyHidden>
                        <DialogTitle>Modal</DialogTitle>
                    </VisuallyHidden>
                    <DialogContent className="lg:max-w-screen-lg scrollbar overflow-y-scroll h-5/6">
                        <VisuallyHidden>
                            <DialogDescription>
                                Modal Description
                            </DialogDescription>
                        </VisuallyHidden>
                        {children}
                    </DialogContent>
                </DialogOverlay>
            </DialogPortal>
        </Dialog>

    );
}

export default Modal;
