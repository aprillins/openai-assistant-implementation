// pages/api/audio-files.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const audioDir = path.resolve('./public/audio');
    const files = [];

    // Read all directories inside the audio directory
    if (fs.existsSync(audioDir)) {
        const directories = fs.readdirSync(audioDir);

        directories.forEach((dir) => {
            const dirPath = path.join(audioDir, dir);
            if (fs.statSync(dirPath).isDirectory()) {
                // Read files in each subdirectory
                const fileNames = fs.readdirSync(dirPath);
                fileNames.forEach((fileName) => {
                    if (fileName.endsWith('.mp3')) {
                        files.push(`/audio/${dir}/${fileName}`);
                    }
                });
            }
        });
    }

    res.status(200).json({ files });
}