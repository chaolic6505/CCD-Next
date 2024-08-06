"use client";

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
    FormField,
    FormControl,
    FormItem,
    FormLabel,
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

import { cn } from "@/lib/utils";
import { CustomerField } from "@/types";
import { invoiceSchema, type InvoiceFormValues } from "@/lib/schemas/invoice";

export default function InvoiceDialog({
    customers,
}: {
    customers: CustomerField[];
}) {
    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     const form = e.currentTarget;
    //     const formData = new FormData(form);
    //     const { customer, amount, status } = Object.fromEntries(formData);

    //     console.log( customer, amount, status, " customer, amount, status");
    // };

    const defaultValues = {
        name: "",
        amount: "0",
        customer: "",
        status: "",
    };

    const submitForm: SubmitHandler<InvoiceFormValues> = (data) => {
        console.log("data ==>", data);
    };

    const form = useForm<InvoiceFormValues>({
        defaultValues,
        mode: "onChange",
        resolver: zodResolver(invoiceSchema),
    });
    const {
        control,
        register,
        formState: { errors },
    } = form;

    console.log("errors ==>", errors);
    return (
        <div className="z-50">
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant="default"
                        className="text-sm md:text-base lg:text-lg px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4"
                    >
                        ＋
                    </Button>
                </DialogTrigger>
                <DialogContent className="w-[50%] max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Add New Invoice</DialogTitle>
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
                            <div className={cn("gap-8 md:grid md:grid-cols-3")}>
                                <>
                                    <FormField
                                        name="name"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
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
                                        name="customer"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
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
                                        name="amount"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Enter amount"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="status"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
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
                            </div>
                            <DialogFooter>
                                <Button type="submit" form="invoice-form">
                                    Add
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
