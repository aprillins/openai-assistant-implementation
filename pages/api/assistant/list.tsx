// pages/api/asssistant/list.tsx

import OpenAI
 from "openai";
const keykey = process.env.NEXT_PUBLIC_OPENAI_API_KEY

const openai = new OpenAI({
  apiKey: keykey, // Ensure your API key is added in .env.local
});

export default async function handler(req, res) {
  try {
    // Fetch the list of assistants from OpenAI
    const response = await openai.beta.assistants.list({
      order: "desc",
      limit: 20, // You can change this limit as per your requirement
    });

    const assistants = response.data; // Extract the assistant data from the response
    res.status(200).json({ assistants }); // Send the assistants list to the frontend

  } catch (error) {
    console.error("Error fetching assistants:", error);
    res.status(500).json({ error: "Failed to fetch assistants from OpenAI." });
  }
}
