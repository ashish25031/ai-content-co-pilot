const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');

async function test() {
    const key = "REMOVED";
    let output = "";
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
