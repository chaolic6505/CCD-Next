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

export type User = {
    id: number;
    name: string;
    company: string;
    role: string;
    verified: boolean;
    status: string;
};
export const users: User[] = [
    {
        id: 1,
        name: "Candice Schiner",
        company: "Dell",
        role: "Frontend Developer",
        verified: false,
        status: "Active",
    },
    {
        id: 2,
        name: "John Doe",
        company: "TechCorp",
        role: "Backend Developer",
        verified: true,
        status: "Active",
    },
    {
        id: 3,
        name: "Alice Johnson",
        company: "WebTech",
        role: "UI Designer",
        verified: true,
        status: "Active",
    },
    {
        id: 4,
        name: "David Smith",
        company: "Innovate Inc.",
        role: "Fullstack Developer",
        verified: false,
        status: "Inactive",
    },
    {
        id: 5,
        name: "Emma Wilson",
        company: "TechGuru",
        role: "Product Manager",
        verified: true,
        status: "Active",
    },
    {
        id: 6,
        name: "James Brown",
        company: "CodeGenius",
        role: "QA Engineer",
        verified: false,
        status: "Active",
    },
    {
        id: 7,
        name: "Laura White",
        company: "SoftWorks",
        role: "UX Designer",
        verified: true,
        status: "Active",
    },
    {
        id: 8,
        name: "Michael Lee",
        company: "DevCraft",
        role: "DevOps Engineer",
        verified: false,
        status: "Active",
    },
    {
        id: 9,
        name: "Olivia Green",
        company: "WebSolutions",
        role: "Frontend Developer",
        verified: true,
        status: "Active",
    },
    {
        id: 10,
        name: "Robert Taylor",
        company: "DataTech",
        role: "Data Analyst",
        verified: false,
        status: "Active",
    },
];

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
                    href: "/dashboard",
                    label: "Dashboard",
                    active: pathname.includes("/dashboard"),
                    icon: LayoutGrid,
                    submenus: [],
                },
            ],
        },
        {
            groupLabel: "Contents",
            menus: [
                {
                    href: "",
                    label: "Posts",
                    active: pathname.includes("/posts"),
                    icon: SquarePen,
                    submenus: [
                        {
                            href: "/posts",
                            label: "All Posts",
                            active: pathname === "/posts",
                        },
                        {
                            href: "/posts/new",
                            label: "New Post",
                            active: pathname === "/posts/new",
                        },
                    ],
                },
                {
                    href: "/categories",
                    label: "Categories",
                    active: pathname.includes("/categories"),
                    icon: Bookmark,
                    submenus: [],
                },
                {
                    href: "/tags",
                    label: "Tags",
                    active: pathname.includes("/tags"),
                    icon: Tag,
                    submenus: [],
                },
            ],
        },
        {
            groupLabel: "Settings",
            menus: [
                {
                    href: "/account",
                    label: "Account",
                    active: pathname.includes("/account"),
                    icon: Settings,
                    submenus: [],
                },
            ],
        },
    ];
}

export const navItems: NavItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: "dashboard",
        label: "Dashboard",
    },
    {
        title: "User",
        href: "/dashboard/user",
        icon: "user",
        label: "user",
    },
    {
        title: "Employee",
        href: "/dashboard/employee",
        icon: "employee",
        label: "employee",
    },
    {
        title: "Profile",
        href: "/dashboard/profile",
        icon: "profile",
        label: "profile",
    },
    {
        title: "Kanban",
        href: "/dashboard/kanban",
        icon: "kanban",
        label: "kanban",
    },
    {
        title: "Login",
        href: "/",
        icon: "login",
        label: "login",
    },
];
