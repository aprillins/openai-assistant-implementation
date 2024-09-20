// app/assistantlist2/assistant.tsx

import OpenAI from "openai";

const keykey = process.env.NEXT_PUBLIC_OPENAI_API_KEY
const openai = new OpenAI({
  apiKey: keykey, // Ensure your API key is added in .env.local
});
let assistantList = []

const AssistantListComponent = async () => {

type Assistant = {
  id: string,
  object: string
  name: string
  created_at: number,
  description: string,
  model: string,
  instructions: string,
  tools: [object],
  top_p: number,
  temperature: number,
  tool_resources: { code_interpreter: [object] },
  metadata: {},
  response_format: string
}


try {
  // Fetch the list of assistants from OpenAI
  const response = await openai.beta.assistants.list({
    order: "desc",
    limit: 20, // You can change this limit as per your requirement
  });

  console.log(response.data)
  console.log()
  assistantList = response.data
} catch (error) {
  console.error("Error fetching assistants:", error);
}


return (
  <div>
    <ul>
      {assistantList.map((assistant:Assistant, index) => (
        <li key={index} className="mb-2 bg-gray-100 p-2 rounded">{assistant.name}</li>
      ))}
    </ul>
  </div>
  )

} 
export default AssistantListComponent
