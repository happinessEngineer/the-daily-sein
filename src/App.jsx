import { useState, useRef, useEffect } from 'react';
import { fetchProduct, fetchTriviaQuestions } from './utils/triviaData';
import { QuestionDisplay } from './components/QuestionDisplay.jsx';
import { AnswerButton } from './components/AnswerButton.jsx';
import { ResultDisplay } from './components/ResultDisplay.jsx';
import { getFormattedDate } from './utils/triviaData';

function App() {
    const version = 'v1.3';
    const [hasLoadedGame, setHasLoadedGame] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [gameNumber, setGameNumber] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [results, setResults] = useState([]);
    const [gameComplete, setGameComplete] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [product, setProduct] = useState(null);
    const [shouldFixAnswers, setShouldFixAnswers] = useState(true);
    const [isPreviouslyCompleted, setIsPreviouslyCompleted] = useState(false);
    const questionRef = useRef(null);
    const answersRef = useRef(null);

    useEffect(() => {
        const loadGame = async () => {
            const [number, questionData] = await fetchTriviaQuestions();
            const product = await fetchProduct();
            setProduct(product);

            if (questionData && questionData.length > 0) {
                setGameNumber(number);
                setQuestions(questionData);
                
                // Load saved progress from localStorage
                const savedProgress = localStorage.getItem(`dailySein_${number}`);
                if (savedProgress) {
                    const progress = JSON.parse(savedProgress);
                    setCurrentQuestion(progress.currentQuestion);
                    setResults(progress.results);
                    setGameComplete(progress.gameComplete);
                    setIsPreviouslyCompleted(true);
                } else {
                    // Initialize empty results array for new game
                    setResults(new Array(questionData.length).fill(null));
                }
            }
            setHasLoadedGame(true);
        };
        loadGame();
    }, []);

    useEffect(() => {
        const checkOverlap = () => {
            if (questionRef.current && answersRef.current) {
                const questionRect = questionRef.current.getBoundingClientRect();
                const answersRect = answersRef.current.getBoundingClientRect();
                const questionBottom = questionRect.top + questionRect.height;
                const answersHeight = answersRect.height;
                const viewportHeight = window.innerHeight;
                setShouldFixAnswers(questionBottom + 40 + answersHeight < viewportHeight);
            }
        };

        checkOverlap();
        window.addEventListener('resize', checkOverlap);
        return () => window.removeEventListener('resize', checkOverlap);
    }, [questions, currentQuestion]);

    const handleAnswer = async (answer) => {
        if (showResult) return;
        
        setSelectedAnswer(answer);
        setShowResult(true);
        
        const isCorrect = answer === questions[currentQuestion].correctAnswer;
        const newResults = [...results];
        newResults[currentQuestion] = isCorrect;
        setResults(newResults);
        
        // Save progress to localStorage
        const progress = {
            currentQuestion: currentQuestion,
            results: newResults,
            gameComplete: currentQuestion === questions.length - 1
        };
        localStorage.setItem(`dailySein_${gameNumber}`, JSON.stringify(progress));
        
        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                setShowResult(false);
                setSelectedAnswer(null);
                setTimeout(() => {
                    setCurrentQuestion(currentQuestion + 1);
                    // Update saved progress with new question
                    progress.currentQuestion = currentQuestion + 1;
                    localStorage.setItem(`dailySein_${gameNumber}`, JSON.stringify(progress));
                }, 50);
            } else {
                setGameComplete(true);
            }        
        }, 2000);
    };

    if (questions.length === 0) {
        return null;
    }

    const renderHeader = () => (
        <h1 data-name="game-title" className="logo text-3xl font-bold text-center mt-4 mb-8">
          The Daily Sein {gameNumber ? `#${gameNumber}` : ''}
        </h1>
    );

    if (gameComplete) {
        const today = new Date();
        const dateKey = getFormattedDate();
        const gameResults = {
            score: results.filter(Boolean).length,
            totalQuestions: questions.length,
            results: results
        };
        localStorage.setItem(dateKey, JSON.stringify(gameResults));

        return hasLoadedGame ? (
            <>
                <div data-name="game-complete" className="container mx-auto max-w-2xl p-4">
                  {renderHeader()}
                  <ResultDisplay 
                      score={results.filter(Boolean).length}
                      totalQuestions={questions.length}
                      results={results}
                      gameNumber={gameNumber}
                      product={product}
                      isPreviouslyCompleted={isPreviouslyCompleted}
                  />
                </div>
                <div className="fixed bottom-2 left-2 text-gray-300 text-xs">{version}</div>
            </>
        ) : null;
    }

    const currentQuestionData = questions[currentQuestion];

    return (
        <div data-name="game-container" className="container mx-auto max-w-2xl px-4 py-4">
            {renderHeader()}        
            <div ref={questionRef}>
                <QuestionDisplay 
                    question={currentQuestionData}
                    currentQuestion={currentQuestion}
                    totalQuestions={questions.length}
                />
            </div>

            <div 
                ref={answersRef}
                data-name="answers-container" 
                className={`answers-container grid gap-3 ${shouldFixAnswers ? 'answers-container-fixed' : ''}`}
            >
                {currentQuestionData.characters.map((character, index) => (
                    <AnswerButton
                        key={`${currentQuestion}-${character}`}
                        character={character}
                        isCorrect={character === currentQuestionData.correctAnswer}
                        isSelected={character === selectedAnswer}
                        onClick={() => handleAnswer(character)}
                        showResult={showResult}
                    />
                ))}
            </div>
            <div className="fixed bottom-1 left-1 text-gray-300 text-xs">{version}</div>
        </div>
    );
}

export default App;