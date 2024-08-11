"use client";

import { SearchIcon } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

export default function SearchBar({ placeholder }: { placeholder: string }) {
    const { replace } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", "1");

        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
            params.delete("page");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <SearchIcon className="absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                placeholder={placeholder}
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get("query")?.toString()}
                className={cn(
                    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                )}
            />
        </div>
    );
}
