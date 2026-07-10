# JobCastAi
Build your resume with AI

AI-Powered Interview Prep

JobCastAi analyzes a target job description alongside your resume (or a quick self-description) and generates a personalized interview prep plan — technical questions, behavioral questions, skill-gap analysis, and a day-by-day study roadmap — in under a minute.

Live demo: add your deployed link here
Portfolio write-up: add link to your case study here


Why I Built This

Most PM portfolios lean on teardown decks and feature-suggestion PDFs that don't prove someone can actually build. JobCastAi is a full-stack, shipped product: real users can paste a job description, upload a resume, and walk away with a concrete, AI-generated prep plan — not a mockup.

Problem: Candidates prep generically (LeetCode, common-questions lists) instead of prepping for the specific role and company they're interviewing for.

Solution: Feed the actual job description and the candidate's actual background into an LLM, and generate role-specific technical questions, behavioral questions with model answers, a skill-gap breakdown, and a structured study plan.


Features


🎯 Job-specific question generation — technical and behavioral questions tailored to the pasted job description
📄 Resume or self-description input — upload a PDF/DOCX resume, or skip it and describe yourself in plain text
📊 Match score — a percentage estimate of how well the candidate's background fits the role
🧩 Skill-gap analysis — flags missing or weak skills by severity (high/medium/low)
🗓️ 7-day prep roadmap — day-by-day topics, tasks, and resources
🔐 Authenticated accounts — save and revisit past generated reports
📱 Responsive UI — dark theme, works across desktop and mobile



Tech Stack

LayerTechnologyFrontendReact (Vite), SCSSBackendNode.js, ExpressDatabaseMongoDBAIGoogle Gemini APIAuthSupabaseRoutingReact Router v6


Architecture

The frontend follows a four-layer separation of concerns:

UI Layer      → Presentational components (no business logic, no data fetching)
Hooks Layer   → Custom hooks (useInterview, etc.) — state + side effects
State Layer   → Shared/local state management
API Layer     → Service functions that talk to the backend

This keeps components testable and swappable — e.g. the Interview and Home UI components render whatever data/props they're given, while hooks own fetching, loading states, and navigation.


Project Structure

Frontend/
  src/
    features/
      auth/
        pages/          (Login, Register)
        components/     (Protected route wrapper)
      interview/
        pages/          (Home, Interview, Landing)
        hooks/           (useInterview)
        services/        (API calls to backend)
        style/            (SCSS per page)
    App.jsx
    app.routes.jsx

Backend/
  src/
    routes/
    controllers/
    models/
    services/           (Gemini API integration, resume parsing)
  server.js


Getting Started

Prerequisites


Node.js (v18+)
MongoDB instance (local or Atlas)
Google Gemini API key
Supabase project (for auth)


1. Clone and install

bashgit clone <your-repo-url>
cd gen-ai

cd Frontend
npm install

cd ../Backend
npm install

2. Environment variables

Backend .env:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key

Frontend .env:

VITE_API_BASE_URL=http://localhost:5000
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

3. Run locally

bash# Terminal 1 — backend
cd Backend
npm run dev

# Terminal 2 — frontend
cd Frontend
npm run dev

Frontend runs at http://localhost:5173, backend at http://localhost:5000.


Note: avoid running this project from a OneDrive-synced folder — live file syncing can cause Vite's dev server (HMR) to behave unpredictably. Prefer a local path like C:\Projects\gen-ai.




API Overview

MethodEndpointDescriptionPOST/api/interviewsGenerate a new interview prep report from job description + resume/self-descriptionGET/api/interviews/:idFetch a single saved report by IDGET/api/interviewsList all reports for the logged-in user

(Adjust these to match your actual backend routes.)


Data Model

json{
  "matchScore": 82,
  "technicalQuestions": [
    { "question": "...", "intention": "...", "answer": "...", "feedback": "..." }
  ],
  "behavioralQuestions": [
    { "question": "...", "intention": "...", "answer": "...", "feedback": "..." }
  ],
  "skillGaps": [
    { "skill": "SQL", "severity": "medium" }
  ],
  "preparationPlan": [
    { "day": 1, "topic": "...", "tasks": "...", "resources": "..." }
  ]
}


Roadmap


 Export prep plan as PDF
 Mock interview mode with timed responses
 Multi-language support
 Company-specific question banks



Author

Built by Kasturi
