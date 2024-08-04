"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { AlertTriangleIcon, Trash, Trash2Icon } from "lucide-react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

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
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import {
    Select,
    SelectItem,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
    collectionSchema,
    type CollectionFormValues,
} from "@/lib/collection-schema";

import { useTaskStore } from "@/lib/store";

export default function CollectionDialog() {
    const addCol = useTaskStore((state) => state.addCol);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const { name } = Object.fromEntries(formData);

        if (typeof name !== "string") return;

        console.log(name, "name");
    };

    const defaultValues = {

    };

    const processForm: SubmitHandler<CollectionFormValues> = (data) => {
        console.log("data ==>", data);
        //setData(data);
        // api call and reset
        // form.reset();
    };

    const form = useForm<CollectionFormValues>({
        resolver: zodResolver(collectionSchema),
        defaultValues,
        mode: "onChange",
    });

    const countries = [{ id: "wow", name: "india" }];
    const cities = [{ id: "2", name: "kerala" }];

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
                <DialogContent className="w-[50%] h-[90vh] max-w-none">
                    <DialogHeader>
                        <DialogTitle>Add New Collection</DialogTitle>
                        <DialogDescription>
                            Elevate your style and confidence
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form
                            className="w-full space-y-8"
                            onSubmit={form.handleSubmit(processForm)}
                        >
                            <div className={cn("gap-8 md:grid md:grid-cols-3")}>
                                <>
                                    <FormField
                                        name="name"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="John"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        name="country"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Country</FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    value={field.value}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue
                                                                defaultValue={
                                                                    field.value
                                                                }
                                                                placeholder="Select a country"
                                                            />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {/* @ts-ignore  */}
                                                        {countries.map(
                                                            (country) => (
                                                                <SelectItem
                                                                    key={
                                                                        country.id
                                                                    }
                                                                    value={
                                                                        country.id
                                                                    }
                                                                >
                                                                    {
                                                                        country.name
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
                                        control={form.control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>City</FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    value={field.value}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue
                                                                defaultValue={
                                                                    field.value
                                                                }
                                                                placeholder="Select a city"
                                                            />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {/* @ts-ignore  */}
                                                        {cities.map((city) => (
                                                            <SelectItem
                                                                key={city.id}
                                                                value={city.id}
                                                            >
                                                                {city.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                            </div>
                        </form>
                    </Form>
                    <DialogFooter>
                        <DialogTrigger asChild>
                            <Button type="submit" form="collection-form">
                                Add
                            </Button>
                        </DialogTrigger>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
