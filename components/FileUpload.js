function FileUpload({ onUploadSuccess }) {
    const handleFileUpload = async (event) => {
        try {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const questions = JSON.parse(e.target.result);
                    
                    // Store questions in Trickle database
                    const date = new Date().toISOString().split('T')[0];
                    await trickleCreateObject('trivia-questions', {
                        date: date,
                        questions: questions
                    });

                    onUploadSuccess(questions);
                } catch (error) {
                    reportError(error);
                    alert('Error parsing JSON file. Please ensure it\'s properly formatted.');
                }
            };

            reader.readAsText(file);
        } catch (error) {
            reportError(error);
            alert('Error uploading file.');
        }
    };

    return (
        <div data-name="file-upload" className="mb-8 text-center">
            <label 
                data-name="file-upload-label"
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 inline-block"
            >
                Upload Questions JSON
                <input
                    data-name="file-input"
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="hidden"
                />
            </label>
        </div>
    );
}
