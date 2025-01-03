async function fetchTriviaQuestions() {
    try {
        const date = new Date().toISOString().split('T')[0];
        // const response = await trickleListObjects('trivia-questions', 1, true);
        const response = fetch('./questions/2025-01-04-questions-and-answers.json');
        const data = await response.json();
        console.log(data.questions, data.questions.length);
        return data.questions;
    } catch (error) {
        reportError(error);
        return [];
    }
}
