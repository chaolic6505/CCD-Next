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
        <div className=" w-full">
            {
                !hideSearchBar && searchKey ?
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
                    /> : null
            }
            <div className="flex-1 text-sm text-muted-foreground px-3">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex">
                <ScrollArea className="h-[calc(95vh-300px)] rounded-md overflow-x-auto w-1 flex-1" type="always">
                    <div className="w-full whitespace-nowrap">
                        <Table className="relative min-w-full overflow-auto">
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
                            <TableBody className="relative w-full overflow-auto">
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
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
            <div className="flex items-center justify-end space-x-2 pb-4">
                {!hidePagination ? (
                    <div className="space-x-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
