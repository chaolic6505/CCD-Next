"use client";

import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import InvoiceStatus from "./status";
import { CellAction } from "./cell-action";

import { Invoice } from "@/types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatCurrency, formatTS } from "@/lib/utils";
import { useTranslations } from "next-intl";

export const columns: ColumnDef<Invoice>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                aria-label="Select all"
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                aria-label="Select row"
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
            />
        ),
        enableSorting: true,
    },
    {
        accessorKey: "created_at",
        cell: (props) => <span>{formatTS(props.getValue() as number)}</span>,
        header: ({ column }) => {
            const t = useTranslations("InvoicePage.table");
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    {t("created_at")}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "invoice_date",
        header: ({ column }) => {
            const t = useTranslations("InvoicePage.table");
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    {t("invoice_date")}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "invoice_name",
        header: ({ column }) => {
            const t = useTranslations("InvoicePage.table");
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    {t("invoice_name")}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: (props) => <span>{(props.getValue() as string) || "N/A"}</span>,
    },
    {
        accessorKey: "customer_name",
        header: ({ column }) => {
            const t = useTranslations("InvoicePage.table");
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    {t("customer_name")}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "customer_email",
        header: ({ column }) => {
            const t = useTranslations("InvoicePage.table");
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    {t("customer_email")}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "invoice_amount",
        header: ({ column }) => {
            const t = useTranslations("InvoicePage.table");
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    {t("invoice_amount")}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "status",
        cell: (props) => <InvoiceStatus status={props.getValue() as string} />,
        header: ({ column }) => {
            const t = useTranslations("InvoicePage.table");
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    {t("status")}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    // {
    //     id: "actions",
    //     cell: ({ row }) => <CellAction data={row.original} />,
    // },
];
