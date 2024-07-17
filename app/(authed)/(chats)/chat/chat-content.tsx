'use client';


import { cn } from "@/lib/utils";
import { useState } from "react";
import ImageSelection from "@/components/image-selection";
import GrowingTextArea from "@/components/growing-text-area";

import remarkGfm from "remark-gfm";
import { useChat } from 'ai/react';
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus as dark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Chat() {
    const { messages, input, isLoading, stop, handleInputChange, handleSubmit } = useChat();
    const buttonDisabled = input.length === 0 || isLoading;
    const [selectedImage, setSelectedImage] = useState<File | undefined>(
        undefined
    );

    return (
        <div className="mx-2 overflow-y-auto">
            {messages.map((m) => (
                <div key={m.id} className="mb-4">
                    <div className="font-bold mb-2">
                        {m.role === 'user' ? 'User:' : 'AI:'}
                    </div>
                    <div className="px-5 py-5">
                        <Markdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                code(props) {
                                    const { children, className, node, ...rest } = props;
                                    const match = /language-(\w+)/.exec(className || "");
                                    return match ? (
                                        <SyntaxHighlighter
                                            PreTag="div"
                                            style={dark}
                                            wrapLines={true}
                                            language={match[1]}
                                            wrapLongLines={true}
                                            children={String(children).replace(/\n$/, "")}
                                        />
                                    ) : (
                                        <code {...rest} className={className}>
                                            {children}
                                        </code>
                                    );
                                },
                            }}
                        >
                            {m.content}
                        </Markdown>
                    </div>
                </div>
            ))}
            <div className="fixed bottom-5 w-full max-w-lg p-2 mb-18 right-5">
                <form
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col gap-y-4 px-4 relative max-w-5xl mx-auto"
                >
                    <ImageSelection
                        selectedImage={selectedImage}
                        setSelectedImage={setSelectedImage}
                    />
                    <GrowingTextArea
                        value={input}
                        onChange={handleInputChange}
                        className="w-full border border-gray-500 rounded-2xl outline-none resize-none pl-12 pr-14 py-4 scrollbar-content overflow-y-auto overflow-x-clip overscroll-contain"
                    />
                    {isLoading ? (
                        <button
                            type="button"
                            onClick={stop}
                            className="flex absolute right-0 bottom-0 px-1 py-1 mr-7 mb-2 rounded-2xl z-10 w-10 h-10 items-center justify-center dark:fill-neutral-300 :fill-neutral-700 dark:hover:fill-neutral-100 hover:fill-neutral-900 transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm0,22c-5.514,0-10-4.486-10-10S6.486,2,12,2s10,4.486,10,10-4.486,10-10,10Zm2-15h-4c-1.654,0-3,1.346-3,3v4c0,1.654,1.346,3,3,3h4c1.654,0,3-1.346,3-3v-4c0-1.654-1.346-3-3-3Zm1,7c0,.551-.449,1-1,1h-4c-.551,0-1-.449-1-1v-4c0-.551.449-1,1-1h4c.551,0,1,.449,1,1v4Z" />
                            </svg>
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={buttonDisabled}
                            className={cn(
                                "flex absolute right-0 bottom-0 px-1 py-1 mr-7 mb-2 dark:bg-white bg-black rounded-2xl z-10 w-10 h-10 items-center justify-center",
                                buttonDisabled && "opacity-50"
                            )}
                        >
                            <svg
                                fill="none"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-white dark:text-black w-7 h-7"
                            >
                                <path
                                    d="M7 11L12 6L17 11M12 18V7"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                            </svg>
                        </button>
                    )}
                </form>
            </div>
        </div >
    );
}