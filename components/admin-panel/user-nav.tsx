"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import { LayoutGrid, LogOut, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/components/ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserNav() {
    const router = useRouter();
    const { user } = useUser();
    const { signOut } = useClerk();

    if (user) {
        return (
            <DropdownMenu>
                <TooltipProvider disableHoverableContent>
                    <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    onClick={() => router.push("/profile")}
                                    className="relative h-8 w-8 rounded-full"
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="#" alt="Avatar" />
                                        <AvatarFallback className="bg-transparent">
                                            {user?.firstName?.[0] ?? ""}
                                            {user?.lastName?.[0] ?? ""}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">Profile</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">
                                {user?.firstName}
                            </p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {user?.emailAddresses?.[0]?.emailAddress}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            className="hover:cursor-pointer"
                            asChild
                        >
                            <Link href="/profile" className="flex items-center">
                                <User className="w-4 h-4 mr-3 text-muted-foreground" />
                                Profile
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="hover:cursor-pointer"
                        onClick={() => signOut({ redirectUrl: "/" })}
                    >
                        <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
                        Sign out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }
}
