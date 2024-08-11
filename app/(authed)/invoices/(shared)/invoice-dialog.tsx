"use client";

import moment from "moment";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import {
    Dialog,
    DialogTitle,
    DialogHeader,
    DialogFooter,
    DialogContent,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog";
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
import Modal from "@/components/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { LoaderButton } from "@/components/loader-button";
import FileUpload, { UploadFileResponse } from "@/components/file-upload";

import { cn } from "@/lib/utils";
import { CustomerField } from "@/types";
import { CURRENCY } from "@/lib/constants/currency";
import { createInvoice } from "@/lib/actions/invoice.actions";
import { invoiceSchema, type InvoiceFormValues } from "@/lib/schemas/invoice";

export default function InvoiceDialog({
    customers,
}: {
    customers: CustomerField[];
}) {
    const { user } = useUser();
    const [isUploading, setIsUploading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const defaultValues = {
        image_urls: [],
        customer_id: "",
        amount: "666.88",
        status: "pending",
        currency: "US Dollar",
        invoice_name: "Pho Men Tay Vietnamese Restaurant",
        invoice_date: `${moment().format("YYYY-MM-DD")}`,
    };

    const submitForm: SubmitHandler<InvoiceFormValues> = async (data) => {
        if (user?.id) {
            createInvoice(data, user?.id);
            setIsDialogOpen(false);
            toast({
                variant: "default",
                title: "Success!",
                description: "Invoice created.",
            });
        }
    };

    const form = useForm<InvoiceFormValues>({
        defaultValues,
        mode: "onSubmit",
        resolver: zodResolver(invoiceSchema),
    });
    const {
        getValues,
        formState: { isSubmitting },
    } = form;

    return (
        <div className="z-50">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="default"
                        className="text-sm md:text-base lg:text-lg px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-lg mr-3"
                    >
                        ＋
                    </Button>
                </DialogTrigger>
                <DialogContent className="w-[50%] max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Create New Invoice</DialogTitle>
                        <DialogDescription>
                            Revolutionize your invoicing
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form
                            id="invoice-form"
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
                                                onRemove={field.onChange}
                                                files={field.value ?? []}
                                                setIsUploading={setIsUploading}
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
                                <LoaderButton
                                    form="invoice-form"
                                    isLoading={isSubmitting || isUploading}
                                >
                                    Add
                                </LoaderButton>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
