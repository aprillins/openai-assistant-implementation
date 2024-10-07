// https://platform.openai.com/playground/assistants?assistant=asst_gl3Hd6zYMZ2d7k9hjy2rMIDH&thread=thread_WLgwKJLx5b6WGKRu0OwImdFm
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
    const { sortBy, order } = req.query; // order can be 'asc' or 'desc'

    try {
        const imagesDir = path.join(process.cwd(), "public", "images");
        const files = fs.readdirSync(imagesDir)
            .map(file => ({
                name: file,
                time: fs.statSync(path.join(imagesDir, file)).birthtime
            }));

        let sortedFiles;

        if (sortBy === "created") {
            sortedFiles = files.sort((a, b) => 
                order === "asc" ? a.time - b.time : b.time - a.time
            );
        } else {
            sortedFiles = files; // Default or other sorting can be added here
        }

        const imageUrls = sortedFiles.map(file => `/images/${file.name}`);

        res.status(200).json({ urls: imageUrls });

    } catch (error) {
        console.error("Error retrieving images:", error);
        res.status(500).json({ error: "Failed to retrieve images." });
    }
}