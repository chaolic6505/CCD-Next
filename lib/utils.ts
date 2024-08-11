import moment from "moment";
import { twMerge } from "tailwind-merge";
import { Active, DataRef, Over } from "@dnd-kit/core";

import { Revenue } from "./definitions";
import { TaskDragData } from "@/components/kanban/task-card";
import { ColumnDragData } from "@/components/kanban/board-column";

import { type ClassValue, clsx } from "clsx";
type DraggableData = ColumnDragData | TaskDragData;

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(text: string) {
    if (typeof text !== "string") {
        return "";
    }

    return text.charAt(0).toUpperCase() + text.slice(1);
}

export const generatePagination = (currentPage: number, totalPages: number) => {
    // If the total number of pages is 7 or less,
    // display all pages without any ellipsis.
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // If the current page is among the first 3 pages,
    // show the first 3, an ellipsis, and the last 2 pages.
    if (currentPage <= 3) {
        return [1, 2, 3, "...", totalPages - 1, totalPages];
    }

    // If the current page is among the last 3 pages,
    // show the first 2, an ellipsis, and the last 3 pages.
    if (currentPage >= totalPages - 2) {
        return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
    }

    // If the current page is somewhere in the middle,
    // show the first page, an ellipsis, the current page and its neighbors,
    // another ellipsis, and the last page.
    return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
    ];
};

export const formatCurrency = (amount: number) => {
    return (amount / 100).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
};

export const formatTS = (
    timestamp: number,
    format: string = "MMMM Do YYYY, h:mm:ss a"
) => {
    return moment.unix(timestamp).format(format);
};

export const formatDateToLocal = (
    dateStr: string,
    locale: string = "en-US"
) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "short",
        year: "numeric",
    };
    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
};

export function hasDraggableData<T extends Active | Over>(
    entry: T | null | undefined
): entry is T & {
    data: DataRef<DraggableData>;
} {
    if (!entry) {
        return false;
    }

    const data = entry.data.current;

    if (data?.type === "Column" || data?.type === "Task") {
        return true;
    }

    return false;
}

export const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};

export async function* makeStreamAsyncIterator(
    reader: ReadableStreamDefaultReader<Uint8Array>
): AsyncGenerator<string, void, undefined> {
    const textDecoder = new TextDecoder();
    while (true) {
        const { done, value } = await reader.read();
        const chunkAsString = textDecoder.decode(value);
        if (done) break;
        yield chunkAsString;
    }
}

export function generateRandomString(bytes: number) {
    if (process.env.NEXT_RUNTIME === "nodejs") {
        const crypto = require("crypto");
        return crypto.randomBytes(bytes).toString("hex");
    }

    const array = new Uint8Array(bytes);
    crypto.getRandomValues(array);
    return [...array].map((b) => b.toString(16).padStart(2, "0")).join("");
}
