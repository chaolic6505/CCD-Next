'use client';

import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import { useChat } from 'ai/react';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus as dark } from "react-syntax-highlighter/dist/esm/styles/prism";


import { ScrollArea } from '@/components/ui/scroll-area';

export default function Chat() {
    const { messages, input, handleInputChange, handleSubmit, data } = useChat();
    console.log(data, "data", messages, "messages");
    return (
        <div className="flex flex-col mx-40 overflow-y-auto">
            <div className="flex-grow mb-4 overflow-y-auto">
                {messages.map((m) => (
                    <div key={m.id} className="mb-4">
                        <div className="font-bold mb-2">
                            {m.role === 'user' ? 'User:' : 'AI:'}
                        </div>
                        <div className="bg-gray-100 rounded-lg p-3">
                            <Markdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    code({ node, inline, className, children, ...props }) {
                                        const match = /language-(\w+)/.exec(className || '');
                                        return !inline && match ? (
                                            <SyntaxHighlighter
                                                style={dark}
                                                language={match[1]}
                                                PreTag="div"
                                                {...props}
                                            >
                                                {String(children).replace(/\n$/, '')}
                                            </SyntaxHighlighter>
                                        ) : (
                                            <code className={className} {...props}>
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
            </div>

            <form onSubmit={handleSubmit}>
                <input
                    value={input}
                    placeholder="Say something..."
                    onChange={handleInputChange}
                    className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
                />
            </form>
        </div>
    );
}