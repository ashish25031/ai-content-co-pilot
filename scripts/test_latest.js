const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');

async function test() {
    const key = process.env.GEMINI_API_KEY;
    let output = "";

    if (!key) {
        output = "ERROR: GEMINI_API_KEY not set";
        fs.writeFileSync('final_test_latest.txt', output);
        return;
    }

    const genAI = new GoogleGenerativeAI(key);

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const result = await model.generateContent("Hi");
        output = "SUCCESS (gemini-flash-latest): " + (await result.response.text());
    } catch (err) {
        output = "ERROR (gemini-flash-latest): " + err.message;
    }

    fs.writeFileSync('final_test_latest.txt', output);
}

test();
