const fs = require('fs');

async function listModels() {
    const key = process.env.GEMINI_API_KEY;

    if (!key) {
        fs.writeFileSync(
            'available_models.json',
            'ERROR: GEMINI_API_KEY not set'
        );
        return;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        fs.writeFileSync(
            'available_models.json',
            JSON.stringify(data, null, 2)
        );
    } catch (err) {
        fs.writeFileSync(
            'available_models.json',
            'ERROR: ' + err.message
        );
    }
}

listModels();
