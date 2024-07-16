import { openai } from "@ai-sdk/openai";
import { StreamingTextResponse, streamText, StreamData } from "ai";
import { initialProgrammerMessages } from "./messages";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();
    console.log(messages, "messages");
    const result = await streamText({
        messages: [{ role: "user", content: messages[0].content }],
        model: openai("gpt-4-turbo"),
    });

    const data = new StreamData();
    const stream = result.toAIStream({
        onFinal(_) {
            data.close();
        },
    });

    return new StreamingTextResponse(stream, {}, data);
}
