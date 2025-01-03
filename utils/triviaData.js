async function fetchTriviaQuestions() {
    try {
        const date = new Date().toISOString().split('T')[0];
        // const response = await trickleListObjects('trivia-questions', 1, true);
        fetch('./questions/2025-01-04-questions-and-answers.json')
          .then(response => response.json())
          .then(data => {
            console.log(data.questions, data.questions.length);
            if (data.questions && data.questions.length > 0) {
                return data.questions;
            }              
          })
          .catch(error => console.error('Error loading JSON:', error));
        
        return [];
    } catch (error) {
        reportError(error);
        return [];
    }
}
