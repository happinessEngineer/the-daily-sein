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
        const percentage = (score / totalQuestions) * 100;
        const imageNumber = Math.ceil(percentage / 10);
        return `https://app.trickle.so/storage/public/images/usr_0a3da49050000001/${[
            'ab45db79-a213-4827-910a-7e19044078d4.gif',  // 1 (0-10%)
            'd6cf09ee-2c46-4c12-90b7-8bd79385462b.gif',  // 2 (11-20%)
            '228ed61f-ddc3-484c-bca2-5ae0603f3855.gif',  // 3 (21-30%)
            '2f455be5-854a-419b-a0a9-b09b90762303.gif',  // 4 (31-40%)
            'df02b1cd-6497-4260-aece-75f11f5ee175.gif',  // 5 (41-50%)
            '00306838-4997-4020-aea1-5102ae10cb4e.gif',  // 6 (51-60%)
            '6d566ac0-9341-436e-85a0-864adff57cf1.gif',  // 7 (61-70%)
            'f1144c7d-a64f-4ead-879b-792dd4f7a9a2.gif',  // 8 (71-80%)
            'a405a48e-a213-4442-8cf2-8445695c4e5a.gif',  // 9 (81-90%)
            '053e9123-efc2-4ace-9933-a06bc6b00d86.gif'   // 10 (91-100%)
        ][imageNumber - 1]}`;
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
