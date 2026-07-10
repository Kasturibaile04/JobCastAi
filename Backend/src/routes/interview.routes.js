const express = require("express");
const interviewrouter = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const interviewController = require("../controllers/interview.controller");
const upload = require("../middleware/file.middleware");

/**
 * @route POST /api/interview/generate
 * @desc Generate new interview report
 * @access Private
 */
interviewrouter.post(
  "/",
  authMiddleware.authUser,
  upload.single("resume"),
  interviewController.generateInterviewReportController 
);

/**
 * @route GET /api/interview/report/:interviewId
 * @desc Get interview report by ID
 * @access Private
 */
interviewrouter.get(
  "/report/:interviewId",
  authMiddleware.authUser,
  interviewController.getInterviewReportByIdController  
);

/**
 * @route GET /api/interview/
 * @desc Get all interview reports of user
 * @access Private
 */
interviewrouter.get(
  "/",
  authMiddleware.authUser,
  interviewController.getAllInterviewReportsController  
);

module.exports = interviewrouter;