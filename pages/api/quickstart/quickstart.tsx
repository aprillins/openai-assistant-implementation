// pages/api/quickstart/quickstart.tsx
// https://platform.openai.com/docs/assistants/quickstart

import OpenAI from "openai";
const keykey = process.env.NEXT_PUBLIC_OPENAI_API_KEY

const openai = new OpenAI({
  apiKey: keykey, // Ensure your API key is added in .env.local
});

export default async function handler(req, res) {
  try {
    // Fetch the list of assistants from OpenAI
    
    const assistant = await openai.beta.assistants.create({
        name: "Marketing consultant",
        instructions: "You are a personal marketing consultant",
        tools: [{ type: "code_interpreter" }],
        model: "gpt-4o-mini"
    })

    const thread = await openai.beta.threads.create();

    console.log('assistant ID', assistant.id)
    console.log('thread ID', thread.id)

    const message = await openai.beta.threads.messages.create(
        thread.id,
        {
          role: "user",
          content: "In app staged release condition should we communicate to users? Response max 50 words"
        }
    );

    const run = openai.beta.threads.runs.stream(thread.id, { assistant_id: assistant.id })
        .on('textCreated', (text) => process.stdout.write('\nassistant > '))
        .on('textDelta', (textDelta, snapshot) => process.stdout.write(textDelta.value))
        .on('toolCallCreated', (toolCall) => process.stdout.write(`\nassistant > ${toolCall.type}\n\n`))
        .on('toolCallDelta', (toolCallDelta, snapshot) => {
        if (toolCallDelta.type === 'code_interpreter') {
            if (toolCallDelta.code_interpreter.input) {
            process.stdout.write(toolCallDelta.code_interpreter.input);
            }
            if (toolCallDelta.code_interpreter.outputs) {
            process.stdout.write("\noutput >\n");
            toolCallDelta.code_interpreter.outputs.forEach(output => {
                if (output.type === "logs") {
                process.stdout.write(`\n${output.logs}\n`);
                }
            });
            }
        }
        });

    res.status(200).json({ abc: "correct" }); // Send the assistants list to the frontend

  } catch (error) {
    console.error("Error streaming:", error);
    res.status(500).json({ error: "Failed to stream from OpenAI." });
  }
}
