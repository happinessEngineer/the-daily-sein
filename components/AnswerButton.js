function AnswerButton({ character, isCorrect, isSelected, onClick, showResult }) {
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

    const successPhrases = [
        "I'm busting!", "Serenity Now", "Get out!", "We're in business, baby!",
        "Oh, that's gold, baby!", "Another Festivus miracle!", "You got that straight!",
        "Oh, you better believe it!", "It's all happening!", "Real Boss!", "Ho ho!",
        "Beautiful!", "Oh, this is huge!", "Yeah, that's right.", "Top of the Muffin to you!",
        "Mandelbaum! Mandelbaum! Mandelbaum!",
    ];
    const buttonText = (showResult && isCorrect && isSelected) 
        ? successPhrases[Math.floor(Math.random() * successPhrases.length)]
        : character;

    return (
        <button 
            key={character}
            data-name="answer-button"
            className={buttonClass}
            onClick={onClick}
            disabled={showResult}
        >
            <span className="flex-1 text-center">{buttonText}</span>
            {character.toLowerCase() === 'jerry' && 
                <img src="character-images/jerry.webp" alt="Jerry" className="h-full w-auto absolute right-2" />
            }
            {character.toLowerCase() === 'george' && 
                <img src="character-images/george.webp" alt="George" className="h-full w-auto absolute right-2" />
            }
            {character.toLowerCase() === 'elaine' && 
                <img src="character-images/elaine.webp" alt="Elaine" className="h-full w-auto absolute right-2" />
            }
            {character.toLowerCase() === 'kramer' && 
                <img src="character-images/kramer.webp" alt="Kramer" className="h-full w-auto absolute right-2" />
            }
        </button>
    );
}
