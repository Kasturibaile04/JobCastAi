import { getAllInterviewReports, getInterviewReportById, generateInterviewReport } from "../services/interview.api";
import { useContext } from "react";
import { InterviewContext } from "../interview.context";

export const useInterview = () => {
    const context = useContext(InterviewContext);
    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider");
    }
    const { loading, setLoading, report, setReport, reports, setReports } = context;

    const generateReport = async ({ jobDescription, selfDescription, resume }) => {
        setLoading(true);
        try {
            const response = await generateInterviewReport({ jobDescription, selfDescription, resume });
            setReport(response.interviewReport);
            return response;
        } catch (error) {
            console.error("Error generating report:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const getReportById = async (interviewId) => {
        setLoading(true);
        try {
            const response = await getInterviewReportById(interviewId);
            setReport(response.interviewReport);
        } catch (error) {
            console.error("Error getting report:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const getReports = async () => {
        setLoading(true);
        try {
            const response = await getAllInterviewReports();
            setReports(response.interviewReports);
        } catch (error) {
            console.error("Error getting reports:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        setLoading,
        report,
        setReport,
        reports,
        setReports,
        generateReport,
        getReportById,
        getReports,
    };
};