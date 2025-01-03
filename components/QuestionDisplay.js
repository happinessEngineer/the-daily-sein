function QuestionDisplay({ question, currentQuestion, totalQuestions }) {
    return (
        <div data-name="question-display" className="question-container p-8 bg-gray-100 rounded-lg shadow-md mb-6">
            <div data-name="question-progress" className="text-gray-600 mb-4">
                Question {currentQuestion + 1} of {totalQuestions}
            </div>
            <div data-name="question-text" className="text-xl font-semibold mb-4">
                "{question.quote}"
            </div>
            <div data-name="question-instruction" className="text-gray-600">
                Who said this line?
            </div>
        </div>
    );
}
