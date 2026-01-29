# Requirements Specification - AI Content Co-Pilot 🚀

## 1. Project Overview
The **AI Content Co-Pilot** is a web-based tool designed to help creators, marketers, and students generate, optimize, and repurpose social media content using Generative AI (Google Gemini).

## 2. Functional Requirements

### 2.1 Content Generation
- **Topic Input**: Users must be able to enter a text prompt or paste raw content.
- **Platform Customization**: Users must be able to select from multiple platforms (LinkedIn, Instagram, Twitter/X, Threads, Facebook, etc.).
- **Tone Selection**: Support for various tones including Professional, Casual, Gen-Z, Witty, and Storytelling.
- **Audience Targeting**: Ability to define the target audience (e.g., Developers, Students, Executives).
- **AI Output**: The system must generate:
    - Main post content.
    - 3-5 relevant hashtags.
    - A clear Call to Action (CTA).

### 2.2 Content Repurposing
- Users must be able to take an existing generated result and "repurpose" it for a different platform/tone without re-entering the original topic.

### 2.3 Analytics & Feedback
- **Engagement Score**: Provide a predicted engagement score (0-100).
- **Score Reasoning**: AI-generated explanation of why the score was given.
- **Improvement Tips**: Actionable suggestions to further optimize the content.

### 2.4 Visual Integration
- **AI Image Prompt**: Automatically generate a detailed prompt for visual AI tools (Midjourney/DALL-E) based on the content.

### 2.5 User Interface Features
- **Character Counter**: Real-time counter with platform-specific limits (e.g., 280 for Twitter).
- **Local History**: Perspective storage of the last 20 generations using browser LocalStorage.
- **One-Click Copy**: Buttons to quickly copy content or image prompts to the clipboard.

## 3. Non-Functional Requirements

### 3.1 Performance
- AI generation should ideally complete within 3-7 seconds.
- Frontend must be lightweight with minimal external dependencies.

### 3.2 Security
- API keys must never be exposed to the client-side.
- Implementation of standard security headers (CSP, HSTS).
- Input validation on the server to prevent prompt injection or malicious payloads.

### 3.3 Usability
- **Responsive Design**: The app must be fully functional on mobile, tablet, and desktop.
- **Visual Design**: Premium "Glassmorphism" aesthetic with high-contrast typography.
- **Accessibility**: Semantic HTML and clear button labels.

### 3.4 Reliability
- The system must provide a "Demo Mode" fallback if the AI service is unavailable or the API key is missing.
- Graceful error handling for network failures.

## 4. Technical Stack
- **Frontend**: HTML5, Vanilla CSS3, Vanilla JavaScript.
- **Backend**: Node.js, Express.js.
- **AI Engine**: Google Gemini 1.5 Flash.
- **Deployment Host**: Compatible with Render, Railway, Vercel, or Heroku.
