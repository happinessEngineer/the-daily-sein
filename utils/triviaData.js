async function fetchTriviaQuestions() {
    try {
        const date = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
        const [m, d, y] = date.split(',')[0].split('/');
        const formattedDate = `${y.trim()}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;

        const response = await fetch(`./questions/${formattedDate}-questions-and-answers.json`);
        const data = await response.json();
        return [data.gameNumber, data.questions];
    } catch (error) {
        reportError(error);
        return [];
    }
}

async function fetchProduct() {
    try {
        const date = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
        const [m, d, y] = date.split(',')[0].split('/');
        const formattedDate = `${y.trim()}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;

        const response = await fetch(`../products-of-the-day.json`);
        const data = await response.json();
        return data[formattedDate];
    } catch (error) {
        return [];
    }
}
