import gifs from './gif-config.js';

const config = {
    baseDir: 'friends',
    localStoragePrefix: 'dailyFriends',
    successPhrases: [
        "TEST",
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
    shareText: 'TheDailyFriends.com',
    comeBackImage: {
        filename: 'manana.jpg',
        altText: 'What are you doing mañana',
    },
    gifs,
};

export default config;