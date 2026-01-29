const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');

async function test() {
    const key = "REMOVED";
    let output = "";
    const genAI = new GoogleGenerativeAI(key);

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("Hi");
        output += "SUCCESS (gemini-pro): " + (await result.response.text()) + "\n";
    } catch (err) {
        output += "ERROR (gemini-pro): " + err.message + "\n";
    }

    try {
        const model2 = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result2 = await model2.generateContent("Hi");
        output += "SUCCESS (gemini-1.5-flash): " + (await result2.response.text()) + "\n";
    } catch (err2) {
        output += "ERROR (gemini-1.5-flash): " + err2.message + "\n";
    }

    fs.writeFileSync('debug_output.txt', output);
}
test();
