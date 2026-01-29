# AI Content Co-Pilot 🚀

An AI-driven solution that helps users create, optimize, personalize, and repurpose digital content from a single input.

## Features
- **AI content generation** from a topic or raw text
- **Platform-specific output** (Instagram, LinkedIn, Twitter/X)
- **Tone & Audience selection**
- **One-click content repurposing**
- **Engagement score prediction** with reasoning and suggestions

## Tech Stack
- **Frontend**: HTML, CSS (Premium Glassmorphism), Vanilla JavaScript
- **Backend**: Node.js, Express
- **AI**: Google Gemini API (via `@google/generative-ai`)

## Setup Instructions

1. **Clone/Download** the repository.
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure API Key**:
   - Rename `.env.example` to `.env`.
   - Add your [Google Gemini API Key](https://aistudio.google.com/app/apikey) to `GEMINI_API_KEY`.
4. **Run the server**:
   ```bash
   npm start
   ```
5. **Open the app**:
   Navigate to `http://localhost:3000` in your browser.

## Deployment

### Local Development
1. Clone the repo.
2. `npm install`
3. Create `.env` from `.env.example` and add your `GEMINI_API_KEY`.
4. `npm start`

### Production Deployment (e.g., Render, Railway, Heroku)
1. **Environment Variables**: Ensure `GEMINI_API_KEY` is set in your deployment platform's dashboard.
2. **Build Settings**:
   - Build Command: `npm run build` (or leave empty)
   - Start Command: `npm start`
3. **Health Check**: Use `/health` for uptime monitoring.

## Project Structure
- `server.js`: Express backend with AI prompt logic, security headers, and compression.
- `public/`: Frontend assets (HTML, CSS, JS).
- `scripts/`: Internal tools for testing and debugging.
- `design_spec.md`: Detailed architecture and prompt design.
- `presentation.md`: Demo script and Q&A for judges.
- `.env.example`: Template for environment variables.
- `.gitignore`: Ensures sensitive files are not committed.

