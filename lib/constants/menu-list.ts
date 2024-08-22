import { useTranslations } from "next-intl";
import { Invoice } from "../definitions";
import {
    Tag,
    Users,
    Settings,
    Bookmark,
    SquarePen,
    LayoutGrid,
    LucideIcon,
    CircuitBoard,
    SquareKanban,
    UserPen,
    Images,
    Brain,
    Notebook,
    Receipt,
    PersonStanding,
    HeartPulse,
    Star,
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
    const t = useTranslations("sidebar");

    return [
        {
            groupLabel: "",
            menus: [
                {
                    href: "/dashboard",
                    label: t("dashboard"),
                    active: pathname.includes("/dashboard"),
                    icon: LayoutGrid,
                    submenus: [],
                },
            ],
        },
        {
            groupLabel: t("content"),
            menus: [
                {
                    href: "/collections",
                    label: t("collections"),
                    active: pathname.includes("/collections"),
                    icon: Star,
                    submenus: [],
                },
                {
                    href: "/invoices",
                    label: t("invoices"),
                    active: pathname.includes("/invoices"),
                    icon: Receipt,
                    submenus: [],
                },
                // {
                //     href: "/customers",
                //     label: "Customers",
                //     active: pathname.includes("/customers"),
                //     icon: PersonStanding,
                //     submenus: [],
                // },

                // {
                //     href: "",
                //     label: "Chats",
                //     active: pathname.includes("/chat"),
                //     icon: Brain,
                //     submenus: [
                //         {
                //             href: "/chat",
                //             label: "All Chats",
                //             active: pathname === "/chat",
                //         },
                //         {
                //             href: "/chat2",
                //             label: "AI tool",
                //             active: pathname === "/chat2",
                //         },
                //         {
                //             href: "/chat3",
                //             label: "JSON Streaming",
                //             active: pathname === "/chat3",
                //         },
                //         {
                //             href: "/chat4",
                //             label: "Server Component",
                //             active: pathname === "/chat4",
                //         },
                //     ],
                // },
                // {
                //     href: "/gallery",
                //     label: "Gallery",
                //     active: pathname.includes("/pdfchat"),
                //     icon: Images,
                //     submenus: [],
                // },
                // {
                //     href: "/pdfchat",
                //     label: "PDF Chat",
                //     active: pathname.includes("/pdfchat"),
                //     icon: SquarePen,
                //     submenus: [],
                // },
                // {
                //     href: "",
                //     label: "Notes",
                //     active: pathname.includes("/notes"),
                //     icon: SquarePen,
                //     submenus: [
                //         {
                //             href: "/notes",
                //             label: "All Notes",
                //             active: pathname === "/notes",
                //         },
                //     ],
                // },
                // {
                //     href: "/employees",
                //     label: "Employees",
                //     active: pathname.includes("/employees"),
                //     icon: SquarePen,
                //     submenus: [
                //         {
                //             href: "/employees",
                //             label: "All Employees",
                //             active: pathname === "/employees",
                //         },
                //     ],
                // },

                // {
                //     href: "/kanban",
                //     label: "Kanban",
                //     active: pathname.includes("/kanban"),
                //     icon: SquareKanban,
                //     submenus: [],
                // },
                // {
                //     href: "/categories",
                //     label: "Categories",
                //     active: pathname.includes("/categories"),
                //     icon: Bookmark,
                //     submenus: [],
                // },
                // {
                //     href: "/tags",
                //     label: "Tags",
                //     active: pathname.includes("/tags"),
                //     icon: Tag,
                //     submenus: [],
                // },
            ],
        },
        // {
        //     groupLabel: "Settings",
        //     menus: [
        //         {
        //             href: "/profile",
        //             label: "Profile",
        //             active: pathname.includes("/profile"),
        //             icon: UserPen,
        //             submenus: [],
        //         },
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
