const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');

async function test() {
    const key = "REMOVED";
    let output = "";
    const genAI = new GoogleGenerativeAI(key);

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Hi");
        output = "SUCCESS (gemini-1.5-flash): " + (await result.response.text());
    } catch (err) {
        output = "ERROR (gemini-1.5-flash): " + err.message + "\n";
        if (err.errorDetails) output += "DETAILS: " + JSON.stringify(err.errorDetails);
    }

    fs.writeFileSync('debug_output_new.txt', output);
}
test();
