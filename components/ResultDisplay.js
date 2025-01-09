function ResultDisplay({ score, totalQuestions, results, gameNumber, product }) {
    const [shareText, setShareText] = React.useState('Share Your Score');
    const [showFullResults, setShowFullResults] = React.useState(false);

    React.useEffect(() => {
        const fullResultsTimer = setTimeout(() => {
            setShowFullResults(true);
        }, 3000);
    }, []);

    const generateShareText = () => {
        const boxes = results.map(result => result ? '🟩' : '⬛').join('');
        return `The Daily Sein #${gameNumber}\n${score}/${totalQuestions}\n\n${boxes}\n\nhttps://dailysein.com`;
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
                setTimeout(() => setShareText('Share Your Score'), 2000);
            }
        } catch (error) {
            reportError(error);
            setShareText('Share Your Score');
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
                {!showFullResults && (
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
                )}
                {showFullResults && (
                    <>
                        <h2 data-name="final-score" className="text-3xl font-bold mb-6">
                            Your Score: {score}/{totalQuestions}
                        </h2>
                        <div data-name="result-boxes" className="flex justify-center flex-wrap gap-1 mb-12">
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

                        <div className="play-with-friends-container mb-16">
                            <p className="play-with-friends">Play with friends!</p>
                            <ul className="list-disc text-left text-gray-600 mb-8">
                                <li>Post your score on social media</li>
                                <li>Create a group chat with your Seinfeld-loving friends</li>
                                <li>Create a Slack channel to play against your coworkers</li>
                            </ul>
                            <button
                                data-name="share-button"
                                onClick={handleShare}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                            >
                                {shareText}
                            </button>
                        </div>

                        {product && (
                            <div className="daily-find-container mb-16">
                                <h3 className="text-2xl font-bold mb-4">The Daily Find</h3>
                                <a 
                                    href={product.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img 
                                        src={`product-images/${product.image}`}
                                        alt="Product"
                                        className="product-image mx-auto mb-4 rounded-lg shadow-lg"
                                    />
                                </a>
                                <a 
                                    href={product.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
                                >
                                    Buy it
                                </a>
                            </div>
                        )}
                        <p className="text-gray-600 mb-8">Come back tomorrow for a new set of questions!</p>
                    </>
                )}
            </div>
        </div>
    );
}
