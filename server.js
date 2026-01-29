const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();

const app = express();

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "img-src": ["'self'", "data:", "https:"],
      "script-src": ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
    },
  },
}));
app.use(compression());
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const port = process.env.PORT || 3000;

// Initialize Gemini API
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn("WARNING: GEMINI_API_KEY is not set. The application will run in demo mode.");
}
const genAI = new GoogleGenerativeAI(apiKey || "MOCK_KEY");


async function callAI(prompt) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
      generationConfig: { responseMimeType: "application/json" }
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error("AI API Error:", error);
    // Fallback mock response for demo purposes if API key is missing or fails
    return {
      content: "Error: AI generation failed. Please check your API key. (Falling back to demo mode)\n\nThis is where your amazing content for the topic would appear if the API was active!",
      hashtags: ["demo", "fallback", "ai"],
      cta: "Try adding a valid API key to .env",
      engagement_score: 0,
      score_reasoning: "The system is currently in demo mode due to missing API configuration.",
      suggestions: ["Configure GEMINI_API_KEY in the environment."]
    };
  }
}

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/generate', async (req, res) => {
  try {
    const { input, platform, tone, audience } = req.body;
    if (!input) return res.status(400).json({ error: "Input is required" });

    const prompt = `
      Act as an expert Social Media Strategist and Content Creator. 
      Task: Generate high-quality, engaging content based on:
      - Topic/Input: ${input}
      - Platform: ${platform}
      - Tone: ${tone}
      - Audience: ${audience}

      Ensure the content follows platform-best practices (e.g., character limits, formatting).
      Include 3-5 relevant hashtags and a clear call to action (CTA).
      
      Return ONLY a JSON object with this structure:
      {
        "content": "the post content string",
        "hashtags": ["tag1", "tag2"],
        "cta": "the cta string",
        "engagement_score": number (0-100),
        "score_reasoning": "why this score?",
        "suggestions": ["improvement tip 1", "improvement tip 2"]
      }
    `;

    const result = await callAI(prompt);
    res.json(result);
  } catch (error) {
    console.error("Generate Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post('/api/repurpose', async (req, res) => {
  try {
    const { sourceContent, targetPlatform, tone, audience } = req.body;
    if (!sourceContent) return res.status(400).json({ error: "Source content is required" });

    const prompt = `
      Act as a Content Strategist. Repurpose the following content for a new platform.
      Original Content: ${sourceContent}
      Target Platform: ${targetPlatform}
      New Tone: ${tone}
      New Audience: ${audience}

      Maintain the core message but adapt the style, length, and formatting for the target platform.
      
      Return ONLY a JSON object with this structure:
      {
        "content": "the post content string",
        "hashtags": ["tag1", "tag2"],
        "cta": "the cta string",
        "engagement_score": number (0-100),
        "score_reasoning": "why this score?",
        "suggestions": ["improvement tip 1", "improvement tip 2"]
      }
    `;

    const result = await callAI(prompt);
    res.json(result);
  } catch (error) {
    console.error("Repurpose Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const server = app.listen(port, () => {
  console.log(`AI Content Co-Pilot server running at http://localhost:${port}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

