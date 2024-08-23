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
            // onOpenChange={setIsOpen}
            className="relative w-full overflow-hidden"
        >

            {/* <CollapsibleContent className="relative pt-[100%]">
                {
                    invoice_image_url ?
                        <button onClick={() => setIsOpen(false)}>
                            <Image
                                fill
                                alt="profile"
                                objectFit="cover"
                                src={invoice_image_url}
                                className="w-full h-full top-0 left-0 object-cover rounded-sm"
                            />
                        </button> : null
                }
            </CollapsibleContent> */}

            <div className="flex flex-row justify-end mb-1 mt-1 mr-1">
                <CollapsibleTrigger>
                    <ImageIcon className="h-5 w-5" />
                </CollapsibleTrigger>
            </div>
        </Collapsible>
    );
}
