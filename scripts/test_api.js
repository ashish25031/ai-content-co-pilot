const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function listModels() {
    const key = process.env.GEMINI_API_KEY;
    try {
        const genAI = new GoogleGenerativeAI(key);
        // There isn't a direct 'listModels' in the simple client, 
        // but we can try a basic prompt with 'gemini-pro' as a fallback test.
        console.log("Testing with gemini-1.5-flash...");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("test");
        console.log("gemini-1.5-flash works!");
    } catch (err) {
        console.error("gemini-1.5-flash failed:", err.message);

        try {
            console.log("Testing with gemini-pro...");
            const genAI = new GoogleGenerativeAI(key);
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent("test");
            console.log("gemini-pro works!");
        } catch (err2) {
            console.error("gemini-pro also failed:", err2.message);
        }
    }
}

listModels();
