const { GoogleGenAI } = require("@google/genai");

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
                    intention: { type: "string", description: "Why this question is asked, 1 line" }, // Fixed spelling
                    answer: { type: "string", description: "How to answer, max 3 lines" },
                    feedback: { type: "string", description: "Feedback on the answer, max 2 lines" }
                },
                required: ["question", "intention", "answer", "feedback"] // Fixed spelling
            }
        },
        behavioralQuestions: {
            type: "array",
            description: "5-7 behavioral questions",
            items: {
                type: "object",
                properties: {
                    question: { type: "string", description: "The question, 1 line" },
                    intention: { type: "string", description: "Why this question is asked, 1 line" }, // Fixed spelling
                    answer: { type: "string", description: "How to answer, max 3 lines" },
                    feedback: { type: "string", description: "Feedback on the answer, max 2 lines" }
                },
                required: ["question", "intention", "answer", "feedback"] // Fixed spelling
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

Generate the JSON response matching the schema keys exactly:
1. title: Title of the job.
2. matchScore: number 0-100.
3. technicalQuestions (5-7): Include question, intention, answer, and feedback.
4. behavioralQuestions (5-7): Include question, intention, answer, and feedback.
5. skillGaps: skill name + severity (low/medium/high), no explanations.
6. preparationPlan (7 days): day, topic, tasks, resources.

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
                const delay = 1000 * Math.pow(2, attempt - 1);
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