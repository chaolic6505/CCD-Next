import { UserNav } from "@/components/admin-panel/user-nav";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import ThemeToggle from "@/components/layout/ThemeToggle/theme-toggle";

export default function Header() {
    return (
        <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
            <div className="mx-4 sm:mx-8 flex h-14 items-center">
                <div className="flex items-center space-x-4 lg:space-x-0">
                    <ThemeToggle />

                </div>
                <div className="flex flex-1 items-center justify-end space-x-5 ">
                    <UserNav />
                    <SheetMenu />
                </div>
            </div>
        </header>
    );
}
