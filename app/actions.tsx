'use server';

import { openai } from '@ai-sdk/openai';
import { createStreamableValue } from 'ai/rsc';
import { CoreMessage, streamText } from 'ai';

export async function continueConversation(messages: CoreMessage[]) {
    const result = await streamText({
        model: openai('gpt-4-turbo'),
        messages,
    });

    const stream = createStreamableValue(result.textStream);
    return stream.value;
}