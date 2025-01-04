function ResultDisplay({ score, totalQuestions, results, gameNumber }) {
    const [shareText, setShareText] = React.useState('Share');

    const generateShareText = () => {
        const boxes = results.map(result => result ? '🟩' : '⬛').join('');
        return `The Daily Sein #${gameNumber}\n${score}/${totalQuestions}\n\n${boxes}`;
    };

    const handleShare = async () => {
        try {
            const text = generateShareText();

            if (navigator.share) {
                await navigator.share({
                    text: text
                });
            } else {
                await navigator.clipboard.writeText(text);
                setShareText('Copied!');
                setTimeout(() => setShareText('Share'), 2000);
            }
        } catch (error) {
            reportError(error);
            setShareText('Share');
        }
    };

    const getScoreImage = () => {
        return `/gifs/${[
            '0.gif',
            '1.gif',
            '2.gif',
            '3.gif',
            '4.gif',
            '5.gif',
            '6.gif',
            '7.gif',
            '8.gif',
            '9.gif',
            '10.gif',
        ][score]}`;
    };

    return (
        <div data-name="result-display" className="text-center p-8">
            <h1 data-name="game-title" className="text-3xl font-bold mb-8">
                The Daily Sein #{gameNumber}
            </h1>
            <h2 data-name="final-score" className="text-3xl font-bold mb-6">
                Your Score: {score}/{totalQuestions}
            </h2>
            <div data-name="result-boxes" className="flex justify-center flex-wrap gap-2 mb-8">
                {results.map((result, index) => (
                    <div
                        key={index}
                        data-name="result-box"
                        className={`result-box rounded-md ${
                            result ? 'bg-green-500' : 'bg-gray-700'
                        }`}
                    />
                ))}
            </div>
            <button
                data-name="share-button"
                onClick={handleShare}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors mb-8"
            >
                {shareText}
            </button>
            <div data-name="score-gif" className="max-w-sm mx-auto">
                <img
                    src={getScoreImage()}
                    alt="Score reaction"
                    className="w-full rounded-lg shadow-lg"
                />
            </div>
        </div>
    );
}
