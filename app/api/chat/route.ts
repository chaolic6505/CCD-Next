import { initialProgrammerMessages } from "./messages";

import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { content } = await req.json();

    const result = await streamText({
        model: openai("gpt-4-turbo"),
        messages: [...initialProgrammerMessages, { role: "user", content }],
    });

    return result.toAIStreamResponse();
}
