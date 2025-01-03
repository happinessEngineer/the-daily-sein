function App() {
    const [questions, setQuestions] = React.useState([]);
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const [showResult, setShowResult] = React.useState(false);
    const [results, setResults] = React.useState([]);
    const [gameComplete, setGameComplete] = React.useState(false);
    const [selectedAnswer, setSelectedAnswer] = React.useState(null);

    React.useEffect(() => {
        try {
            const loadQuestions = async () => {
                const data = await fetchTriviaQuestions();
                console.log('questions', data);
                setQuestions(data);
            };
            loadQuestions();
        } catch (error) {
            reportError(error);
        }
    }, []);

    const handleAnswer = (selectedCharacter) => {
        try {
            const currentQuestionData = questions[currentQuestion];
            const isCorrect = selectedCharacter === currentQuestionData.correctAnswer;
            
            setSelectedAnswer(selectedCharacter);
            setResults([...results, isCorrect]);
            setShowResult(true);

            setTimeout(() => {
                if (currentQuestion < questions.length - 1) {
                    setCurrentQuestion(currentQuestion + 1);
                    setShowResult(false);
                    setSelectedAnswer(null);
                } else {
                    setGameComplete(true);
                }
            }, 2000);
        } catch (error) {
            reportError(error);
        }
    };

    const handleUploadSuccess = (newQuestions) => {
        setQuestions(newQuestions);
        setCurrentQuestion(0);
        setShowResult(false);
        setResults([]);
        setGameComplete(false);
        setSelectedAnswer(null);
    };

    if (questions.length === 0) {
        return (
            <div data-name="upload-container" className="container mx-auto max-w-2xl px-4 py-8 text-center">
                <h1 data-name="game-title" className="text-3xl font-bold mb-8">
                    The Daily Sein
                </h1>
                <p data-name="no-questions" className="mb-4">No questions available for today.</p>
                <FileUpload onUploadSuccess={handleUploadSuccess} />
            </div>
        );
    }

    if (gameComplete) {
        return (
            <div data-name="game-complete" className="container mx-auto max-w-2xl px-4 py-8">
                <ResultDisplay 
                    score={results.filter(Boolean).length}
                    totalQuestions={questions.length}
                    results={results}
                />
                <div data-name="upload-container" className="mt-8 text-center">
                    <p data-name="upload-instruction" className="mb-4">Want to try different questions?</p>
                    <FileUpload onUploadSuccess={handleUploadSuccess} />
                </div>
            </div>
        );
    }

    const currentQuestionData = questions[currentQuestion];

    return (
        <div data-name="game-container" className="container mx-auto max-w-2xl px-4 py-8">
            <h1 data-name="game-title" className="text-3xl font-bold text-center mb-8">
                The Daily Sein
            </h1>
            
            <QuestionDisplay 
                question={currentQuestionData}
                currentQuestion={currentQuestion}
                totalQuestions={questions.length}
            />

            <div data-name="answers-container" className="grid gap-3">
                {currentQuestionData.characters.map((character) => (
                    <AnswerButton
                        key={character}
                        character={character}
                        isCorrect={character === currentQuestionData.correctAnswer}
                        isSelected={character === selectedAnswer}
                        onClick={() => handleAnswer(character)}
                        showResult={showResult}
                    />
                ))}
            </div>

            <div data-name="upload-container" className="mt-8 text-center">
                <FileUpload onUploadSuccess={handleUploadSuccess} />
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
