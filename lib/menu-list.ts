import {
    Tag,
    Users,
    Settings,
    Bookmark,
    SquarePen,
    LayoutGrid,
    LucideIcon,
} from "lucide-react";

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

export function getMenuList(pathname: string): Group[] {
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
                    label: "Chats",
                    active: pathname.includes("/chat"),
                    icon: SquarePen,
                    submenus: [
                        {
                            href: "/chat",
                            label: "All Chats",
                            active: pathname === "/chat",
                        },
                        {
                            href: "/chat2",
                            label: "Chat (Server Component)",
                            active: pathname === "/chat",
                        },
                        // {
                        //     href: "/posts/new",
                        //     label: "New Post",
                        //     active: pathname === "/posts/new",
                        // },
                    ],
                },
                {
                    href: "/employees",
                    label: "Employees",
                    active: pathname.includes("/employees"),
                    icon: SquarePen,
                    submenus: [
                        {
                            href: "/employees",
                            label: "All Employees",
                            active: pathname === "/employees",
                        },
                        // {
                        //     href: "/posts/new",
                        //     label: "New Post",
                        //     active: pathname === "/posts/new",
                        // },
                    ],
                },
                {
                    href: "/profile",
                    label: "Profile",
                    active: pathname.includes("/profile"),
                    icon: SquarePen,
                    submenus: [],
                },
                {
                    href: "/users",
                    label: "Users",
                    active: pathname.includes("/users"),
                    icon: SquarePen,
                    submenus: [],
                },
                {
                    href: "/kanban",
                    label: "Kanban",
                    active: pathname.includes("/kanban"),
                    icon: SquarePen,
                    submenus: [],
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
                    href: "/users",
                    label: "Users",
                    active: pathname.includes("/users"),
                    icon: Users,
                    submenus: [],
                },
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
