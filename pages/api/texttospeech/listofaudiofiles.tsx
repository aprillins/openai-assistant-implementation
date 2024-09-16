// pages/api/audio-files.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const audioDir = path.resolve('./public/audio');
    const files = [];

    // Read the directory for today's date
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const todayDir = path.join(audioDir, today);

    if (fs.existsSync(todayDir)) {
        const fileNames = fs.readdirSync(todayDir);
        for (const fileName of fileNames) {
            if (fileName.endsWith('.mp3')) {
                files.push(`/audio/${today}/${fileName}`);
            }
        }
    }

    res.status(200).json({ files });
}