import gifs from './gif-config.js';

const config = {
    baseDir: 'sein',
    siteTitle: 'The Daily Sein',
    localStoragePrefix: 'dailySein',
    successPhrases: [
        "I'm busting!", "Serenity Now", "Get out!", "We're in business, baby!",
        "Oh, that's gold, baby!", "Another Festivus miracle!", "You got that straight!",
        "Oh, you better believe it!", "It's all happening!", "Real Boss!", "Ho ho!",
        "Beautiful!", "Oh, this is huge!", "Yeah, that's right.", "Top of the Muffin to you!",
        "Mandelbaum! Mandelbaum! Mandelbaum!", "You're SO good looking!", "Saddle up and ride!",
        ],
    characterImages: {
        jerry: {
            filename: 'jerry.webp',
            name: 'Jerry',
        },
        elaine: {
            filename: 'elaine.webp',
            name: 'Elaine',
        },
        kramer: {
            filename: 'kramer.webp',
            name: 'Kramer',
        },
        george: {
            filename: 'george.webp',
            name: 'George',
        },
    },
    shareText: 'DailySein.com',
    comeBackImage: {
        filename: 'manana.jpg',
        altText: 'What are you doing mañana',
    },
    gifs,
};

export default config;