import config from '../../config';

export function AnswerButton({ character, isCorrect, isSelected, onClick, showResult }) {
    let buttonClass = "answer-button w-full p-4 text-white rounded-lg box-border flex items-center relative ";
    
    if (showResult) {
        if (isCorrect) {
            buttonClass += isSelected ? "bg-green-500 correct-answer burst-effect" : "bg-green-500";
        } else if (isSelected && !isCorrect) {
            buttonClass += "bg-gray-700 outline outline-2 outline-red-500";
        } else {
            buttonClass += "bg-blue-500";
        }
    } else {
        buttonClass += "bg-blue-500";
    }

    const buttonText = (showResult && isCorrect && isSelected) 
        ? config.successPhrases[Math.floor(Math.random() * config.successPhrases.length)]
        : character;

    const image = config.characterImages[character.toLowerCase()];

    return (
        <button 
            key={character}
            data-name="answer-button"
            className={buttonClass}
            onClick={onClick}
            disabled={showResult}
        >
            <span className="flex-1 text-center">{buttonText}</span>
            {image !== undefined && 
                <img src={`${import.meta.env.BASE_URL}${config.baseDir}/character-images/${image.filename}`} alt={image.name} className="h-full w-auto absolute right-2" />
            }
        </button>
    );
}
