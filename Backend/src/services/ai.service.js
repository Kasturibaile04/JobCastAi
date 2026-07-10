const { GoogleGenAI } = require("@google/genai");
// const { ZodToJsonSchema } = require("zod-to-json-schema");
// const { z } = require("zod");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
});

const interviewReportJsonSchema = {
    type: "object",
    properties: {
        matchScore: {
            type: "number",
            description: "Match score 0-100 based on job description and resume"
        },
        technicalQuestions: {
            type: "array",
            description: "5-7 technical questions",
            items: {
                type: "object",
                properties: {
                    question: { type: "string", description: "The question, 1 line" },
                    intenstion: { type: "string", description: "Why this question is asked, 1 line" },
                    answer: { type: "string", description: "How to answer, max 3 lines" },
                    feedback: { type: "string", description: "Feedback on the answer, max 2 lines" }
                },
                required: ["question", "intenstion", "answer", "feedback"]
            }
        },
        behavioralQuestions: {
            type: "array",
            description: "5-7 behavioral questions",
            items: {
                type: "object",
                properties: {
                    question: { type: "string", description: "The question, 1 line" },
                    intenstion: { type: "string", description: "Why this question is asked, 1 line" },
                    answer: { type: "string", description: "How to answer, max 3 lines" },
                    feedback: { type: "string", description: "Feedback on the answer, max 2 lines" }
                },
                required: ["question", "intenstion", "answer", "feedback"]
            }
        },
        skillGaps: {
            type: "array",
            description: "Skills the candidate lacks",
            items: {
                type: "object",
                properties: {
                    skill: { type: "string", description: "Skill name only, no explanation" },
                    severity: { type: "string", enum: ["low", "medium", "high"] }
                },
                required: ["skill", "severity"]
            }
        },
        preparationPlan: {
            type: "array",
            description: "7-day preparation plan",
            items: {
                type: "object",
                properties: {
                    day: { type: "number" },
                    topic: { type: "string", description: "1 line" },
                    tasks: { type: "string", description: "Max 2 lines" },
                    resources: { type: "string", description: "1 line" }
                },
                required: ["day", "topic", "tasks", "resources"]
            }
        },
        title: {
            type: "string",
            description: "Title of job for which interview report is generated"
        }
    },
    required: ["matchScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan", "title"]
};


async function generateInterviewReport({ jobDescription, resume, selfDescription }) {
    const MAX_RETRIES = 3;
    let lastError;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash-lite",
                contents: [
                    {
                        role: "user",
                        parts: [
                            {
                                text: `You are an expert career coach and technical interviewer.
Analyze the candidate's resume and self-description against the job description and generate a structured interview prep report.

**Job Description:** ${jobDescription}
**Candidate Resume:** ${resume}
**Candidate Self-Description:** ${selfDescription}

Generate:
1. matchScore: number 0-100.
2. technicalQuestions (3-5): question in 1 line, answer in max 3 lines, feedback in max 2 lines.
3. behavioralQuestions (3-5): question in 1 line, answer in max 3 lines, feedback in max 2 lines.
4. skillGaps: skill name + severity (low/medium/high), no explanations.
5. preparationPlan (7 days): topic in 1 line, tasks in max 2 lines, resources in 1 line.

Keep all text short and crisp. No long paragraphs anywhere.`
                            }
                        ]
                    }
                ],
                config: {
                    responseMimeType: "application/json",
                    responseSchema: interviewReportJsonSchema
                }
            });

            return JSON.parse(response.text);

        } catch (error) {
            lastError = error;
            const isRetryable =
                error.status === "UNAVAILABLE" ||
                error.status === "RESOURCE_EXHAUSTED" ||
                (error.message && (
                    error.message.includes("UNAVAILABLE") ||
                    error.message.includes("503") ||
                    error.message.includes("overloaded") ||
                    error.message.includes("429")
                ));

            if (isRetryable && attempt < MAX_RETRIES) {
                const delay = 1000 * Math.pow(2, attempt - 1); // 1s, 2s, 4s
                console.warn(`Gemini API unavailable (attempt ${attempt}/${MAX_RETRIES}), retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                throw error;
            }
        }
    }

    throw lastError;
}

module.exports = { generateInterviewReport };