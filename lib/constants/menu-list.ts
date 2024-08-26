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
    Home,
    CheckCircle2,
    DollarSignIcon,
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
                    href: "/invoices",
                    label: t("home"),
                    active: pathname.includes("/invoices"),
                    icon: Home,
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
                    href: "/pricing",
                    label: t("pricing"),
                    active: pathname.includes("/pricing"),
                    icon: DollarSignIcon,
                    submenus: [],
                }
            ]
        },
    ];
}
