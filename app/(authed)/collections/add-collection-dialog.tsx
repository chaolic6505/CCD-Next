"use client";

import * as React from "react";
import {
    Dialog,
    DialogTitle,
    DialogHeader,
    DialogFooter,
    DialogContent,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useTaskStore } from "@/lib/store";

export default function NewCollectionDialog() {
    const addCol = useTaskStore((state) => state.addCol);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const { name } = Object.fromEntries(formData);

        if (typeof name !== "string") return;

        console.log(name, 'name');
    };

    return (
        <div className="fixed bottom-5 right-5 z-50">
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        size="lg"
                        variant="default"
                        className="text-sm md:text-base lg:text-lg px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4"
                    >
                        ＋
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Collection</DialogTitle>
                        <DialogDescription>
                            Elevate your style and confidence
                        </DialogDescription>
                    </DialogHeader>
                    <form
                        id="todo-form"
                        onSubmit={handleSubmit}
                        className="grid gap-4 py-4"
                    >
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Input
                                id="title"
                                name="title"
                                className="col-span-4"
                                placeholder="Collection Name..."
                            />
                        </div>
                    </form>
                    <DialogFooter>
                        <DialogTrigger asChild>
                            <Button type="submit" form="todo-form">
                                Add
                            </Button>
                        </DialogTrigger>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
