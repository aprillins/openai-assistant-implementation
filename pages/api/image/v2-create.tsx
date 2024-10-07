// pages/api/image/create.tsx
// OpenAI API endpoint https://platform.openai.com/docs/api-reference/images/create
// https://openai.com/api/pricing/

import OpenAI from "openai";
import fs from "fs";
import path from "path";
import axios from "axios";

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // Ensure your API key is added in .env.local
});

export default async function handler(req, res) {
    try {
        const { prompt, model, n, quality, response_format, size, style, user } = req.body;

        // Default prompt if not provided
        const finalPrompt = prompt ? prompt : "Realistic human model batman with knife, but the suit is deadpool, and the boots are captain america";
        console.log("Backend -> var=prompt", finalPrompt);

        // Prepare image generation parameters based on the selected model
        const params = {
            prompt: finalPrompt,
            size,
            n: model === "dall-e-3" ? 1 : n, // DALL-E 3 only supports n = 1
        };

        // Add model-specific parameters
        if (model === "dall-e-3") {
            params.style = style;
            params.quality = quality; // Only for dall-e-3
        }

        console.log("Backend -> var=params", params);

        // Fetch the list of generated images from OpenAI
        const imageResponse = await openai.images.generate({
            model,
            ...params,
        });

        for (const image of imageResponse.data) {
          const imageUrl = image.url; // Assuming this is your direct image URL
          const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
          const buffer = Buffer.from(imageResponse.data, 'binary');

          const fileName = path.join(process.cwd(), 'public/images', `image-${Date.now()}.png`); // Generate a unique filename
          fs.writeFileSync(fileName, buffer); // Save the image to public directory
      }

        // mockup
        // const image={data:[{url:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg/440px-Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg"},{url:"https://www.havahart.com/media/wysiwyg/hh/cms/lc/rabbits/hh-animals-rabbit-1.png"},{url:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg/440px-Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg"},{url:"https://www.havahart.com/media/wysiwyg/hh/cms/lc/rabbits/hh-animals-rabbit-1.png"},{url:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg/440px-Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg"},{url:"https://www.havahart.com/media/wysiwyg/hh/cms/lc/rabbits/hh-animals-rabbit-1.png"},{url:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg/440px-Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg"},{url:"https://www.havahart.com/media/wysiwyg/hh/cms/lc/rabbits/hh-animals-rabbit-1.png"},{url:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg/440px-Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg"},{url:"https://www.havahart.com/media/wysiwyg/hh/cms/lc/rabbits/hh-animals-rabbit-1.png"},{url:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg/440px-Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg"},{url:"https://www.havahart.com/media/wysiwyg/hh/cms/lc/rabbits/hh-animals-rabbit-1.png"},{url:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg/440px-Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg"},{url:"https://www.havahart.com/media/wysiwyg/hh/cms/lc/rabbits/hh-animals-rabbit-1.png"},{url:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg/440px-Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg"},{url:"https://www.havahart.com/media/wysiwyg/hh/cms/lc/rabbits/hh-animals-rabbit-1.png"},{url:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg/440px-Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg"},{url:"https://www.havahart.com/media/wysiwyg/hh/cms/lc/rabbits/hh-animals-rabbit-1.png"},{url:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg/440px-Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg"},{url:"https://www.havahart.com/media/wysiwyg/hh/cms/lc/rabbits/hh-animals-rabbit-1.png"},{url:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg/440px-Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg"},{url:"https://www.havahart.com/media/wysiwyg/hh/cms/lc/rabbits/hh-animals-rabbit-1.png"},{url:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg/440px-Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg"},{url:"https://www.havahart.com/media/wysiwyg/hh/cms/lc/rabbits/hh-animals-rabbit-1.png"},{url:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg/440px-Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg"},{url:"https://www.havahart.com/media/wysiwyg/hh/cms/lc/rabbits/hh-animals-rabbit-1.png"},{url:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg/440px-Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg"},{url:"https://www.havahart.com/media/wysiwyg/hh/cms/lc/rabbits/hh-animals-rabbit-1.png"},{url:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg/440px-Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg"},{url:"https://www.havahart.com/media/wysiwyg/hh/cms/lc/rabbits/hh-animals-rabbit-1.png"},{url:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg/440px-Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg"},{url:"https://www.havahart.com/media/wysiwyg/hh/cms/lc/rabbits/hh-animals-rabbit-1.png"},{url:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg/440px-Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg"},{url:"https://www.havahart.com/media/wysiwyg/hh/cms/lc/rabbits/hh-animals-rabbit-1.png"},{url:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg/440px-Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg"},{url:"https://www.havahart.com/media/wysiwyg/hh/cms/lc/rabbits/hh-animals-rabbit-1.png"},{url:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg/440px-Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg"},{url:"https://www.havahart.com/media/wysiwyg/hh/cms/lc/rabbits/hh-animals-rabbit-1.png"},{url:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg/440px-Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg"},{url:"https://www.havahart.com/media/wysiwyg/hh/cms/lc/rabbits/hh-animals-rabbit-1.png"},{url:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg/440px-Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg"},{url:"https://www.havahart.com/media/wysiwyg/hh/cms/lc/rabbits/hh-animals-rabbit-1.png"},{url:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg/440px-Oryctolagus_cuniculus_Tasmania_2_%28cropped%29.jpg"},{url:"https://www.havahart.com/media/wysiwyg/hh/cms/lc/rabbits/hh-animals-rabbit-1.png"}, ]}

        console.log("Backend -> var=image", imageResponse);
        
        // Set response format based on frontend request
        const responseData = response_format === "b64_json" ? imageResponse.data : imageResponse.data.map(img => img.url);
        res.status(200).json({ urls: responseData });
        
    } catch (error) {
        console.error("Error creating image:", error);
        res.status(500).json({ error: "Failed to create image from OpenAI." });
    }
}