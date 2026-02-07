const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');

async function test() {
    const key = process.env.GEMINI_API_KEY;
    let output = "";

    if (!key) {
        output = "ERROR: GEMINI_API_KEY not set";
        fs.writeFileSync('final_test.txt', output);
        return;
    }

    const genAI = new GoogleGenerativeAI(key);

    try {
        const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });
        const result = await model.generateContent("Hi");
        output = "SUCCESS: " + (await result.response.text());
    } catch (err) {
        output = "ERROR: " + err.message;
    }

    fs.writeFileSync('final_test.txt', output);
}

test();
