import axios from "axios";

const api = axios.create({
    baseURL: "https://jobcastai-1.onrender.com",
    withCredentials: true,
});

// Add token to every request automatically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

/**
 * @description Generates an interview report based on job description, self-description, and resume.
 * @param {Object} params
 * @param {string} params.jobDescription
 * @param {string} params.selfDescription
 * @param {string} params.resume
 * @returns {Promise<Object>} Generated report data
 */
export const generateInterviewReport = async ({ jobDescription, selfDescription, resume }) => {
    try {
        const response = await api.post("/api/interview", {
            jobDescription,
            selfDescription,
            resume
        });
        return response.data;
    } catch (error) {
        console.error("Generate report error:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * @description Fetches a single interview report by its ID.
 * @param {string} interviewId
 * @returns {Promise<Object>} Report data
 */
export const getInterviewReportById = async (interviewId) => {
    try {
        const response = await api.get(`/api/interview/report/${interviewId}`);
        return response.data;
    } catch (error) {
        console.error("Get report error:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * @description Fetches all interview reports for the authenticated user.
 * @returns {Promise<Object>} List of reports
 */
export const getAllInterviewReports = async () => {
    try {
        const response = await api.get("/api/interview");
        return response.data;
    } catch (error) {
        console.error("Get all reports error:", error.response?.data || error.message);
        throw error;
    }
};

export default api;