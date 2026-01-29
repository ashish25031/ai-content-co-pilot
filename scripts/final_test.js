const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');

async function test() {
    const key = "REMOVED";
    let output = "";
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
