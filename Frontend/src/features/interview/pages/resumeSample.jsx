import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useInterview } from '../hooks/useinterview';
import { useAuth } from '../../auth/Hooks/useAuth';
import '../style/resumeSample.scss';

const getProfessionalTemplates = (title) => {
    const t = (title || "").toLowerCase();
    if (t.includes("product") || t.includes("pm")) {
        return {
            summary: "Result-driven Product Manager with a strong technical background and a passion for building user-centric, AI-powered products. Proven track record of collaborating with engineering, UX, and marketing teams to define product requirements, build high-impact roadmaps, and improve key user retention and activation metrics.",
            experience: [
                {
                    role: "Associate Product Manager",
                    company: "TechForward Solutions",
                    period: "2024 - Present",
                    bullets: [
                        "Led a cross-functional Scrum team of 8 engineers and designers to launch a new SaaS billing platform, successfully reducing churn by 12% in the first quarter.",
                        "Conducted 30+ deep-dive user research interviews, identifying core workflow friction points, and translated insights into detailed PRDs for developers.",
                        "Analyzed user metrics (retention, sign-up flows, activation rates) using SQL and Tableau to prioritize sprint items, boosting user activation by 8%."
                    ]
                },
                {
                    role: "Product Management Intern",
                    company: "SaaSify Inc.",
                    period: "2023 - 2024",
                    bullets: [
                        "Owned the landing page and checkout optimization project, running iterative A/B tests that boosted cart checkouts by 4.5%.",
                        "Designed responsive wireframes and interactive prototypes in Figma for a new feedback widget configuration dashboard.",
                        "Facilitated key Agile/Scrum ceremonies, including sprint planning, daily standups, and sprint retrospectives."
                    ]
                }
            ],
            projects: [
                {
                    name: "AI-Powered Strategy Planner Case Study",
                    desc: "Defined product specs (PRDs) and KPIs for integrated LLM features in calendar tools, framing problem statements, solutions, trade-offs, and outcomes."
                }
            ]
        };
    } else if (t.includes("frontend") || t.includes("react") || t.includes("web") || t.includes("developer") || t.includes("engineer")) {
        return {
            summary: "Creative and analytical Frontend Engineer with expertise in building highly responsive, performant, and accessible web solutions. Skilled in React, TypeScript, modern CSS frameworks, and state management. Passionate about bridging the gap between visual design and clean, scalable code.",
            experience: [
                {
                    role: "Frontend Engineer",
                    company: "PixelCraft Studios",
                    period: "2024 - Present",
                    bullets: [
                        "Architected and built a reusable React and TypeScript component library, improving overall frontend development velocity across the team by 30%.",
                        "Optimized web application assets and rendering performance, reducing page load times by 40% and increasing Core Web Vitals to 95+.",
                        "Collaborated closely with visual designers to implement pixel-perfect user interfaces, establishing responsive frontend design systems."
                    ]
                },
                {
                    role: "Junior Web Developer",
                    company: "DevSync Technologies",
                    period: "2023 - 2024",
                    bullets: [
                        "Built complex interactive dashboard features using React, Node.js, and Chart.js to visualize live analytics datasets.",
                        "Integrated secure REST API endpoints with JSON Web Tokens (JWT) for robust cookie-based authentication.",
                        "Maintained 90% test coverage using Jest and React Testing Library for frontend pages and component modules."
                    ]
                }
            ],
            projects: [
                {
                    name: "Resume-to-Interview Prep Platform",
                    desc: "Developed a full-stack platform leveraging Google Gemini API and Express to parse uploaded resumes and generate tailored preparation strategies."
                }
            ]
        };
    } else {
        // Fallback Template
        return {
            summary: `Dedicated Professional specializing in ${title || 'Business Solutions'} with a proven track record of execution, project ownership, and team collaboration. Adept at analyzing organizational requirements to implement reliable systems and drive quantifiable outcomes.`,
            experience: [
                {
                    role: `Senior ${title || 'Specialist'}`,
                    company: "Enterprise Dynamics",
                    period: "2024 - Present",
                    bullets: [
                        "Spearheaded key initiatives aligned with core client deliverables, improving overall work efficiency by 20%.",
                        "Designed and implemented strategic tracking metrics, optimizing work flows and accelerating delivery speeds.",
                        "Mentored junior team members and fostered collaborative, agile work processes across departments."
                    ]
                }
            ],
            projects: [
                {
                    name: "Organizational Strategy Planner",
                    desc: "Built a centralized alignment tracker that maps daily milestones against quarterly business goals and priorities."
                }
            ]
        };
    }
};

const ResumeSample = () => {
    const { interviewId } = useParams();
    const navigate = useNavigate();
    const { report, getReportById, loading } = useInterview();
    const { user } = useAuth();
    const [selectedTheme, setSelectedTheme] = useState('modern'); // modern, classic, minimal

    useEffect(() => {
        if (interviewId && !report) {
            getReportById(interviewId);
        }
    }, [interviewId, report, getReportById]);

    if (loading || !report) {
        return (
            <main className="loading-screen">
                <h1>Loading Resume Template...</h1>
            </main>
        );
    }

    const template = getProfessionalTemplates(report.title);

    // Construct Skills Lists
    const targetSkills = report.skillGaps.map(g => g.skill);
    const mockSkills = targetSkills.length > 0 ? targetSkills : ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Git", "Figma", "Redux", "REST APIs"];

    const printResume = () => {
        window.print();
    };

    return (
        <div className="resume-page-container">
            {/* Header / Controls */}
            <header className="resume-controls no-print">
                <div className="controls-left">
                    <button onClick={() => navigate(`/interview/${interviewId}`)} className="btn-back">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        Back to Prep Plan
                    </button>
                    <h2>Resume Builder Preview</h2>
                </div>
                <div className="controls-right">
                    <div className="theme-selector">
                        <button
                            className={`theme-btn ${selectedTheme === 'modern' ? 'active' : ''}`}
                            onClick={() => setSelectedTheme('modern')}
                        >
                            Modern
                        </button>
                        <button
                            className={`theme-btn ${selectedTheme === 'classic' ? 'active' : ''}`}
                            onClick={() => setSelectedTheme('classic')}
                        >
                            Classic
                        </button>
                        <button
                            className={`theme-btn ${selectedTheme === 'minimal' ? 'active' : ''}`}
                            onClick={() => setSelectedTheme('minimal')}
                        >
                            Minimal
                        </button>
                    </div>
                    <button onClick={printResume} className="btn-print">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                        Print / Save PDF
                    </button>
                </div>
            </header>

            {/* Document Sheet */}
            <div className={`resume-sheet theme-${selectedTheme}`}>
                {/* Header */}
                <header className="resume-sheet-header">
                    <h1>{user?.username || "Kasturi Baile"}</h1>
                    <p className="resume-subtitle">{report.title || "Software Professional"}</p>
                    <div className="contact-info">
                        <span>{user?.email || "kasturi@example.com"}</span>
                        <span className="dot">•</span>
                        <span>+91 98765 43210</span>
                        <span className="dot">•</span>
                        <span>Mumbai, India</span>
                        <span className="dot">•</span>
                        <span>linkedin.com/in/kasturi</span>
                    </div>
                </header>

                <div className="resume-sheet-divider" />

                {/* Summary Section */}
                <section className="resume-sheet-section">
                    <h2>Professional Summary</h2>
                    <p>{report.selfDescription || template.summary}</p>
                </section>

                {/* Skills Section */}
                <section className="resume-sheet-section">
                    <h2>Core Competencies & Skills</h2>
                    <div className="skills-grid">
                        {mockSkills.map((skill, idx) => (
                            <span key={idx} className="skill-chip">{skill}</span>
                        ))}
                    </div>
                </section>

                {/* Experience Section */}
                <section className="resume-sheet-section">
                    <h2>Professional Experience</h2>
                    <div className="experience-list">
                        {template.experience.map((exp, idx) => (
                            <div key={idx} className="exp-item">
                                <div className="exp-header">
                                    <h3>{exp.role}</h3>
                                    <span className="company">{exp.company}</span>
                                    <span className="period">{exp.period}</span>
                                </div>
                                <ul className="exp-bullets">
                                    {exp.bullets.map((bullet, bIdx) => (
                                        <li key={bIdx}>{bullet}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Projects Section */}
                <section className="resume-sheet-section">
                    <h2>Key Projects</h2>
                    <div className="projects-list">
                        {template.projects.map((proj, idx) => (
                            <div key={idx} className="project-item">
                                <h3>{proj.name}</h3>
                                <p>{proj.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Education Section */}
                <section className="resume-sheet-section">
                    <h2>Education</h2>
                    <div className="education-item">
                        <div className="edu-header">
                            <h3>BSc Computer Science</h3>
                            <span className="school">Mumbai University</span>
                            <span className="grad-year">Class of 2026</span>
                        </div>
                        <p>CGPA: 8.69 / 10.0</p>
                    </div>
                </section>
            </div>

            <p className="no-print print-tip">Tip: Select 'Save as PDF' in the destination options after clicking 'Print'.</p>
        </div>
    );
};

export default ResumeSample;
