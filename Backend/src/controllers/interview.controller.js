const fs = require("fs");
const pdfParse = require("pdf-parse");
const { generateInterviewReport } = require("../services/ai.service");
const interviewReportModel = require("../models/interviewreport.model");


async function generateInterviewReportController(req, res) {
    try {
        let resumeContent = "";

        // Resume is optional — only parse if a file was uploaded
        if (req.file) {
            const fileBuffer = fs.readFileSync(req.file.path);
            const result = await pdfParse(fileBuffer);
            resumeContent = result.text;
        }

        const { selfDescription, jobDescription } = req.body;

        const interviewReportAi = await generateInterviewReport({
            resume: resumeContent,
            selfDescription,
            jobDescription
        });

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: req.file ? req.file.path : "",
            selfDescription,
            jobDescription,
            ...interviewReportAi
        });

        return res.status(201).json({
            message: "Interview report generated successfully",
            interviewReport
        });
    } catch (error) {
        console.error("Error in generateInterviewReportController:", error);
        return res.status(500).json({
            message: "Failed to generate interview report",
            error: error.message
        });
    }
}

async function getInterviewReportByIdController(req, res) {
    try {
        const interviewReport = await interviewReportModel.findById(req.params.interviewId);
        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found",
            });
        }
        return res.status(200).json({
            message: "Interview report fetched successfully",
            interviewReport
        });
    } catch (error) {
        console.error("Error in getInterviewReportByIdController:", error);
        return res.status(500).json({
            message: "Failed to fetch interview report",
            error: error.message
        });
    }
}

async function getAllInterviewReportsController(req, res) {
    try {
        const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan").limit(50);
        return res.status(200).json({
            message: "Interview reports fetched successfully",
            interviewReports
        });
    } catch (error) {
        console.error("Error in getAllInterviewReportsController:", error);
        return res.status(500).json({
            message: "Failed to fetch interview reports",
            error: error.message
        });
    }
}

module.exports = {
    generateInterviewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController
};