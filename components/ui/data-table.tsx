"use client";

import * as React from "react";
import {
    ColumnDef,
    flexRender,
    SortingState,
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
} from "@tanstack/react-table";

import {
    Table,
    TableRow,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
} from "@/components/ui/table";
import { Input } from "./input";
import { Button } from "./button";
import { ScrollArea, ScrollBar } from "./scroll-area";

interface DataTableProps<TData, TValue> {
    data: TData[];
    searchKey?: string;
    hideSearchBar?: boolean;
    hidePagination?: boolean;
    defaultSorting?: SortingState;
    columns: ColumnDef<TData, TValue>[];
}

export function DataTable<TData, TValue>({
    data,
    columns,
    searchKey,
    hideSearchBar,
    hidePagination,
    defaultSorting,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>(
        defaultSorting ?? []
    );

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    });

    /* this can be used to get the selected rows
  console.log("value", table.getFilteredSelectedRowModel()); */

    return (
        <>
            {!hideSearchBar && searchKey ? (
                <Input
                    className="w-full md:max-w-sm"
                    placeholder={`Search ${searchKey}...`}
                    value={
                        (table
                            .getColumn(searchKey)
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn(searchKey)
                            ?.setFilterValue(event.target.value)
                    }
                />
            ) : null}

            <ScrollArea className="h-[calc(80vh-200px)] rounded-md border">
                <Table className="relative">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>

                {!hidePagination ? (
                    <div className="space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                ) : null}
            </div>
        </>
    );
}
