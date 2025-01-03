async function fetchTriviaQuestions() {
    try {
        const date = new Date().toISOString().split('T')[0];
        // const response = await trickleListObjects('trivia-questions', 1, true);
        fetch('./questions/2025-01-04-questions-and-answers.json')
          .then(response => response.json())
          .then(data => {
            console.log(data);
          })
          .catch(error => console.error('Error loading JSON:', error));
        
        if (response.items && response.items.length > 0) {
            const latestQuestions = response.items[0];
            if (latestQuestions.objectData.date === date) {
                return latestQuestions.objectData.questions;
            }
        }
        return [];
    } catch (error) {
        reportError(error);
        return [];
    }
}
