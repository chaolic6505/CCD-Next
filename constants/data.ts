import { NavItem } from "@/types";
import {
    Tag,
    Users,
    Settings,
    Bookmark,
    SquarePen,
    LayoutGrid,
    LucideIcon,
} from "lucide-react";


export type Employee = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    gender: string;
    date_of_birth: string; // Consider using a proper date type if possible
    street: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
    longitude?: number; // Optional field
    latitude?: number; // Optional field
    job: string;
    profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

type Submenu = {
    href: string;
    label: string;
    active: boolean;
};

type Menu = {
    href: string;
    label: string;
    active: boolean;
    icon: LucideIcon;
    submenus: Submenu[];
};

type Group = {
    groupLabel: string;
    menus: Menu[];
};

export function getNewMenuList(pathname: string): Group[] {
    return [
        {
            groupLabel: "",
            menus: [
                {
                    href: "/invoices",
                    label: "Home",
                    active: pathname.includes("/invoices"),
                    icon: LayoutGrid,
                    submenus: [],
                },
            ],
        },
        // {
        //     groupLabel: "Contents",
        //     menus: [
        //         {
        //             href: "",
        //             label: "Posts",
        //             active: pathname.includes("/posts"),
        //             icon: SquarePen,
        //             submenus: [
        //                 {
        //                     href: "/posts",
        //                     label: "All Posts",
        //                     active: pathname === "/posts",
        //                 },
        //                 {
        //                     href: "/posts/new",
        //                     label: "New Post",
        //                     active: pathname === "/posts/new",
        //                 },
        //             ],
        //         },
        //         {
        //             href: "/categories",
        //             label: "Categories",
        //             active: pathname.includes("/categories"),
        //             icon: Bookmark,
        //             submenus: [],
        //         },
        //         {
        //             href: "/tags",
        //             label: "Tags",
        //             active: pathname.includes("/tags"),
        //             icon: Tag,
        //             submenus: [],
        //         },
        //     ],
        // },
        // {
        //     groupLabel: "Settings",
        //     menus: [
        //         {
        //             href: "/account",
        //             label: "Account",
        //             active: pathname.includes("/account"),
        //             icon: Settings,
        //             submenus: [],
        //         },
        //     ],
        // },
    ];
}
