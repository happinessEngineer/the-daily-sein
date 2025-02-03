import gifFrames from "gif-frames";
import fs from 'fs';
import path from 'path';

const getGifInfo = async (gif_url) => {
    const frames = await gifFrames({ url: gif_url, frames: "all", outputType: "json" });
    if (frames.length > 0) {
        const width = frames[0].frameInfo.width;
        const height = frames[0].frameInfo.height;
        const aspectRatio = width / height;
        const totalDuration = frames.reduce((sum, frame) => sum + frame.frameInfo.delay * 10, 0);
        console.log(`GIF Duration: ${totalDuration} ms (${totalDuration / 1000} seconds)`);
        return { aspectRatio, frameCount: frames.length, duration: totalDuration }; // Return both aspect ratio and duration
    } else {
        throw new Error('No frames found in GIF');
    }
};

const gifsFolderPath = path.join(process.cwd(), '../public/gifs');
const gifConfig = {};

fs.readdir(gifsFolderPath, async (err, files) => {
    if (err) {
        console.error('Error reading GIFs folder:', err);
        return;
    }

    for (const file of files) {
        if (file.endsWith('.gif')) {
            const filePath = path.join(gifsFolderPath, file);
            const { aspectRatio, duration, frameCount } = await getGifInfo(filePath); // Get both aspect ratio and duration
            const fileNumber = parseInt(file.split('.')[0], 10); // Extract the number from the filename

            if (!gifConfig[fileNumber]) {
                gifConfig[fileNumber] = []; // Initialize the array if it doesn't exist
            }

            gifConfig[fileNumber].push({
                name: file.replace('.gif', ''),
                aspectRatio: aspectRatio, // Use the aspect ratio from the combined function
                frameCount,
            });
        }
    }

    // Write the config.js file in the src directory
    const configContent = `const gifs = ${JSON.stringify(gifConfig, null, 2)};\n\nexport default gifs;`;
    fs.writeFileSync(path.join(process.cwd(), '../src/gif-config.js'), configContent);
    console.log('config.js has been created in the src directory.');
});