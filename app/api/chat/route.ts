import { openai } from "@ai-sdk/openai";
import { StreamingTextResponse, streamText, StreamData } from "ai";
import { initialProgrammerMessages } from "./messages";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();
    const result = await streamText({
        system: initialProgrammerMessages[0].content,
        messages: [
            { role: "user", content: messages[messages.length - 1].content },
        ],
        model: openai("gpt-4-turbo"),
    });

    const data = new StreamData();
    const stream = result.toAIStream({
        onFinal(_) {
            data.close();
        },
    });
console.log("stream", stream);
    return new StreamingTextResponse(stream, {}, data);
}
