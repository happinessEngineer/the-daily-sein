async function fetchTriviaQuestions() {
    try {
        const date = new Date().toISOString().split('T')[0];
        const response = await trickleListObjects('trivia-questions', 1, true);
        
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
