// pages/api/asssistant/list.tsx
// https://platform.openai.com/docs/api-reference/messages/listMessages

import OpenAI from "openai";
const keykey = process.env.NEXT_PUBLIC_OPENAI_API_KEY

const openai = new OpenAI({
  apiKey: keykey, // Ensure your API key is added in .env.local
});

// Convert API response from endpoint https://api.openai.com/v1/threads/{thread_id}/messages
// To Typescript interface

interface ResponseObject {
  object: string;
  data: Message[];
  first_id: string;
  last_id: string;
  has_more: boolean;
}

interface Message {
  id: string;
  object: string;
  created_at: number; // timestamp
  assistant_id: string | null;
  thread_id: string;
  run_id: string | null;
  role: string;
  content: Content[];
  attachments: any[]; // Assuming attachments can vary in shape, you can refine this as needed
  metadata: Record<string, unknown>; // This can vary, hence a generic object type
}

interface Content {
  type: string;
  text: {
    value: string;
    annotations: Annotation[];
  };
}

interface Annotation {
  // Define the structure of annotations as needed
  // example fields based on your data
  // e.g., start: number; end: number; type: string;
}

// ======= End of interfaces ========

// This is custom interface for messsage
interface MessageCompact {
  role: string
  content: string
}


export default async function handler(req, res) {

  // Need to create logic to handle only authorized users AND owner of the thread can access the messages

  const assistant = { id: 'asst_gl3Hd6zYMZ2d7k9hjy2rMIDH' } // Actually the assistant id is not needed, but for code consistency only
  const thread = { id: 'thread_nbpcsHilzu4FNq2uEOanZBjS' }

  console.log('assistant ID', assistant.id)
  console.log('thread ID', thread.id)

  try {
    // Fetch messages for the specific thread
    const threadMessages = await openai.beta.threads.messages.list(thread.id, {order: "asc", limit: 100});
    const messages: MessageCompact[] = threadMessages.data.map(msg => ({
      role: msg.role,
      content: msg.content[0].text.value,
    }));

    // console.log('Backend -> var=threadMessages:', threadMessages)
    // console.log('Backend -> var=messages:', messages)

    res.status(200).json({ messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages." });
  }
    
}
