"use client";

import Image from "next/image";
import { Trash } from "lucide-react";
import { UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { IMG_MAX_LIMIT } from "./forms/product-form";

export type UploadFileResponse = {
    url: string;
    key: string;
    name?: string;
    size?: number;
    type?: string;
    customId?: string | undefined;
    serverData?: string | undefined;

    // Matches what's returned from the serverside `onUploadComplete` callback
    // Will be `null` if `skipPolling` is set to `true`.
};

interface FileUploadProps {
    onChange?: any;
    onDrop: () => void;
    IMG_MAX_LIMIT?: number;
    files: UploadFileResponse[];
    onRemove: (value: UploadFileResponse[]) => void;
}

export default function FileUpload({
    files,
    onDrop,
    onChange,
    onRemove,
    IMG_MAX_LIMIT = 1,
}: FileUploadProps) {
    const { toast } = useToast();

    const onDeleteFile = (key: string) => {
        const _files = files;
        let filteredFiles = _files.filter(
            (item: UploadFileResponse) => item.key !== key
        );
        onRemove(filteredFiles);
    };
    const onUpdateFile = (newFiles: UploadFileResponse[]) => {
        onChange([...files, ...newFiles]);
        toast({
            title: "Success",
            description: "File uploaded successfully",
        });
    };
    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {files && files?.length
                    ? files?.map((item: UploadFileResponse, index) => (
                        <div
                            key={item.key}
                            className="relative h-[300px] w-full overflow-hidden rounded-md"
                        >
                            <div className="absolute right-2 top-2 z-10">
                                <Button
                                    size="sm"
                                    type="button"
                                    variant="destructive"
                                    onClick={() =>
                                        onDeleteFile(item.key ?? index)
                                    }
                                >
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>
                            <div>
                                <Image
                                    fill
                                    alt="Image"
                                    src={item.url || ""}
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    ))
                    : null}
            </div>
            <div>
                {files && files?.length < IMG_MAX_LIMIT && (
                    <UploadDropzone<OurFileRouter, "imageUploader">
                        endpoint="imageUploader"
                        config={{ mode: "auto" }}
                        className="ut-label:text-sm ut-allowed-content:ut-uploading:text-red-300 py-2 dark:bg-zinc-800"
                        onUploadBegin={() => onDrop()} content={{
                            allowedContent({ isUploading }) {
                                if (isUploading)
                                    return (
                                        <>
                                            <p className="mt-2 animate-pulse text-sm text-slate-400">
                                                Photo Uploading...
                                            </p>
                                        </>
                                    );
                            },
                        }}
                        onClientUploadComplete={(res) => {
                            // Do something with the response
                            if (res) {
                                let data: UploadFileResponse[] = res.map(
                                    (item) => ({
                                        ...item,
                                        customId: item.customId || undefined,
                                        serverData:
                                            item.serverData || undefined,
                                    })
                                );
                                onUpdateFile(data);
                            }
                        }}
                        onUploadError={(error: Error) => {
                            toast({
                                title: "Error",
                                variant: "destructive",
                                description: error.message,
                            });
                        }}
                    />
                )}
            </div>
        </div>
    );
}
