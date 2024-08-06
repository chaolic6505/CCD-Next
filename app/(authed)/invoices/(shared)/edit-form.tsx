"use client";

import Link from "next/link";
import {
    CheckIcon,
    ClockIcon,
    DollarSignIcon,
    UserCircleIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomerField, InvoiceForm } from "@/types";
import { State, updateInvoice } from "@/lib/actions/invoice.actions";


export default function EditInvoiceForm({
    invoice,
    customers,
}: {
    invoice: InvoiceForm;
    customers: CustomerField[];
}) {
    const initialState: State = { message: null, errors: {} };
    const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);


    return (
        <form>
            <div className="rounded-md   p-4 md:p-6">
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
                            aria-describedby="customer-error"
                            defaultValue={invoice.customer_id}
                            className="peer block w-full cursor-pointer rounded-md border   py-2 pl-10 text-sm outline-2  "
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
                                step="0.01"
                                name="amount"
                                type="number"
                                defaultValue={invoice.amount}
                                placeholder="Enter USD amount"
                                aria-describedby="amount-error"
                                className="peer block w-full rounded-md border   py-2 pl-10 text-sm outline-2  "
                            />
                            <DollarSignIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 " />
                        </div>
                    </div>


                </div>

                {/* Invoice Status */}
                <fieldset>
                    <legend className="mb-2 block text-sm font-medium">
                        Set the invoice status
                    </legend>
                    <div className="rounded-md border  px-[14px] py-3">
                        <div className="flex gap-4">
                            <div className="flex items-center">
                                <input
                                    id="pending"
                                    name="status"
                                    type="radio"
                                    value="pending"
                                    defaultChecked={
                                        invoice.status === "pending"
                                    }
                                    className="h-4 w-4   focus:ring-2"
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
                                    className="h-4 w-4  focus:ring-2"
                                    defaultChecked={invoice.status === "paid"}
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
                <Button variant="ghost">
                    <Link href="/invoices">Cancel</Link>
                </Button>

                <Button type="submit">Edit Invoice</Button>
            </div>
        </form>
    );
}
