const fs = require('fs');

async function testV1() {
    const key = process.env.GEMINI_API_KEY;

    if (!key) {
        fs.writeFileSync(
            'debug_output_v1.txt',
            'ERROR: GEMINI_API_KEY not set'
        );
        return;
    }

    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${key}`;

    let output = "";
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Hi" }] }]
            })
        });
        const data = await response.json();
        output = "V1 RESPONSE: " + JSON.stringify(data, null, 2);
    } catch (err) {
        output = "V1 ERROR: " + err.message;
    }

    fs.writeFileSync('debug_output_v1.txt', output);
}

testV1();
