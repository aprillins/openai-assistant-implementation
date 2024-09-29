// pages/api/image/create.tsx
// OpenAI API endpoint https://platform.openai.com/docs/api-reference/images/create
// https://openai.com/api/pricing/

import OpenAI from "openai";
import fs from "fs";
import path
 from "path";
const keykey = process.env.NEXT_PUBLIC_OPENAI_API_KEY

const openai = new OpenAI({
  apiKey: keykey, // Ensure your API key is added in .env.local
});

export default async function handler(req, res) {
  try {
    // xxx
    const prepareFile = path.resolve(`./public/files/test.pdf`);

    const file = await openai.files.create({ 
      file: fs.createReadStream(prepareFile),
      purpose: "assistants"
    });

    console.log("Backend -> var=image", image)
    res.status(200).json({ urls: image.data }); // Send the generated image URLs to the frontend

  } catch (error) {
    console.error("Error create image:", error);
    res.status(500).json({ error: "Failed to create image from OpenAI." });
  }
}
