"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogOverlay, DialogContent, DialogTitle, DialogPortal } from "./ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function Modal({ children }: { children: React.ReactNode; }) {
    const router = useRouter();

    const handleOpenChange = () => {
        router.back();
    };

    return (

        <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange} >
            <DialogPortal>
                <DialogOverlay>
                    <VisuallyHidden>
                        <DialogTitle>Modal</DialogTitle>
                    </VisuallyHidden>
                    <DialogContent className="lg:max-w-screen-lg overflow-y-scroll max-h-screen">
                        {children}
                    </DialogContent>
                </DialogOverlay>
            </DialogPortal>
        </Dialog>

    );
}

export default Modal;
