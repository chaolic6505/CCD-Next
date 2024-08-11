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

export function ImageCollapsible({ invoice_image_url }: { invoice_image_url: string | null | undefined; }) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="relative w-full overflow-hidden"
        >
            <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                    <ImageIcon className="h-4 w-4" />
                </Button>
            </CollapsibleTrigger>
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
        </Collapsible>
    );
}
