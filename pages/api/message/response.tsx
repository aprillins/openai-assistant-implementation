import OpenAI from "openai";
const keykey = process.env.NEXT_PUBLIC_OPENAI_API_KEY

const openai = new OpenAI({
  apiKey: keykey, // Ensure your API key is added in .env.local
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { content } = req.body;

        // Create assistant
        const assistant = await openai.beta.assistants.create({
            name: "Math Tutor",
            instructions: "You are a personal math tutor.",
            tools: [{ type: "code_interpreter" }],
            model: "gpt-4o",
        });

        // Create a thread
        const thread = await openai.beta.threads.create();

        // Add message to thread
        await openai.beta.threads.messages.create(thread.id, {
            role: "user",
            content,
        });

        // Stream response
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        // Initialize streaming
        let stream = openai.beta.threads.runs.stream(thread.id, {
            assistant_id: assistant.id,
        }).on("event", async ({ event, data }) => {
            if (event === "thread.run.requires_action" &&
                data.status === "requires_action" &&
                data.required_action?.type === "submit_tool_outputs") {
                
                // Assuming you will gather tool outputs here
                const tool_outputs = await Promise.all(/* your logic to gather outputs */);

                // Submit tool outputs and continue streaming
                stream = openai.beta.threads.runs.submitToolOutputsStream(
                    thread.id,
                    data.id,
                    { tool_outputs }
                );

                return new Response(stream.toReadableStream());
            }

            // Stream data
            if (event === "textCreated" || event === "textDelta") {
                res.write(`data: ${data}\n\n`);
            }
        });

        // When finished streaming, end the response
        stream.on('end', () => {
            res.end();
        });

    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}