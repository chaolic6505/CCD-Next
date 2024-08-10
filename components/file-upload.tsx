'use client';

import Image from 'next/image';
import { Trash } from 'lucide-react';
import { UploadDropzone } from '@uploadthing/react';
import { OurFileRouter } from '@/app/api/uploadthing/core';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { IMG_MAX_LIMIT } from './forms/product-form';

export type UploadFileResponse = {
    name: string;
    size: number;
    key: string;
    url: string;
    fileUrl: string;

    // Matches what's returned from the serverside `onUploadComplete` callback
    // Will be `null` if `skipPolling` is set to `true`.
};

interface ImageUploadProps {
    onChange?: any;
    value: UploadFileResponse[];
    onRemove: (value: UploadFileResponse[]) => void;
}

export default function FileUpload({
    onChange,
    onRemove,
    value
}: ImageUploadProps) {
    const { toast } = useToast();

    const onDeleteFile = (key: string) => {
        const files = value;
        let filteredFiles = files.filter((item) => item.key !== key);
        onRemove(filteredFiles);
    };
    const onUpdateFile = (newFiles: UploadFileResponse[]) => {
        onChange([...value, ...newFiles]);
    };
    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {!!value.length &&
                    value?.map((item) => (
                        <div
                            key={item.key}
                            className="relative h-[200px] w-[200px] overflow-hidden rounded-md"
                        >
                            <div className="absolute right-2 top-2 z-10">
                                <Button
                                    size="sm"
                                    type="button"
                                    variant="destructive"
                                    onClick={() => onDeleteFile(item.key)}
                                >
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>
                            <div>
                                <Image
                                    fill
                                    alt="Image"
                                    className="object-cover"
                                    src={item.fileUrl || ''}
                                />
                            </div>
                        </div>
                    ))}
            </div>
            <div>
                {value.length < IMG_MAX_LIMIT && (
                    <UploadDropzone<OurFileRouter>
                        className="ut-label:text-sm ut-allowed-content:ut-uploading:text-red-300 py-2 dark:bg-zinc-800"
                        endpoint="imageUploader"
                        config={{ mode: 'auto' }}
                        content={{
                            allowedContent({ isUploading }) {
                                if (isUploading)
                                    return (
                                        <>
                                            <p className="mt-2 animate-pulse text-sm text-slate-400">
                                                Img Uploading...
                                            </p>
                                        </>
                                    );
                            }
                        }}
                        onClientUploadComplete={(res) => {
                            console.log(res);
                            // Do something with the response
                            // const data: UploadFileResponse[] | undefined = res;
                            // if (data) {
                            //     onUpdateFile(data);
                            // }
                        }}
                        onUploadError={(error: Error) => {
                            toast({
                                title: 'Error',
                                variant: 'destructive',
                                description: error.message
                            });
                        }}
                        onUploadBegin={() => {
                            // Do something once upload begins
                        }}
                    />
                )}
                    </div>
        </div>
            );
}
