import axios from "axios";
const api = axios.create({
    baseURL: "https://jobcastai.onrender.com",
    withCredentials: true,
})

/**
 * @description Generates an interview report based on the provided job description, self-description, and resume.
 * 
 */

export const generateInterviewReport = async ({ jobDescription, selfDescription, resume }) => {
    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    formData.append("resume", resume);

    const response = await api.post("/api/interview", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
    return response.data;
}
/**
 * @description Fetches an interview report by its ID.
 * 
 */

export const getInterviewReportById = async (interviewId) => {
    const response = await api.get(`/api/interview/report/${interviewId}`);
    return response.data;
}

/**
 * @description Fetches all interview reports for the authenticated user.
 * 
 */

export const getAllInterviewReports = async () => {
    const response = await api.get("/api/interview");
    return response.data;
}

