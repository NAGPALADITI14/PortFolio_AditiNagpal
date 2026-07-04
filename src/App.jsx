import React, { useState, useEffect } from "react";

const customStyles = `
  :root {
    --bg-page: #f0f4ff;
    --bg-nav: rgba(255,255,255,0.85);
    --bg-card: #ffffff;
    --bg-section-alt: #f1f5fb;
    --text-primary: #1a1a2e;
    --text-secondary: #4a5568;
    --text-muted: #718096;
    --border: rgba(0,0,0,0.08);
    --pill-bg: #dbeafe;
    --pill-text: #1d4ed8;
    --pill-bg2: #e0e7ff;
    --pill-text2: #3730a3;
    --accent: #4f46e5;
    --nav-text: #4a5568;
    --nav-active-bg: #dbeafe;
    --nav-active-text: #1d4ed8;
    --toggle-bg: #e2e8f0;
    --shadow: 0 2px 12px rgba(79,70,229,0.08);
    --shadow-hover: 0 8px 32px rgba(79,70,229,0.16);
    --green: #16a34a;
    --timeline-dot: #4f46e5;
    --timeline-dot-border: #ffffff;
  }
  [data-theme="dark"] {
    --bg-page: #0f1120;
    --bg-nav: rgba(15,17,32,0.9);
    --bg-card: #1e2235;
    --bg-section-alt: #161929;
    --text-primary: #f0f4ff;
    --text-secondary: #a8b4d4;
    --text-muted: #6b7fa3;
    --border: rgba(255,255,255,0.08);
    --pill-bg: #1e3a8a;
    --pill-text: #93c5fd;
    --pill-bg2: #312e81;
    --pill-text2: #a5b4fc;
    --accent: #818cf8;
    --nav-text: #a8b4d4;
    --nav-active-bg: #1e3a8a;
    --nav-active-text: #93c5fd;
    --toggle-bg: #374151;
    --shadow: 0 2px 12px rgba(0,0,0,0.4);
    --shadow-hover: 0 8px 32px rgba(0,0,0,0.5);
    --green: #4ade80;
    --timeline-dot: #818cf8;
    --timeline-dot-border: #1e2235;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: var(--bg-page);
    color: var(--text-primary);
    transition: background 0.3s, color 0.3s;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes gradientShift {
    0%,100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  .fade-up { animation: fadeUp 0.8s ease-out forwards; }

  .gradient-name {
    background: linear-gradient(-45deg, #4f46e5, #7c3aed, #ec4899, #ef4444);
    background-size: 300% 300%;
    animation: gradientShift 4s ease infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: clamp(2.5rem, 8vw, 5rem);
    font-weight: 800;
    display: block;
  }

  /* Nav */
  nav {
    position: fixed; top: 0; width: 100%; z-index: 100;
    background: var(--bg-nav);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    transition: background 0.3s;
  }
  .nav-inner {
    max-width: 1100px; margin: 0 auto; padding: 0 1.5rem;
    height: 56px; display: flex; align-items: center; justify-content: space-between;
  }
  .nav-links { display: flex; gap: 4px; flex-wrap: wrap; }
  .nav-btn {
    background: none; border: none; cursor: pointer;
    padding: 6px 12px; border-radius: 8px;
    font-size: 13px; font-weight: 500;
    color: var(--nav-text);
    transition: all 0.2s; text-transform: capitalize;
  }
  .nav-btn:hover { color: var(--accent); background: var(--nav-active-bg); }
  .nav-btn.active { background: var(--nav-active-bg); color: var(--nav-active-text); }

  .toggle-btn {
    background: var(--toggle-bg); border: none; cursor: pointer;
    width: 40px; height: 40px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s; color: var(--text-primary); flex-shrink: 0;
  }
  .toggle-btn:hover { transform: scale(1.08); }

  /* Sections */
  .page-section { padding: 80px 1.5rem; background: var(--bg-page); }
  .page-section.alt { background: var(--bg-section-alt); }
  .hero-section {
    min-height: 100vh; display: flex; align-items: center;
    justify-content: center; padding: 80px 1.5rem;
    background: var(--bg-page);
  }
  .section-inner { max-width: 1100px; margin: 0 auto; }

  h2 {
    font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 700;
    text-align: center; margin-bottom: 3rem; color: var(--text-primary);
  }

  /* Hero */
  .hero-sub { font-size: 1.2rem; color: var(--text-secondary); margin: 0.75rem 0 1.5rem; }
  .hero-bio {
    max-width: 680px; margin: 0 auto 2rem;
    font-size: 1rem; line-height: 1.8; color: var(--text-secondary);
  }
  .hero-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
  .hero-links { display: flex; gap: 1.25rem; justify-content: center; margin-bottom: 1.25rem; flex-wrap: wrap; }
  .hero-link {
    font-size: 0.9rem; font-weight: 600; color: var(--accent);
    text-decoration: none; display: flex; align-items: center; gap: 6px;
  }
  .hero-link:hover { text-decoration: underline; }

  .hl {
    color: var(--accent);
    font-weight: 700;
  }

  .btn-primary {
    padding: 0.8rem 2rem;
    background: linear-gradient(135deg, #4f46e5, #7c3aed);
    color: #fff; border: none; border-radius: 99px;
    font-size: 0.95rem; font-weight: 600; cursor: pointer; transition: all 0.25s;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(79,70,229,0.35); }

  .btn-outline {
    padding: 0.8rem 2rem; background: none;
    color: var(--accent); border: 2px solid var(--accent);
    border-radius: 99px; font-size: 0.95rem; font-weight: 600;
    cursor: pointer; transition: all 0.25s;
  }
  .btn-outline:hover { background: var(--accent); color: #fff; transform: translateY(-2px); }

  /* Cards */
  .card {
    background: var(--bg-card);
    border-radius: 16px;
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
    transition: all 0.3s;
  }
  .card:hover { box-shadow: var(--shadow-hover); transform: translateY(-4px) scale(1.01); }
  .card-pad { padding: 1.5rem; }
  .card-title { font-size: 1.05rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--text-primary); }

  /* Pills */
  .pills { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 0.75rem; }
  .pill {
    font-size: 0.75rem; font-weight: 500; padding: 4px 10px;
    border-radius: 99px; background: var(--pill-bg); color: var(--pill-text);
  }
  .pill2 {
    font-size: 0.75rem; font-weight: 500; padding: 4px 10px;
    border-radius: 99px; background: var(--pill-bg2); color: var(--pill-text2);
  }

  /* Grids */
  .grid3 { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
  .grid2 { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1.5rem; }

  /* Education */
  .edu-card {
    background: var(--bg-card); border-radius: 14px;
    border: 1px solid var(--border); padding: 1.5rem;
    box-shadow: var(--shadow); transition: all 0.3s;
  }
  .edu-card:hover { box-shadow: var(--shadow-hover); transform: scale(1.01); }
  .edu-row { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.4rem; }
  .edu-degree { font-weight: 700; font-size: 1.05rem; color: var(--text-primary); }
  .edu-year { font-weight: 600; color: var(--accent); font-size: 0.9rem; }
  .edu-inst { color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 0.3rem; }
  .edu-grade { color: var(--green); font-weight: 600; font-size: 0.9rem; margin-bottom: 0.3rem; }
  .edu-desc { color: var(--text-muted); font-size: 0.875rem; }

  /* Timeline */
  .timeline { position: relative; }
  .timeline::before {
    content: ''; position: absolute; left: 50%; transform: translateX(-50%);
    top: 0; bottom: 0; width: 2px;
    background: linear-gradient(to bottom, #4f46e5, #7c3aed);
    border-radius: 1px;
  }
  .timeline-item { display: flex; margin-bottom: 3rem; position: relative; }
  .timeline-item:nth-child(odd) { flex-direction: row; }
  .timeline-item:nth-child(even) { flex-direction: row-reverse; }
  .timeline-content { width: calc(50% - 2rem); }
  .timeline-item:nth-child(odd) .timeline-content { margin-right: auto; padding-right: 2rem; }
  .timeline-item:nth-child(even) .timeline-content { margin-left: auto; padding-left: 2rem; }
  .timeline-dot {
    position: absolute; left: 50%; transform: translateX(-50%);
    width: 14px; height: 14px;
    background: var(--timeline-dot);
    border: 3px solid var(--timeline-dot-border);
    border-radius: 50%; margin-top: 1.5rem; z-index: 1;
  }
  .exp-company { color: var(--accent); font-weight: 600; font-size: 0.95rem; margin-bottom: 0.25rem; }
  .exp-period { color: var(--text-muted); font-size: 0.85rem; margin-bottom: 0.75rem; }
  .exp-bullets { color: var(--text-secondary); font-size: 0.875rem; line-height: 1.7; padding-left: 1rem; }
  .exp-bullets li { margin-bottom: 0.5rem; }

  /* Projects */
  .proj-period { color: var(--text-muted); font-size: 0.8rem; font-weight: 600; margin-bottom: 0.5rem; }
  .proj-desc { color: var(--text-secondary); font-size: 0.875rem; line-height: 1.7; margin-bottom: 1rem; }
  .proj-links { display: flex; gap: 1rem; margin-top: 1rem; }
  .proj-link {
    font-size: 0.85rem; font-weight: 500; color: var(--text-muted);
    text-decoration: none; display: flex; align-items: center; gap: 5px; transition: color 0.2s;
  }
  .proj-link:hover { color: var(--accent); }

  /* Achievements */
  .achieve-icon { font-size: 2rem; margin-bottom: 0.75rem; }

  /* Certifications */
  .cert-title { font-weight: 700; color: var(--text-primary); margin-bottom: 0.3rem; }
  .cert-issuer { color: var(--accent); font-weight: 600; font-size: 0.9rem; }
  .cert-date { color: var(--text-muted); font-size: 0.85rem; margin-top: 0.2rem; }

  /* Contact */
  .social-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
  .social-card {
    background: var(--bg-card); border: 1px solid var(--border);
    border-radius: 14px; padding: 1.5rem 1rem;
    display: flex; flex-direction: column; align-items: center; gap: 0.75rem;
    text-decoration: none; color: var(--text-primary);
    transition: all 0.25s; font-weight: 600; font-size: 0.9rem;
    box-shadow: var(--shadow);
  }
  .social-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-hover); color: var(--accent); }

  .cta-box {
    background: linear-gradient(135deg, #4f46e5, #7c3aed);
    border-radius: 16px; padding: 2.5rem; text-align: center; color: #fff;
  }
  .cta-box h3 { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.75rem; }
  .cta-box p { opacity: 0.9; margin-bottom: 1.5rem; }
  .cta-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: #fff; color: #4f46e5; padding: 0.75rem 2rem;
    border-radius: 99px; font-weight: 700; text-decoration: none; transition: all 0.25s;
  }
  .cta-btn:hover { transform: scale(1.05); box-shadow: 0 6px 20px rgba(0,0,0,0.2); }

  @media (max-width: 700px) {
    .timeline::before { left: 18px; }
    .timeline-item, .timeline-item:nth-child(even) { flex-direction: row; }
    .timeline-content,
    .timeline-item:nth-child(odd) .timeline-content,
    .timeline-item:nth-child(even) .timeline-content {
      width: 100%; padding-left: 3rem; padding-right: 0; margin: 0;
    }
    .timeline-dot { left: 18px; }
    .nav-links { display: none; }
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--bg-page); }
  ::-webkit-scrollbar-thumb { background: linear-gradient(#4f46e5, #7c3aed); border-radius: 3px; }
  html { scroll-behavior: smooth; }
`;

const SECTIONS = ["summary", "expertise", "education", "experience", "projects", "achievements", "certifications", "contact"];

// Highlights standout numbers/metrics and key tech keywords so they pop out visually.
const HL_PATTERN = /(\d[\d,]*\+?%?|AWS|Terraform|GitLab CI\/CD|CI\/CD|Docker|Kubernetes|EKS|ECR|IAM|RDS(?!\w)|S3(?!\w)|React\.js|Angular|Node\.js|Express\.js|Spring Boot|PostgreSQL|MongoDB|LSTM|DDPG|NLP|REST APIs?|JWT|Streamlit|Scikit-learn|Hierarchical DDPG|Terraform|entity-relationship architecture|semantic clustering|Intellectual Nutrition Scoring)/g;

const highlight = (text) => {
  const parts = text.split(HL_PATTERN);
  return parts.map((part, i) => (i % 2 === 1 ? <span key={i} className="hl">{part}</span> : part));
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("summary");

  // Apply theme via data-theme attribute on the wrapper div
  // This is the correct approach — Tailwind dark: classes require a build-time
  // darkMode: 'class' config that doesn't exist in CDN/artifact mode.
  const theme = darkMode ? "dark" : "";

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 80;
      let current = "summary";
      for (const section of SECTIONS) {
        const el = document.getElementById(section);
        if (el && scrollPosition >= el.offsetTop) current = section;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div data-theme={theme} style={{ transition: "background 0.3s, color 0.3s" }}>
      <style>{customStyles}</style>

      {/* Nav */}
      <nav>
        <div className="nav-inner">
          <div className="nav-links">
            {SECTIONS.map((s) => (
              <button
                key={s}
                className={`nav-btn${activeSection === s ? " active" : ""}`}
                onClick={() => scrollToSection(s)}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
          <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)} title="Toggle theme">
            {darkMode ? (
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      <div style={{ paddingTop: 56 }}>

        {/* Summary */}
        <section id="summary" className="hero-section">
          <div className="section-inner" style={{ textAlign: "center" }}>
            <div className="fade-up">
              <span className="gradient-name">Aditi Nagpal</span>
              <p className="hero-sub">Associate Software Developer · AI &amp; Cloud Enthusiast</p>
              <p className="hero-bio">
                {highlight(
                  "Software Engineer with hands-on experience in full-stack development, AI-driven applications and cloud infrastructure/DevOps. Skilled in building REST API-based backend systems using Java Spring Boot, Node.js and React, and in provisioning and automating AWS cloud infrastructure using Terraform and GitLab CI/CD. Strong foundation in data structures, algorithms, and system design, with the ability to build and deploy scalable software solutions end-to-end."
                )}
              </p>
              <div className="hero-btns">
                <button className="btn-primary" onClick={() => scrollToSection("projects")}>View My Work</button>
                <button className="btn-outline" onClick={() => scrollToSection("contact")}>Get In Touch</button>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise / Technical Skills */}
        <section id="expertise" className="page-section alt">
          <div className="section-inner">
            <h2>Technical Skills</h2>
            <div className="grid3">
              {[
                { title: "💻 Languages", skills: ["Java","C/C++","Python","JavaScript","SQL"] },
                { title: "🧩 Frameworks & Libraries", skills: ["Angular","React.js","Node.js","Express.js","Spring Boot","Tailwind CSS"] },
                { title: "☁️ Cloud & DevOps (AWS)", skills: ["EKS","ECR","RDS","S3","IAM","Terraform","GitLab CI/CD","Docker","Kubernetes"] },
                { title: "🤖 Tools & AI", skills: ["Git","Power BI","Linux","Machine Learning","Reinforcement Learning","NLP"] },
                { title: "🗄️ Databases & Core Skills", skills: ["MongoDB","PostgreSQL","Data Structures","Algorithms","OOP","System Design"] },
              ].map((item, i) => (
                <div key={i} className="card card-pad">
                  <div className="card-title">{item.title}</div>
                  <div className="pills">
                    {item.skills.map((s, j) => <span key={j} className="pill">{s}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education */}
        <section id="education" className="page-section">
          <div className="section-inner">
            <h2>Education</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {[
                { degree: "BE in Computer Science and Engineering", institution: "University Institute of Engineering and Technology, Panjab University, Chandigarh", year: "11/2022 – 05/2026", grade: "CGPA: 8.65 / 10", desc: "Specializing in Software Engineering, Data Structures, and Machine Learning" },
                { degree: "Senior Secondary (12th Grade)", institution: "Panacea Senior Secondary Public School (CBSE), Jalalabad(W)", year: "2022", grade: "94.8%", desc: "Physics, Chemistry, Mathematics" },
                { degree: "Secondary (10th Grade)", institution: "Sacred Heart Convent School (ICSE), Jalalabad(W)", year: "2020", grade: "95%", desc: "Comprehensive secondary education with focus on STEM subjects" },
              ].map((edu, i) => (
                <div key={i} className="edu-card">
                  <div className="edu-row">
                    <span className="edu-degree">{edu.degree}</span>
                    <span className="edu-year">{edu.year}</span>
                  </div>
                  <p className="edu-inst">{edu.institution}</p>
                  <p className="edu-grade">{edu.grade}</p>
                  <p className="edu-desc">{edu.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="page-section alt">
          <div className="section-inner">
            <h2>Experience</h2>
            <div className="timeline">
              {[
                {
                  title: "Associate Software Developer", company: "Cotiviti India Private Ltd · Mohali, India", period: "January 2026 – Present",
                  bullets: [
                    "Engineered a full-stack application using Java Spring Boot, Angular, and PostgreSQL, designing 20+ REST APIs with complex entity-relationship architecture.",
                    "Provisioned and managed 20+ AWS resources using Terraform, reducing infrastructure provisioning time by 80% and ensuring reproducible, version-controlled deployments across environments.",
                    "Built and optimized GitLab CI/CD pipelines for automated build, testing, containerization, and deployment, reducing manual intervention by 90% and accelerating release cycles.",
                    "Automated deployment workflows using Docker, ECR and EKS, reducing release time by 70%, while contributing 15+ production features, enhancements, and critical bug fixes to applications used by hundreds of end users.",
                  ],
                  skills: ["Java","Spring Boot","Angular","PostgreSQL","Terraform","GitLab CI/CD","Docker","EKS","ECR"],
                },
                {
                  title: "Research Intern", company: "Telecommunications Laboratory, UIET · Chandigarh, India", period: "June 2024 – July 2024",
                  bullets: [
                    "Researched computational offloading optimization in multi-UAV MEC systems using Hierarchical DDPG with LSTM networks.",
                    "Conducted 500+ DRL training simulations incorporating UAV mobility and battery constraints, reducing task latency and improving system reliability.",
                  ],
                  skills: ["Reinforcement Learning","Python","TensorFlow","LSTM","Mobile Edge Computing"],
                },
              ].map((exp, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="card card-pad">
                      <div className="card-title">{exp.title}</div>
                      <p className="exp-company">{exp.company}</p>
                      <p className="exp-period">{exp.period}</p>
                      <ul className="exp-bullets">
                        {exp.bullets.map((b, j) => <li key={j}>{highlight(b)}</li>)}
                      </ul>
                      <div className="pills">
                        {exp.skills.map((s, j) => <span key={j} className="pill2">{s}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="page-section">
          <div className="section-inner">
            <h2>Featured Projects</h2>
            <div className="grid2">
              {[
                {
                  title: "Trash Tracker", period: "September 2024 – November 2024",
                  desc: "MERN stack platform allowing citizens to report waste management issues across 50+ zones. Enhanced user support by integrating a 24/7 chatbot and automated alerts, improving citizen engagement and reducing resolution delays.",
                  tech: ["Node.js","React.js","Express.js","MongoDB","GPS Tracking","REST APIs"],
                  github: "https://github.com/NAGPALADITI14/TrashTrackerFrontend", demo: "https://trashtrackerfrontend.onrender.com/",
                },
                {
                  title: "Personal Content Analyzer", period: "December 2023 – February 2024",
                  desc: "Platform that preprocesses Google Takeout data to deliver detailed insights on YouTube and Chrome user activity across daily, weekly, and monthly intervals. Processed 10,000+ daily interactions with 98% content classification accuracy and built a dashboard featuring semantic clustering and an 'Intellectual Nutrition Scoring' system.",
                  tech: ["NLTK","Scikit-learn","Python","Streamlit","Machine Learning"],
                  github: "https://github.com/NAGPALADITI14/PersonalContentAnalyser", demo: "https://personalcontentanalyser-app.streamlit.app/",
                },
                {
                  title: "Resume Tracking System", period: "",
                  desc: "ATS-compatible resume analyzer with keyword optimization, skill matching, and job compatibility scoring using advanced algorithms.",
                  tech: ["React.js","Node.js","MongoDB","PDF Processing"],
                  github: "#", demo: "#",
                },
                {
                  title: "Student's Point", period: "",
                  desc: "Full-stack e-commerce application with scalable product management, secure JWT-based authentication, and a real-time cart supporting 50+ product variations with smooth checkout.",
                  tech: ["Next.js","TypeScript","Tailwind CSS","MongoDB","JWT"],
                  github: "https://github.com/NAGPALADITI14/Ecommerce_Stationary_Store", demo: "https://studentspoint.vercel.app/",
                },
              ].map((proj, i) => (
                <div key={i} className="card card-pad">
                  <div className="card-title">{proj.title}</div>
                  {proj.period && <div className="proj-period">{proj.period}</div>}
                  <p className="proj-desc">{highlight(proj.desc)}</p>
                  <div className="pills">
                    {proj.tech.map((t, j) => <span key={j} className="pill">{t}</span>)}
                  </div>
                  <div className="proj-links">
                    <a className="proj-link" href={proj.github} target="_blank" rel="noopener noreferrer">
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" /></svg>
                      Code
                    </a>
                    <a className="proj-link" href={proj.demo} target="_blank" rel="noopener noreferrer">
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      Demo
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section id="achievements" className="page-section alt">
          <div className="section-inner">
            <h2>Achievements</h2>
            <div className="grid3">
              {[
                { icon: "🏆", title: "National Semi Finalist — Flipkart Grid 7.0", desc: "Ranked among the top 10% of 1,60,000 participants who advanced to the further rounds." },
                { icon: "🌐", title: "SheFi Cohort 14 — Global Women in Tech", desc: "Selected for SheFi Cohort 14, a Global Women in Tech initiative, with a 100% merit scholarship." },
                { icon: "🎙️", title: "Active Debater — UIET MUN 7.0 & DEBSOC", desc: "Delegate at UIET MUN 7.0 and active member of DEBSOC, the Debating Society of UIET." },
                { icon: "💻", title: "500+ Coding Problems Solved", desc: "Solved 500+ problems across top coding platforms, demonstrating strong logical and algorithmic problem-solving skills." },
              ].map((a, i) => (
                <div key={i} className="card card-pad">
                  <div className="achieve-icon">{a.icon}</div>
                  <div className="card-title">{a.title}</div>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.6 }}>{highlight(a.desc)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section id="certifications" className="page-section">
          <div className="section-inner">
            <h2>Certifications</h2>
            <div className="grid2">
              {[
                { title: "Mastering Data Structures and Algorithms using C and C++", issuer: "Udemy", date: "2024" },
                { title: "Edge Computing: Master the Next Frontier of Computing", issuer: "Udemy", date: "2024" },
                { title: "JavaScript Concepts Hands On", issuer: "Infosys Springboard", date: "2024" },
                { title: "Fundamentals of Astrodynamics with Python", issuer: "Spartificial", date: "2023" },
              ].map((cert, i) => (
                <div key={i} className="card card-pad">
                  <div className="cert-title">{cert.title}</div>
                  <div className="cert-issuer">{cert.issuer}</div>
                  <div className="cert-date">{cert.date}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="page-section alt">
          <div className="section-inner" style={{ maxWidth: 800, margin: "0 auto" }}>
            <h2>Get In Touch</h2>
            <p style={{ textAlign: "center", color: "var(--text-secondary)", marginBottom: "2rem" }}>
              Let's connect and discuss opportunities to collaborate on exciting projects!
            </p>
            <div className="social-grid">
              {[
                {
                  name: "GitHub", url: "https://github.com/NAGPALADITI14",
                  icon: <svg width="28" height="28" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" /></svg>,
                },
                {
                  name: "LinkedIn", url: "https://www.linkedin.com/in/aditi-nagpal-225b78256/",
                  icon: <svg width="28" height="28" fill="currentColor" viewBox="0 0 20 20"><path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" /></svg>,
                },
                {
                  name: "LeetCode", url: "https://leetcode.com/u/nagpaladi05/",
                  icon: <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M13.633 1.637l-4.43 1.036-.341 1.394 4.195-1.077.576-2.023zm-6.23 2.158l-2.061 4.545-1.24-.265 2.195-4.502 1.106.222zm-2.053 5.37l-1.05 4.595-1.206-.275 1.135-4.57 1.121.25zm-1.898 5.48l-.348 4.398 1.22.198.375-4.428-1.247-.168zm2.637 5.093l4.314 1.488.196-1.261-4.321-1.5-.189 1.273zm4.568 1.624l4.577.49.12-1.206-4.57-.492-.127 1.208zm4.735-.045l3.224-3.41-1.092-1.036-3.136 3.486 1.004.96zm-1.39-3.92l3.435-4.225-1.004-.813-3.32 4.13.889.908zm-1.68-4.58l2.956-4.544-1.07-1.065-3.085 4.417 1.199 1.192z" /></svg>,
                },
                {
                  name: "Email", url: "mailto:nagpaladi05@gmail.com",
                  icon: <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
                },
              ].map((s, i) => (
                <a key={i} className="social-card" href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.icon}
                  {s.name}
                </a>
              ))}
            </div>
            <div className="cta-box">
              <h3>Ready to collaborate?</h3>
              <p>I'm always open to discussing new opportunities and interesting projects.</p>
              <a className="cta-btn" href="mailto:nagpaladi05@gmail.com">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                Send Message
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default App;