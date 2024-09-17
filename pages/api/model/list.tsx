// pages/api/model/list.tsx
// OpenAI API endpoint hhttps://api.openai.com/v1/models
// https://platform.openai.com/docs/api-reference/models/list

import OpenAI from "openai";
const keykey = process.env.NEXT_PUBLIC_OPENAI_API_KEY

const openai = new OpenAI({
  apiKey: keykey, // Ensure your API key is added in .env.local
});

export default async function handler(req, res) {
  try {
    const openai = new OpenAI();
    const list = await openai.models.list();
    console.log("Backend -> var=image", list)
    res.status(200).json({ models: list }); // Send the generated image URLs to the frontend

  } catch (error) {
    console.error("Error create image:", error);
    res.status(500).json({ error: "Failed to create image from OpenAI." });
  }
}

