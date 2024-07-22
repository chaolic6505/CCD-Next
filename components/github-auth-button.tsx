"use client";

import { Icons } from "./icons";
import { Button } from "./ui/button";

import { useRouter, useSearchParams } from "next/navigation";

export default function GoogleSignInButton() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");

    return (
        <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => router.push("/")}
        >
            <Icons.google className="mr-2 h-4 w-4" />
            Continue with Google
        </Button>
    );
}
