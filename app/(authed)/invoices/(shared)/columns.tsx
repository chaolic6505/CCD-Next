"use client";

import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import InvoiceStatus from "./status";
import { CellAction } from "./cell-action";

import { Invoice } from "@/types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatCurrency, formatTS } from "@/lib/utils";

export const columns: ColumnDef<Invoice>[] = [
    // {
    //     id: "select",
    //     header: ({ table }) => (
    //         <Checkbox
    //             aria-label="Select all"
    //             checked={table.getIsAllPageRowsSelected()}
    //             onCheckedChange={(value) =>
    //                 table.toggleAllPageRowsSelected(!!value)
    //             }
    //         />
    //     ),
    //     cell: ({ row }) => (
    //         <Checkbox
    //             aria-label="Select row"
    //             checked={row.getIsSelected()}
    //             onCheckedChange={(value) => row.toggleSelected(!!value)}
    //         />
    //     ),
    //     enableSorting: true,
    // },
    {
        accessorKey: "created_at",
        cell: (props) => (
            <span>{formatTS(props.getValue() as number)}</span>
        ),
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Created At
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        }
    },
    {
        accessorKey: "invoice_date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Invoice Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        }
    },
    {
        accessorKey: "invoice_name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Invoice Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: (props) => <span>{(props.getValue() as string) || 'N/A'}</span>,
    },
    {
        accessorKey: "customer_name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Customer Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "customer_email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "invoice_amount",
        cell: (props) => (
            <span>{formatCurrency(props.getValue() as number)}</span>
        ),
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Amount
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "status",
        cell: (props) => <InvoiceStatus status={props.getValue() as string} />,
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
