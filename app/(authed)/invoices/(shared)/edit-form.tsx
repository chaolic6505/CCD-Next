"use client";

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
import { toast } from "@/components/ui/use-toast";
import { DialogFooter } from "@/components/ui/dialog";
import { LoaderButton } from "@/components/loader-button";
import FileUpload, { UploadFileResponse } from "@/components/file-upload";

import { cn } from "@/lib/utils";
import { CURRENCY } from "@/lib/constants/currency";
import { State, updateInvoice } from "@/lib/actions/invoice.actions";
import { invoiceSchema, type InvoiceFormValues } from "@/lib/schemas/invoice";

import { CustomerField, Invoice } from "@/types";


export default function EditInvoiceForm({
    invoice,
    customers,
}: {
    invoice: Invoice;
    customers: CustomerField[];
}) {
    const { user } = useUser();
    const [isUploading, setIsUploading] = useState(false);
    const defaultValues = {
        image_urls: [{
            url: invoice.invoice_image_url,
            name: null,
            key: null,
            type: null,
            size: null,
            customId: null,
            serverdata: null,
        }],
        amount: `${invoice.amount ?? "0"}`,
        customer_id: invoice.customer_id ?? "",
        status: invoice.status ?? "pending",
        currency: invoice.currency ?? "CAD Dollar",
        invoice_name: invoice.invoice_name ?? "",
        invoice_date: invoice.invoice_date ?? `${moment().format("YYYY-MM-DD")}`,
    };

    const form = useForm<InvoiceFormValues>({
        defaultValues,
        mode: "onSubmit",
        resolver: zodResolver(invoiceSchema),
    });

    const {
        formState: { isDirty, isSubmitting, },
    } = form;

    const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
    const submitForm: SubmitHandler<InvoiceFormValues> = async (data) => {
        console.log(data, "data");
        if (user?.id) {
            const formData = new FormData();
            formData.append("amount", data.amount);
            formData.append("status", data.status);
            formData.append("currency", data.currency);
            formData.append("customer_id", data.customer_id);
            formData.append("invoice_date", data.invoice_date);
            formData.append("invoice_name", data.invoice_name);
            if (data.image_urls) formData.append("image_url", data.image_urls[0]?.url ?? "");
            updateInvoiceWithId(invoice as State, formData);
            toast({
                variant: "default",
                title: "Success!",
                description: "Invoice updated.",
            });
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
                                        files={field.value as UploadFileResponse[]}
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
                                                className="pr-10" // Add padding to the right to accommodate the symbol
                                                placeholder="Enter amount"
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
                    {
                        isDirty ?
                            <DialogFooter>
                                <div className="flex justify-end gap-4">
                                    <LoaderButton
                                        variant={"default"}
                                        form="edit-invoice-form"
                                        isLoading={isSubmitting || isUploading}
                                    >
                                        Edit Invoice
                                    </LoaderButton>
                                </div>
                            </DialogFooter> : null
                    }
                </form>
            </Form>
        </div>


    );
}
