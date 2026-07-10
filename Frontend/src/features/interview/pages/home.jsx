import React, { useState, useRef, useEffect } from 'react';
import '../style/home.scss';
import { useInterview } from "../hooks/useinterview";
import { useNavigate } from 'react-router-dom';

function Home() {
  const { loading, generateReport, reports = [], getReports, setReports } = useInterview();
  const [jobDescription, setJobDescription] = useState('');
  const [selfDescription, setSelfDescription] = useState('');
  const resumeInputRef = useRef(null);
  const navigate = useNavigate();

  // Fetch all past reports when the home page loads
  useEffect(() => {
    getReports();
  }, []);

  const handleGenerateReport = async () => {
    if (!jobDescription && !selfDescription) {
      alert('Please provide either a job description or a self description');
      return;
    }
    try {
      const data = await generateReport({
        jobDescription,
        selfDescription,
        resume: resumeInputRef.current.files[0],
      });
      // Prepend the new report to the list so it shows up immediately
      setReports((prev) => [data.interviewReport, ...prev]);
      navigate(`/interview/${data.interviewReport._id}`);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  const goToReport = (id) => navigate(`/interview/${id}`);

  const matchTier = (score) =>
    score >= 70 ? 'high' : score >= 40 ? 'medium' : 'low';

  if (loading) {
    return (
      <main>
        <div className="loading-screen">
          <h1>Loading your interview plan...</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="home">
      <div className="page-header">
        <h1>
          Create Your Custom <span className="highlight-text">Interview Plan</span>
        </h1>
        <p className="subtitle">
          Let our AI analyze the job requirements and your unique profile to build a winning strategy.
        </p>
      </div>

      <div className="interview-input-group">
        <div className="left">
          <div className="panel-header">
            <span className="panel-icon">🎯</span>
            <label htmlFor="jobDescription">Target Job Description</label>
            <span className="required-badge">Required</span>
          </div>
          <div className="input-group">
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              name="jobDescription"
              id="jobDescription"
              placeholder="Paste the full job description here...&#10;e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
            ></textarea>
          </div>
        </div>

        <div className="right">
          <div className="panel-header">
            <span className="panel-icon">👤</span>
            <label>Your Profile</label>
          </div>

          <div className="input-group">
            <p className="field-label">
              Upload Resume <small className="highlight">(optional)</small>
            </p>
            <label className="file-label" htmlFor="resume">
              <span className="upload-icon">⬆</span>
              <span className="upload-text">Click to upload or drag &amp; drop</span>
              <span className="upload-hint">PDF or DOCX (Max 5MB)</span>
            </label>
            <input
              ref={resumeInputRef}
              hidden
              type="file"
              name="resume"
              id="resume"
              accept=".pdf,.docx"
            />
          </div>

          <div className="divider">
            <span>OR</span>
          </div>

          <div className="input-group">
            <label htmlFor="selfDescription" className="field-label">
              Quick Self-Description
            </label>
            <textarea
              value={selfDescription}
              onChange={(e) => setSelfDescription(e.target.value)}
              name="selfDescription"
              id="selfDescription"
              placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
            ></textarea>
          </div>

          <div className="info-banner">
            <span className="info-icon">ⓘ</span>
            <p>
              Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Report list */}
      <section className="recent-reports">
        <h2>Generated Reports</h2>

        {reports.length === 0 ? (
          <p className="reports-empty">
            No reports yet. Generate your first interview plan above.
          </p>
        ) : (
          <ul className="reports-list">
            {reports.map((report) => (
              <li
                key={report._id}
                className="report-item"
                role="button"
                tabIndex={0}
                onClick={() => goToReport(report._id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') goToReport(report._id);
                }}
              >
                <h3>{report.title || 'Untitled Report'}</h3>
                <p className="report-meta">
                  Generated on {new Date(report.createdAt).toLocaleDateString()}
                </p>
                <span className={`report-match-score ${matchTier(report.matchScore)}`}>
                  {report.matchScore}% Match
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="page-footer">
        <span className="footer-note">AI-Powered Strategy Generation</span>
        <button
          onClick={handleGenerateReport}
          disabled={loading}
          className="button primary-button"
        >
          <span className="button-icon">✦</span>
          Generate My Interview Strategy
        </button>
      </div>
    </main>
  );
}

export default Home;