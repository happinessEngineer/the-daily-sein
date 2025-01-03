async function fetchTriviaQuestions() {
    try {
        const date = new Date().toISOString().split('T')[0];
        const response = await fetch(`./questions/${date}-questions-and-answers.json`);
        const data = await response.json();
        return [data.gameNumber, data.questions];
    } catch (error) {
        reportError(error);
        return [];
    }
}
