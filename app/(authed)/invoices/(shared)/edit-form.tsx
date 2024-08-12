"use client";

import Link from "next/link";
import moment from "moment";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
    Form,
    FormItem,
    FormLabel,
    FormField,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectItem,
    SelectValue,
    SelectContent,
    SelectTrigger,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { LoaderButton } from "@/components/loader-button";
import FileUpload, { UploadFileResponse } from "@/components/file-upload";

import { cn } from "@/lib/utils";
import { CustomerField, InvoiceForm } from "@/types";
import { CURRENCY } from "@/lib/constants/currency";
import { State, updateInvoice } from "@/lib/actions/invoice.actions";
import { invoiceSchema, type InvoiceFormValues } from "@/lib/schemas/invoice";

export default function EditInvoiceForm({
    invoice,
    customers,
}: {
    invoice: InvoiceForm;
    customers: CustomerField[];
}) {
    const initialState: State = { message: null, errors: {} };
    const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);

    const { user } = useUser();
    const [isUploading, setIsUploading] = useState(false);
    const defaultValues = {
        image_urls: [],
        customer_id: "",
        amount: "666.88",
        status: "pending",
        currency: "US Dollar",
        invoice_name: "Pho Men Tay Vietnamese Restaurant",
        invoice_date: `${moment().format("YYYY-MM-DD")}`,
    };

    const form = useForm<InvoiceFormValues>({
        defaultValues,
        mode: "onSubmit",
        resolver: zodResolver(invoiceSchema),
    });

    const {
        reset,
        getValues,
        formState: { isSubmitting },
    } = form;

    const submitForm: SubmitHandler<InvoiceFormValues> = async (data) => {
        console.log(data, "data", invoice);
        if (user?.id) {
            //createInvoice(data, user?.id);
            // reset();
            // setIsDialogOpen(false);
            // toast({
            //     variant: "default",
            //     title: "Success!",
            //     description: "Invoice created.",
            // });
        }
    };


    return (
        <div className="overflow-y-visible">
            <Form {...form}>
                <form
                    id="edit-invoice-form"
                    className="w-full space-y-8"
                    onSubmit={form.handleSubmit(submitForm)}
                >
                    <div className={cn("gap-8 grid md:grid-cols-3")}>
                        <>
                            <FormField
                                name="invoice_name"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Invoice Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="customer_id"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Customer Name
                                        </FormLabel>
                                        <Select
                                            value={field.value}
                                            defaultValue={field.value}
                                            onValueChange={
                                                field.onChange
                                            }
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        placeholder="Choose a customer"
                                                        defaultValue={
                                                            field.value
                                                        }
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {/* @ts-ignore  */}
                                                {customers.map(
                                                    (customer) => (
                                                        <SelectItem
                                                            key={
                                                                customer.id
                                                            }
                                                            value={
                                                                customer.id
                                                            }
                                                        >
                                                            {
                                                                customer.name
                                                            }
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="status"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Invoice Status
                                        </FormLabel>
                                        <Select
                                            value={field.value}
                                            defaultValue={field.value}
                                            onValueChange={
                                                field.onChange
                                            }
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        placeholder="Choose a status"
                                                        defaultValue={
                                                            field.value
                                                        }
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {/* @ts-ignore  */}
                                                {[
                                                    "pending",
                                                    "paid",
                                                ].map(
                                                    (status, index) => (
                                                        <SelectItem
                                                            key={index}
                                                            value={
                                                                status
                                                            }
                                                        >
                                                            {status}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                        <FormField
                            name="amount"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Invoice Amount
                                    </FormLabel>
                                    <FormControl>
                                        <div>
                                            <Input
                                                {...field}
                                                type="number"
                                                placeholder="Enter amount"
                                                className="pr-10" // Add padding to the right to accommodate the symbol
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="currency"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Invoice Currency
                                    </FormLabel>
                                    <Select
                                        value={field.value}
                                        defaultValue={field.value}
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                        }}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    placeholder="Choose a currency"
                                                    defaultValue={
                                                        field.value
                                                    }
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {/* @ts-ignore  */}
                                            {CURRENCY[
                                                "north_america"
                                            ].map((country, index) => (
                                                <SelectItem
                                                    key={index}
                                                    value={country.name}
                                                >
                                                    {country.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name={"invoice_date"}
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Invoice date</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="date"
                                            {...field}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        name="image_urls"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Images</FormLabel>
                                <FormControl>
                                    <FileUpload
                                        onDrop={() =>
                                            setIsUploading(true)
                                        }
                                        onRemove={field.onChange}
                                        files={field.value ?? []}
                                        onChange={(
                                            value: UploadFileResponse[]
                                        ) => {
                                            if (value) {
                                                field.onChange(value);
                                                setIsUploading(false);
                                            }
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <DialogFooter>
                        <div className="mt-6 flex justify-end gap-4">
                            <Button variant="secondary">
                                <Link href="/invoices">
                                    Cancel
                                </Link>
                            </Button>
                            <LoaderButton
                                variant={"default"}
                                form="edit-invoice-form"
                                isLoading={isSubmitting || isUploading}
                            >
                                Edit Invoice
                            </LoaderButton>
                        </div>
                    </DialogFooter>
                </form>
            </Form>
        </div>


    );
}
