// pages/api/image/create.tsx
// OpenAI API endpoint https://platform.openai.com/docs/api-reference/images/create
// https://openai.com/api/pricing/

import OpenAI from "openai";
const keykey = process.env.NEXT_PUBLIC_OPENAI_API_KEY

const openai = new OpenAI({
  apiKey: keykey, // Ensure your API key is added in .env.local
});

export default async function handler(req, res) {
  try {
    let { prompt } = req.body
    if (prompt === "") {
      prompt = "Realistic human model batman with knife, but the suit is deadpool, and the boots are captain america"
    }
    console.log("Backend -> var=prompt", prompt)
    // Fetch the list of generated images from OpenAI
    const image = await openai.images.generate({ 
      model: "dall-e-2", 
      prompt: prompt,
      size: "256x256",
      n: 2,
      user: "sanboxed_localhost_000001"
    });

    console.log("Backend -> var=image", image)
    res.status(200).json({ urls: image.data }); // Send the generated image URLs to the frontend

  } catch (error) {
    console.error("Error create image:", error);
    res.status(500).json({ error: "Failed to create image from OpenAI." });
  }
}

/*
prompt
string

Required
A text description of the desired image(s). The maximum length is 1000 characters for dall-e-2 and 4000 characters for dall-e-3.

model
string

Optional
Defaults to dall-e-2
The model to use for image generation.

n
integer or null

Optional
Defaults to 1
The number of images to generate. Must be between 1 and 10. For dall-e-3, only n=1 is supported.

quality
string

Optional
Defaults to standard
The quality of the image that will be generated. hd creates images with finer details and greater consistency across the image. This param is only supported for dall-e-3.

response_format
string or null

Optional
Defaults to url
The format in which the generated images are returned. Must be one of url or b64_json. URLs are only valid for 60 minutes after the image has been generated.

size
string or null

Optional
Defaults to 1024x1024
The size of the generated images. Must be one of 256x256, 512x512, or 1024x1024 for dall-e-2. Must be one of 1024x1024, 1792x1024, or 1024x1792 for dall-e-3 models.

style
string or null

Optional
Defaults to vivid
The style of the generated images. Must be one of vivid or natural. Vivid causes the model to lean towards generating hyper-real and dramatic images. Natural causes the model to produce more natural, less hyper-real looking images. This param is only supported for dall-e-3.

user
string

Optional
A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. Learn more.
*/