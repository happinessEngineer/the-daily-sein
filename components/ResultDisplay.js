function ResultDisplay({ score, totalQuestions, results, gameNumber }) {
    const [shareText, setShareText] = React.useState('Share');
    const [showFullResults, setShowFullResults] = React.useState(false);

    React.useEffect(() => {
        const fullResultsTimer = setTimeout(() => {
            setShowFullResults(true);
        }, 1500);
    }, []);

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
        return `./gifs/${score}.gif`;
    };

    return (
        <div data-name="result-display" className="text-center p-8">
            <div>
                <h1 data-name="game-title" className="logo text-3xl font-bold mb-8">
                    The Daily Sein #{gameNumber}
                </h1>
                <div 
                    data-name="score-gif" 
                    className="max-w-sm mx-auto mb-8"
                >
                    <img
                        src={getScoreImage()}
                        alt="Score reaction"
                        className="w-full rounded-lg shadow-lg"
                    />
                </div>
                
                {showFullResults && (
                    <>
                        <h2 data-name="final-score" className="text-3xl font-bold mb-6">
                            Your Score: {score}/{totalQuestions}
                        </h2>
                        <div data-name="result-boxes" className="flex justify-center flex-wrap gap-1 mb-8">
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
                        <p className="text-gray-600 mb-8">Come back tomorrow for a new set of questions!</p>
                    </>
                )}
            </div>
        </div>
    );
}
