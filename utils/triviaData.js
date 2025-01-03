async function fetchTriviaQuestions() {
    try {
        const date = new Date().toISOString().split('T')[0];
        console.log(date);
        const response = await fetch('./questions/2025-01-04-questions-and-answers.json');
        const data = await response.json();
        console.log(data.questions, data.questions.length);
        return data.questions;
    } catch (error) {
        reportError(error);
        return [];
    }
}
