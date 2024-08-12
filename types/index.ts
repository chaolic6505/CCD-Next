import { Icons } from "@/components/icons";

export type FormattedCustomersTable = {
    id: string;
    name: string;
    email: string;
    image_url: string;
    total_invoices: number;
    total_pending: string;
    total_paid: string;
};

export type CustomerField = {
    id: string;
    name: string;
};

export type InvoiceForm = {
    id: string;
    customer_id: string;
    amount: number;
    status: "pending" | "paid";
};

export interface NavItem {
    title: string;
    href?: string;
    disabled?: boolean;
    external?: boolean;
    icon?: keyof typeof Icons;
    label?: string;
    description?: string;
}

export interface NavItemWithChildren extends NavItem {
    items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
    items?: NavItemWithChildren[];
}

export interface FooterItem {
    title: string;
    items: {
        title: string;
        href: string;
        external?: boolean;
    }[];
}

export type todoType = {
    id: number;
    text: string;
    done: boolean;
    userId: number;
};

export type User = {
    id: number;
    name: string;
    company: string;
    role: string;
    verified: boolean;
    status: string;
};

export type Invoice = {
    id: string;
    status?: string | null;
    currency?: string | null;
    created_at?: number | null;
    invoice_name?: string| null;
    invoice_date?: string | null;
    customer_name?: string| null;
    customer_email?: string| null;
    invoice_amount?: number | null;
    invoice_status?: string | null;
    invoice_image_url?: string | null;
};

export type ColumnSort = {
    id: string;
    desc: boolean;
};

export type SortingState = ColumnSort[];

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;
