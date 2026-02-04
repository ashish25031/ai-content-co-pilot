# Design Document - AI Content Co-Pilot 🎨

## Technologies to be used in the solution:
- **Architecture**: Client-Server (REST API)
- **AI Integration**: `@google/generative-ai` SDK (Google Gemini 1.5 Flash)
- **Web Server**: Node.js & Express.js
- **Middleware**: Helmet (Security), Compression (Performance), Morgan (Log Management), CORS
- **UI Frameworks**: Vanilla HTML5 & CSS3 (Glassmorphism Design)
- **State Management**: Browser LocalStorage (Local History)

## 1. System Architecture
The application follows a standard **Client-Server Architecture**.

- **Client (Frontend)**: A thin-client SPA (Single Page Application) that handles user interaction and displays results.
- **Server (Backend)**: A Node.js/Express environment that communicates with the Google Gemini API and serves static assets.

## 2. Frontend Design

### 2.1 Visual Language (Glassmorphism)
- **Background**: Deep radial gradients (`#1e1b4b` to `#0f172a`).
- **Layers**: Translucent cards using `backdrop-filter: blur(12px)` and subtle white borders (`rgba(255, 255, 255, 0.1)`).
- **Typography**: Uses 'Inter' via Google Fonts for a modern, tech-focused feel.
- **Animations**: CSS transitions for hovers and `@keyframes` for status loaders and sliding result cards.

### 2.2 Component Breakdown
- **Input Control**: A smart textarea with a character counter that changes color as limits are reached.
- **Dynamic Selectors**: Custom-styled dropdowns that match the dark theme.
- **Engagement Gauge**: A circular SVG progress bar that dynamically updates its `stroke-dasharray` and color based on the AI's score.
- **History Sidebar**: A slide-out panel that manages state via `localStorage`.

## 3. Backend Design

### 3.1 Middleware Pipeline
1. **Helmet**: Sets security-related HTTP headers.
2. **Compression**: Compresses response bodies for improved performance.
3. **Morgan**: Logs HTTP requests for monitoring.
4. **CORS**: Enables cross-origin requests.
5. **Express Static**: Serves the `public/` directory.

### 3.2 AI Implementation
- **Provider**: Google Generative AI (@google/generative-ai).
- **Model**: `gemini-1.5-flash-latest`.
- **Prompt Engineering**: 
    - Systematic prompts are used to enforce a strict JSON output.
    - Prompts specify character limits, tone nuances, and audience context.
    - AI is instructed to act as a "Expert Social Media Strategist."

### 3.3 API Endpoints
- `POST /api/generate`: Receives raw topic + metadata; returns structured post content.
- `POST /api/repurpose`: Receives existing content + new target metadata; adapts content type.
- `GET /health`: Returns system status and timestamp.

## 4. Data Structures

### 4.1 Internal AI Protocol
The AI is configured to return the following JSON structure:
```json
{
  "content": "string",
  "hashtags": ["string"],
  "cta": "string",
  "engagement_score": number,
  "score_reasoning": "string",
  "suggestions": ["string"]
}
```

### 4.2 Local Storage Schema
```javascript
{
  "copilot_history": [
    {
      "id": 1674920000000,
      "topic": "string",
      "platform": "string",
      "content": "string",
      "hashtags": ["string"],
      "cta": "string",
      "score": number,
      "timestamp": "string"
    }
  ]
}
```

## 5. Security & Optimization
- **API Key Masking**: The API key is stored in environment variables and never sent to the browser.
- **Fail-safe Logic**: A fallback object is returned if the API reaches rate limits or fails, ensuring the UI doesn't break.
- **Performance**: Static assets are served with Gzip; CSS uses variables for easy theme management.