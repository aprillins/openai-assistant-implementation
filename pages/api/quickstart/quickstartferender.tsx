// pages/api/quickstart/quickstartferender.tsx
// https://platform.openai.com/docs/assistants/quickstart
// Render the output on frontend instead of terminal
// Use static thread id and assistant id
// https://github.com/openai/openai-node/blob/master/examples/stream-to-client-next.ts
// https://github.com/openai/openai-node/blob/master/examples/assistant-stream.ts
// https://community.openai.com/t/streaming-is-now-available-in-the-assistants-api/682011/55?page=3
// https://nextjs.org/docs/app/building-your-application/routing/route-handlers

import OpenAI from "openai";
import { NextApiRequest, NextApiResponse } from "next";
import { useState } from "react";

const keykey = process.env.NEXT_PUBLIC_OPENAI_API_KEY

const openai = new OpenAI({
  apiKey: keykey, // Ensure your API key is added in .env.local
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Fetch the list of assistants from OpenAI
    const assistant = { id: 'asst_gl3Hd6zYMZ2d7k9hjy2rMIDH' }
    const thread = { id: 'thread_nbpcsHilzu4FNq2uEOanZBjS' }
    let responseText = ""
    console.log('assistant ID', assistant.id)
    console.log('thread ID', thread.id)

    const message = await openai.beta.threads.messages.create(
        thread.id,
        {
          role: "user",
          content: "how many sex do we have and why? Response max 13 words"
        }
    );

    const stream = await openai.beta.threads.runs.create(thread.id, { assistant_id: assistant.id, stream: true })
  
    for await (const event of stream) {
      if (event.event === 'thread.message.delta') {
        const chunk = event.data.delta.content?.[0];
        if (chunk && 'text' in chunk && chunk.text.value) {
            //process.stdout.write(chunk.text.value);
            console.log('data backend:', chunk.text.value)
            // responseText = responseText + chunk.text.value
        }
      }
    }
    
    res.on('messageDelta', (delta, snapshot) => console.log('delta content', delta.content)).on('finish', ()=>{ console.log('finished')})
    res.send()
  } catch (error) {
    console.error("Error streaming:", error);
    res.status(500).json({ error: "Failed to stream from OpenAI." });
  }
}
