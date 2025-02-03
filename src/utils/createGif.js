import gifshot from 'gifshot';
import gifs from '../gif-config';

function getGifDetails (score) {
    // const gifsForScore = gifs["2"];
    const gifsForScore = gifs[score];
    const randomIndex = Math.floor(Math.random() * gifsForScore.length);
    const gifDetails = gifsForScore[randomIndex];
    return {
        ...gifDetails,
        videoUrl: `http://192.168.1.48:5173/vids/${gifDetails.name}.webm`,
    };
}

const createGif = async (score, text) => {
    const { videoUrl, aspectRatio, frameCount } = getGifDetails(score);
    const gifWidth = 450;
    const gifHeight = Math.round(gifWidth / aspectRatio);

    return new Promise((resolve, reject) => {
        gifshot.createGIF({
            gifWidth: gifWidth,
            gifHeight: gifHeight,
            video: [videoUrl],
            interval: 0.1,
            // offset: 3,
            numFrames: frameCount,
            frameDuration: 1,
            text: text,
            fontWeight: 'normal',
            fontSize: '20px',
            fontFamily: 'Afacad Flux',
            fontColor: '#ffffff',
            textAlign: 'center',
            textBaseline: 'bottom',
            textYCoordinate: gifHeight - 10,
            sampleInterval: 10,
            filter: 'drop-shadow(1px 1px black)',
            numWorkers: 2,
        }, function (obj) {
            console.log(obj);
            if (!obj.error) {
                resolve(obj.image);
            } else {
                reject(obj.error);
            }
        });
    });
};

export default createGif;