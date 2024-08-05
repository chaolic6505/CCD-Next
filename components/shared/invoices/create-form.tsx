"use client";
import Link from "next/link";
import { useFormState } from "react-hook-form";
import { CheckIcon, ClockIcon, DollarSign, UserCircleIcon } from "lucide-react";

import { CustomerField } from "@/types";
import { Button } from "@/components/ui/button";
import { createInvoice, State } from "@/lib/actions/invoice.actions";

export default function Form({ customers }: { customers: CustomerField[] }) {
    return (
        <form>
            <div className="rounded-md  p-4 md:p-6">
                {/* Customer Name */}
                <div className="mb-4">
                    <label
                        htmlFor="customer"
                        className="mb-2 block text-sm font-medium"
                    >
                        Choose customer
                    </label>
                    <div className="relative">
                        <select
                            id="customer"
                            name="customerId"
                            className="peer block w-full cursor-pointer rounded-md border  py-2 pl-10 text-sm outline-2 "
                            defaultValue=""
                            aria-describedby="customer-error"
                        >
                            <option value="" disabled>
                                Select a customer
                            </option>
                            {customers.map((customer) => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.name}
                                </option>
                            ))}
                        </select>
                        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 " />
                    </div>
                </div>

                {/* Invoice Amount */}
                <div className="mb-4">
                    <label
                        htmlFor="amount"
                        className="mb-2 block text-sm font-medium"
                    >
                        Choose an amount
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="amount"
                                name="amount"
                                type="number"
                                step="0.01"
                                placeholder="Enter USD amount"
                                className="peer block w-full rounded-md border  py-2 pl-10 text-sm outline-2 "
                                aria-describedby="amount-error"
                            />
                            <DollarSign className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2  " />
                        </div>
                    </div>
                </div>

                {/* Invoice Status */}
                <fieldset>
                    <legend className="mb-2 block text-sm font-medium">
                        Set the invoice status
                    </legend>
                    <div className="rounded-md border   px-[14px] py-3">
                        <div className="flex gap-4">
                            <div className="flex items-center">
                                <input
                                    id="pending"
                                    name="status"
                                    type="radio"
                                    value="pending"
                                    className="text-white-600 h-4 w-4 cursor-pointer   focus:ring-2"
                                />
                                <label
                                    htmlFor="pending"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full  px-3 py-1.5 text-xs font-medium  "
                                >
                                    Pending <ClockIcon className="h-4 w-4" />
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="paid"
                                    name="status"
                                    type="radio"
                                    value="paid"
                                    className="h-4 w-4 cursor-pointer    focus:ring-2"
                                />
                                <label
                                    htmlFor="paid"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full   px-3 py-1.5 text-xs font-medium  "
                                >
                                    Paid <CheckIcon className="h-4 w-4" />
                                </label>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Button variant="outline" asChild>
                    <Link href="/dashboard/invoices">Cancel</Link>
                </Button>

                <Button type="submit">Create Invoice</Button>
            </div>
        </form>
    );
}
