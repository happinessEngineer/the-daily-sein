function AnswerButton({ character, isCorrect, isSelected, onClick, showResult }) {
    let buttonClass = "answer-button w-full p-4 text-white rounded-lg box-border ";
    
    if (showResult) {
        if (isCorrect) {
            buttonClass += "bg-green-500";
        } else if (isSelected && !isCorrect) {
            buttonClass += "bg-gray-700 outline outline-2 outline-red-500";
        } else {
            buttonClass += "bg-blue-500";
        }
    } else {
        buttonClass += "bg-blue-500 hover:bg-blue-600";
    }

    return (
        <button 
            data-name="answer-button"
            className={buttonClass}
            onClick={onClick}
            disabled={showResult}
        >
            {character}
        </button>
    );
}
