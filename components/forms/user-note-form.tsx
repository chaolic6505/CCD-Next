"use client";

import * as z from "zod";
import { useState } from "react";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";

import {
    Form,
    FormItem,
    FormField,
    FormLabel,
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
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";

// import FileUpload from '../file-upload';
import { useToast } from "../ui/use-toast";

export const IMG_MAX_LIMIT = 3;
const ImgSchema = z.object({
    fileName: z.string(),
    name: z.string(),
    fileSize: z.number(),
    size: z.number(),
    fileKey: z.string(),
    key: z.string(),
    fileUrl: z.string(),
    url: z.string(),
});

const formSchema = z.object({
    title: z.string().min(0, { message: "Please provide a title" }),
    // imgUrl: z
    //     .array(ImgSchema)
    //     .max(IMG_MAX_LIMIT, { message: "You can only add up to 3 images" })
    //     .min(1, { message: "At least one image must be added." }),
    description: z.string().min(3, {
        message: "Document description must be at least 3 characters",
    }),
    // price: z.coerce.number(),
    // category: z.string().min(1, { message: "Please select a category" }),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
    initialData: any | null;
    categories: any;
}

export const UserNoteForm: React.FC<ProductFormProps> = ({
    initialData,
    categories,
}) => {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const headingTitle = initialData ? "Edit document" : "Create a document";
    const description = initialData ? "Edit a document." : "Add a new document";
    const toastMessage = initialData
        ? "Document updated."
        : "Document created.";
    const action = initialData ? "Save changes" : "Create";

    const defaultValues = initialData
        ? initialData
        : {
              name: "",
              description: "",
              price: 0,
              imgUrl: [],
              category: "",
          };

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const onSubmit = async (data: ProductFormValues) => {
        try {
            setLoading(true);
            console.log("data", data);
            if (initialData) {
                // await axios.post(`/api/products/edit-product/${initialData._id}`, data);
            } else {
                // const res = await axios.post(`/api/products/create-product`, data);
                // console.log("product", res);
            }
            router.refresh();
            //router.push(`/documents`);
            toast({
                variant: "default",
                title: "Success!",
                description: "Document created.",
            });
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            //   await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
            router.refresh();
            router.push(`/${params.storeId}/products`);
        } catch (error: any) {
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    // const triggerImgUrlValidation = () => form.trigger("imgUrl");

    return (
        <>
            {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      /> */}
            <div className="flex items-center justify-between">
                <Heading title={headingTitle} description={description} />
                {initialData && (
                    <Button
                        size="sm"
                        disabled={loading}
                        variant="destructive"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form
                    className="w-full space-y-8"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    {/* <FormField
                        control={form.control}
                        name="imgUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Images</FormLabel>
                                <FormControl>
                                    <FileUpload
                                        onChange={field.onChange}
                                        value={field.value}
                                        onRemove={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}
                    <div className="gap-8 md:grid md:grid-cols-3">
                        <FormField
                            name="title"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={loading}
                                            placeholder="Document title"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Document description"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* <FormField
                            name="price"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}

                        {/* <FormField
                            name="category"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Select a category"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem
                                                    key={category._id}
                                                    value={category._id}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="ml-auto"
                    >
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
};
