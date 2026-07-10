import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/landing.scss';

const Landing = () => {
    const navigate = useNavigate();
    const [showDemo, setShowDemo] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleNavClick = () => setMenuOpen(false);

    return (
        <div className="landing-page">
            {/* Navigation Header */}
            <header className="landing-header">
                <div className="logo-container" onClick={() => navigate('/')}>
                    <span className="logo-icon"></span>
                    <h1>JobCastAI</h1>
                </div>

                <nav className={menuOpen ? 'open' : ''}>
                    <ul className="nav-links">
                        <li><a href="#home" className="active" onClick={handleNavClick}>Home</a></li>
                        <li><a href="#features" onClick={handleNavClick}>Features</a></li>
                        <li><a href="#how-it-works" onClick={handleNavClick}>How It Works</a></li>
                    </ul>
                    <div className="nav-mobile-actions">
                        <button className="btn-login" onClick={() => { handleNavClick(); navigate('/login'); }}>
                            Log In
                        </button>
                        <button className="btn-get-started" onClick={() => { handleNavClick(); navigate('/register'); }}>
                            Get Started
                        </button>
                    </div>
                </nav>

                <div className="header-actions">
                    <button className="btn-login" onClick={() => navigate('/login')}>
                        Log In
                    </button>
                    <button className="btn-get-started" onClick={() => navigate('/register')}>
                        Get Started
                    </button>
                </div>

                <button
                    className="menu-toggle"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? '✕' : '☰'}
                </button>
            </header>

            {/* Hero Section */}
            <section className="landing-hero" id="home">
                <div className="hero-badge">
                    <span className="sparkle">✦</span> AI-Powered Interview Prep
                </div>
                <h2>
                    Master Your Next Interview with <br />
                    <span className="highlight-grad">AI Intelligence</span>
                </h2>
                <p className="hero-subtext">
                    PrepHaven combines large language models with real job requirements to give you
                    a clear, tailored prep plan — technical questions, behavioral practice, and a
                    day-by-day roadmap built around your actual gaps.
                </p>
                <div className="hero-actions">
                    <button className="btn-primary" onClick={() => navigate('/register')}>
                        Start Your Free Trial
                    </button>
                    <button className="btn-secondary" onClick={() => setShowDemo(true)}>
                        Watch Demo
                    </button>
                </div>
            </section>

            {/* Features Spotlight Section */}
            <section className="landing-features" id="features">
                <div className="features-header">
                    <h3>Supercharge Your Preparation</h3>
                    <p>Interview strategy built from your actual resume and the actual job, not generic tips.</p>
                </div>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="card-icon">⚡</div>
                        <h4>Instant Match Analysis</h4>
                        <p>Upload a target job description and your resume to check your score and pinpoint critical gaps immediately.</p>
                    </div>
                    <div className="feature-card">
                        <div className="card-icon">🤖</div>
                        <h4>Generative QA Simulator</h4>
                        <p>Get realistic technical and behavioral question cards complete with core testing intentions and model answers.</p>
                    </div>
                    <div className="feature-card">
                        <div className="card-icon">📅</div>
                        <h4>7-Day Custom Roadmap</h4>
                        <p>Access a structured day-by-day training timeline with study topics, specialized tasks, and study resources.</p>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="landing-how" id="how-it-works">
                <div className="features-header">
                    <h3>How It Works</h3>
                    <p>Three steps from job post to interview-ready.</p>
                </div>
                <div className="how-steps">
                    <div className="how-step">
                        <span className="step-number">01</span>
                        <h4>Share the Role &amp; Your Profile</h4>
                        <p>Paste the job description, then upload your resume or write a quick self-description.</p>
                    </div>
                    <div className="how-step">
                        <span className="step-number">02</span>
                        <h4>AI Builds Your Plan</h4>
                        <p>We match your background against the role and generate targeted technical and behavioral questions.</p>
                    </div>
                    <div className="how-step">
                        <span className="step-number">03</span>
                        <h4>Practice &amp; Close Gaps</h4>
                        <p>Review model answers, see your skill gaps by severity, and follow a day-by-day prep roadmap.</p>
                    </div>
                </div>
            </section>

            {/* Closing CTA */}
            <section className="landing-cta">
                <h3>Ready to walk in prepared?</h3>
                <p>Generate your first interview plan in under a minute.</p>
                <button className="btn-primary" onClick={() => navigate('/register')}>
                    Get Started Free
                </button>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="footer-content">
                    <p>© 2026 PrepHaven. All rights reserved.</p>
                    <p>Designed for Career Growth</p>
                    <div>
                        <a href="#privacy">Privacy</a>
                        <a href="#terms">Terms</a>
                    </div>
                </div>
            </footer>

            {/* Demo Presentation Modal */}
            {showDemo && (
                <div className="demo-modal-overlay" onClick={() => setShowDemo(false)}>
                    <div className="demo-modal-container" onClick={(e) => e.stopPropagation()}>
                        <button className="btn-close-modal" onClick={() => setShowDemo(false)}>×</button>
                        <h3>PrepHaven Platform Tour</h3>
                        <div className="demo-placeholder">
                            <div className="demo-sparkle">✦</div>
                            <p className="demo-title">AI-Powered Interview Coach</p>
                            <p className="demo-promo-text">
                                Watch how PrepHaven analyzes job listings and crafts a full 7-day preparation plan.
                                It lists high-priority technical gaps, answers tricky behavioral scenarios, and builds
                                a dynamic custom resume export matching your target skills.
                            </p>
                            <button
                                className="btn-primary demo-cta"
                                onClick={() => {
                                    setShowDemo(false);
                                    navigate('/register');
                                }}
                            >
                                Generate Your First Prep Report
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Landing;