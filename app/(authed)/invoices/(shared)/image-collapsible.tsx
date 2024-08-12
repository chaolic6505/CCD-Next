"use client";

import Image from "next/image";
import * as React from "react";
import { ImageIcon } from "@radix-ui/react-icons";


import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

export function ImageCollapsible({
    left,
    invoice_image_url
}: {
    left?: React.ReactNode;
    invoice_image_url: string | null | undefined;
}) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="relative w-full overflow-hidden"
        >

            <CollapsibleContent className="relative pt-[100%]">
                {
                    invoice_image_url ?
                        <Image
                            fill
                            alt="profile"
                            objectFit="cover"
                            src={invoice_image_url}
                            className="w-full h-full top-0 left-0 object-cover rounded-sm"
                        /> : null
                }

            </CollapsibleContent>
            <div className="flex flex-row justify-end">
                <CollapsibleTrigger>
                    <Button variant="ghost" size="sm" className="mb-1 mt-1 bg-none active:bg-none right-15">
                        <ImageIcon className="h-4 w-4" />
                    </Button>
                </CollapsibleTrigger>
            </div>
        </Collapsible>
    );
}
