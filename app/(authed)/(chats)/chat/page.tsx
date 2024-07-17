import ChatList from "./chat-list";
import ChatContent from "./chat-content";

export default function Page({ params }: { params: { chatId?: string[]; }; }) {
    const chatId = params.chatId?.[0];
    return (
        <div className="w-full h-full flex">
            <div className="w-96 h-full max-h-full border-r-2 border-neutral-300 dark:border-neutral-700 overflow-auto">
                <ChatList />
            </div>
            <div className="w-full h-full flex flex-col">
                <ChatContent />
            </div>
        </div>
    );
}