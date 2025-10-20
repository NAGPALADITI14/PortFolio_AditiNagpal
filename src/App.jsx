import React, { useState, useEffect } from "react";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("summary");

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "summary",
        "expertise",
        "education",
        "experience",
        "projects",
        "achievements",
        "certifications",
        "contact",
      ];
      // Offset by 100px to activate the section before it hits the very top
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (
          element &&
          scrollPosition >= element.offsetTop &&
          scrollPosition < element.offsetTop + element.offsetHeight
        ) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  // --- Inline Styles/CSS Block for Custom Animations and Scrollbar ---
  const customStyles = `
    /* Custom Animations */
    @keyframes fade-in-up {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes gradient {
      0%, 100% { background-size: 200% 200%; background-position: left center; }
      50% { background-size: 200% 200%; background-position: right center; }
    }
    
    /* Custom Classes */
    .animate-fade-in-up {
      animation: fade-in-up 1s ease-out;
    }
    .animate-gradient {
      background: linear-gradient(-45deg, #4F46E5, #7C3AED, #EC4899, #EF4444);
      background-size: 400% 400%;
      animation: gradient 3s ease infinite;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #f1f5f9; } /* Light mode track */
    ::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, #4F46E5, #7C3AED);
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(180deg, #3730A3, #5B21B6);
    }
    
    /* Dark mode scrollbar */
    .dark ::-webkit-scrollbar-track {
      background: #1e293b;
    }

    /* Additional Fix: Ensure smooth scroll is present */
    html {
      scroll-behavior: smooth;
    }
  `;
  // -------------------------------------------------------------------

  return (
    // Inject the custom CSS directly into the component's render tree
    <div className={`${darkMode ? "dark" : ""} transition-all duration-500`}>
      <style>{customStyles}</style>

      {/* ADDED text-gray-800 as a default text color for light mode content */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 transition-all duration-500 text-gray-800 dark:text-white">
        {/* Navigation Header */}
        <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/20 dark:border-gray-700/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-8">
                {/* <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Portfolio
                </h1> */}
                <div className="hidden md:flex space-x-6">
                  {[
                    "summary",
                    "expertise",
                    "education",
                    "experience",
                    "projects",
                    "achievements",
                    "certifications",
                    "contact",
                  ].map((section) => (
                    <button
                      key={section}
                      onClick={() => scrollToSection(section)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
                        activeSection === section
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                          : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                      }`}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                {darkMode ? (
                  <svg
                    className="w-5 h-5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-gray-700"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </nav>

        <div className="pt-16">
      
          <section
            id="summary"
            className="min-h-screen flex items-center justify-center px-4 py-20"
          >
            <div className="max-w-6xl mx-auto text-center">
           
              <div className="animate-fade-in-up">
                <div className="relative inline-block mb-8">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-indigo-600 opacity-20 animate-pulse"></div> 
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-gradient">
                  Aditi Nagpal
                </h1>

                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 font-light">
                  Associate Software Developer Trainee | Data Scientist
                </p>

                <div className="max-w-3xl mx-auto mb-12">
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    Passionate Computer Science student with expertise in
                    full-stack development, machine learning, and data science.
                    Experienced in building scalable applications and AI
                    solutions that solve real-world problems.
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => scrollToSection("projects")}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    View My Work
                  </button>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
                  >
                    Get In Touch
                  </button>
                </div>
               </div>
            </div> 
          </section>

          {/* Key Expertise */}
          <section id="expertise" className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800 dark:text-white">
                Key Expertise
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Full Stack Development",
                    icon: "🚀",
                    skills: [
                      "React.js",
                      "Node.js",
                      "MongoDB",
                      "Express.js",
                      "Next.js",
                      "TailwindCSS",
                      "HTML5",
                      "CSS3",
                      "Vanilla Js",
                    ],
                    description:
                      "Building scalable web applications with modern frameworks",
                  },
                  {
                    title: "Machine Learning",
                    icon: "🤖",
                    skills: [
                      "Python",
                      "TensorFlow",
                      "PyTorch",
                      "Scikit-learn",
                      "Reinforcement Learning",
                    ],
                    description:
                      "Developing AI solutions and predictive models",
                  },
                  {
                    title: "Data Science",
                    icon: "📊",
                    skills: [
                      "SQL",
                      "Power BI",
                      "Pandas",
                      "NumPy",
                      "Matplotlib",
                    ],
                    description: "Extracting insights from complex datasets",
                  },
                  {
                    title: "Programming Languages",
                    icon: "💻",
                    skills: ["C/C++", "Python", "JavaScript", "Java", "MATLAB"],
                    description: "Proficient in multiple programming paradigms",
                  },
                  {
                    title: "Cloud & DevOps",
                    icon: "☁️",
                    skills: ["AWS", "Git", "Docker", "Linux", "Vercel"],
                    description:
                      "Deploying and managing applications in the cloud",
                  },
                  {
                    title: "Database Management",
                    icon: "🗄️",
                    skills: ["MySQL", "MongoDB", "PostgreSQL", "Redis"],
                    description: "Designing efficient database architectures",
                  },
                ].map((expertise, index) => (
                  <div
                    key={index}
                    className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                  >
                    {/* <div className="text-4xl mb-4 group-hover:animate-bounce">
                      {expertise.icon}
                    </div> */}
                    <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                      {expertise.title}
                    </h3>
                    {/* <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {expertise.description}
                    </p> */}
                    <div className="flex flex-wrap gap-2">
                      {expertise.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Education */}
          {/* Note: bg-gray-50 is explicitly for light mode, dark:bg-gray-800 for dark mode. */}
          <section
            id="education"
            className="py-20 px-4 bg-gray-50 dark:bg-gray-800"
          >
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800 dark:text-white">
                Education
              </h2>

              <div className="space-y-8">
                {[
                  {
                    degree: "BE in Computer Science and Engineering",
                    institution:
                      "University Institute of Engineering and Technology, Panjab University, Chandigarh",
                    year: "2022 - 2026",
                    grade: "CGPA: 8.65/10",
                    description:
                      "Specializing in Software Engineering, Data Structures, and Machine Learning",
                  },
                  {
                    degree: "Senior Secondary (12th Grade)",
                    institution:
                      "Panacea Senor Secondary Public School (CBSE), Jalalabad(W)",
                    year: "2022",
                    grade: "94.8%",
                    description: "Physics, Chemistry, Mathematics",
                  },
                  {
                    degree: "Secondary (10th Grade)",
                    institution:
                      "Sacred Heart Convent School (ICSE), Jalalabad(W)",
                    year: "2020",
                    grade: "95%",
                    description:
                      "Comprehensive secondary education with focus on STEM subjects",
                  },
                ].map((edu, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 md:mb-0">
                        {edu.degree}
                      </h3>
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">
                        {edu.year}
                      </span>
                    </div>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                      {edu.institution}
                    </p>
                    <p className="text-green-600 dark:text-green-400 font-semibold mb-3">
                      {edu.grade}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Experience */}
          <section id="experience" className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800 dark:text-white">
                Experience
              </h2>

              <div className="relative">
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 to-indigo-600 rounded-full"></div>

                <div className="space-y-12">
                  {[
                    {
                      title: "Research and RL Intern",
                      company: "Telecommunications Laboratory, UIET, ",
                      period: "June 2024 - July 2024",
                      description:
                        ["Researched computational offloading optimization in multi-UAV MEC systems using Hierarchical DDPG with LSTM networks.",
                          "Conducted 500+ DRL training simulations incorporating UAV mobility and battery constraints, reducing task latency and improving system reliability"
                        ],
                          skills: [
                        "Reinforcement Learning",
                        "Python",
                        "Tensorflow",
                        "LSTM",
                        "Mobile Edge Computing",
                        "UAVs",
                        "Numpy",
                        "Matplotlib",
                      ],
                    },
                    {
                      title: "Data Science Intern",
                      company: "Unified Mentor",
                      period: "July 2024 - August 2024",
                      description:
                        ["Designed predictive models for employee attrition and sales forecasting, achieving 98%+ accuracy using Python, SQL, and exploratory data analysis (EDA), reducing forecast errors by 30%."
                          ,"Built interactive dashboards to translate insights into strategic retention and budget decisions,improving workforce planning efficiency."
                    ],
                          skills: [
                        "Python",
                        "Pandas",
                        "Power BI",
                        "SQL",
                        "Machine Learning",
                        "Tableau",
                        "Seaborn",
                        "Matplotlib"
                      ],
                    },
                    
                  ].map((exp, index) => (
                    <div
                      key={index}
                      className={`relative flex items-center ${
                        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-900 z-10"></div>

                      <div
                        className={`ml-12 md:ml-0 ${
                          index % 2 === 0 ? "md:mr-8 md:text-right" : "md:ml-8"
                        } md:w-1/2`}
                      >
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                            {exp.title}
                          </h3>
                          <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">
                            {exp.company}
                          </p>
                          <p className="text-gray-500 dark:text-gray-400 mb-4">
                            {exp.period}
                          </p>
                          {/* <p className="text-gray-700 dark:text-gray-300 mb-4">{exp.description}</p> */}
                          <ul className="text-gray-700 dark:text-gray-300 mb-4 space-y-2 list-disc list-inside">
                            {exp.description.map((point, i) => (
                              <li key={i}>{point}</li>
                            ))}
                          </ul>
                          <div className="flex flex-wrap gap-2">
                            {exp.skills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-sm"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section
            id="projects"
            className="py-20 px-4 bg-gray-50 dark:bg-gray-800"
          >
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800 dark:text-white">
                Featured Projects
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {[
                  {
                    title: "Personal Content Analyzer",
                    description:
                      "Data analytics platform that preprocesses Google Takeout data to deliver insights on YouTube and Chrome activity using NLP-based content classification and semantic clustering. Introduced an “Intellectual Nutrition Scoring” system to quantify the educational value of digital consumption.",
        
                    tech: ["Python", "Streamlit", "NLP", "Machine Learning","Scikit-Learn"],
                    github: "https://github.com/NAGPALADITI14/PersonalContentAnalyser",
                    demo: "https://personalcontentanalyser-app.streamlit.app/",
                  },
                  {
                    title: "Resume Tracking System",
                    description:
                      "ATS-compatible resume analyzer with keyword optimization, skill matching, and job compatibility scoring using advanced algorithms.",
                  
                    tech: ["React.js", "Node.js", "MongoDB", "PDF Processing"],
                    github: "#",
                    demo: "#",
                  },
                  {
                    title: "Trash Tracker",
                    description:
                      "A MERN stack platform that allows citizens to report waste management issues across more than 50 zones. It includes a 24/7 chatbot and automated alerts to keep users informed and help reduce delays in resolving the reported issues.",
                   
                    tech: ["React.js", "Express.js", "Node.js","MongoDB","GPS Tracking","Rest APIs", "Google Maps API"],
                    github: "https://github.com/NAGPALADITI14/TrashTrackerFrontend",
                    demo: "https://trashtrackerfrontend.onrender.com/",
                  },
                  {
                    title: "Student's Point",
                    description:
                      "A full-stack e-commerce application that provides scalable product and category management with secure JWT-based authentication for controlled user access. It includes a real-time cart system that supports over 50 product variations, allowing smooth checkout and consistent performance.",
                    tech: ["Next.js", "Typescript", "Tailwind CSS", "MongoDB","JWT"],
                    github: "https://github.com/NAGPALADITI14/Ecommerce_Stationary_Store",
                    demo: "https://studentspoint.vercel.app/",
                  },
                ].map((project, index) => (
                  <div
                    key={index}
                    className="group bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                  >
                    <div className="relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex space-x-4">
                        <a
                          href={project.github}
                          className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>Code</span>
                        </a>
                        <a
                          href={project.demo}
                          className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                          <span>Demo</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Achievements */}
          <section id="achievements" className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800 dark:text-white">
                Achievements
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: "🏆",
                    title: "National Semi Finalist of Flipkart Grid 7.0",
                    description:
                      "Ranked among the top 10% of 1,60,000 participants who advanced to the further rounds of Flipkart GRiD 7.0.",
                  },
                  {
                    icon: "🏆",
                    title: "SHEFI Cohort 14 - Global Women in Tech initiative ",
                    description:
                      "Awarded a 100% scholarship and lifetime membership in a prestigious women-led community focused on cryptocurrency education and innovation.",
                  },
                  
                  {
                    icon: "🎯",
                    title: "CHASCON 2024 Presenter - National Conference on Indigenous Technologies for Viksit Bharat",
                    description:
                      "Presented a poster titled “Efficient Computation Offloading using UAV-based Mobile Edge Server: A Deep Reinforcement Learning Approach” and delivered an oral presentation on “Citizen-Powered Cleanliness Reporting System with Hotspot Detection and Alert Mechanism.",
                  },
                  // {
                  //   icon: "🥇",
                  //   title: "Top 5% Academic Performance",
                  //   description:
                  //     "Consistently maintained high academic standards with 94.8% in senior secondary",
                  // },
                  {
                    icon: "💻",
                    title: "500+ LeetCode Problems",
                    description:
                      "Solved extensive algorithmic challenges to strengthen problem-solving skills",
                  },
                  // {
                  //   icon: "🚀",
                  //   title: "Multiple Internships",
                  //   description:
                  //     "Completed successful internships in ML, Data Science, and Software Development",
                  // },
                ].map((achievement, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                  >
                    <div className="text-4xl mb-4">{achievement.icon}</div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {achievement.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Certifications */}
          <section
            id="certifications"
            className="py-20 px-4 bg-gray-50 dark:bg-gray-800"
          >
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800 dark:text-white">
                Certifications
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Mastering Data Structures and Algorithms using C and C++",
                    issuer: "Udemy",
                    date: "2024",
                  },
                  {
                    title: "Edge Computing: Master the Next Frontier of Computing",
                    issuer: "Udemy",
                    date: "2024"
                  }, 
                  {
                    title: "Javascript Concepts Hands On",
                    issuer: "Infosys Springboard",
                    date: "2024"
                  },
                  {
                    title: "Fundamentals of Astrodynamics with Python",
                    issuer: "Spartificial",
                    date: "2023"
                  },
                ].map((cert, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{cert.badge}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                          {cert.title}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold mb-1">
                          {cert.issuer}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 mb-3">
                          {cert.date}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          {cert.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800 dark:text-white">
                Get In Touch
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
                Let's connect and discuss opportunities to collaborate on
                exciting projects!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                  {
                    name: "GitHub",
                    icon: (
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ),
                    url: "https://github.com/NAGPALADITI14",
                    color: "hover:bg-gray-800",
                  },
                  {
                    name: "LinkedIn",
                    icon: (
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" />
                      </svg>
                    ),
                    url: "https://www.linkedin.com/in/aditi-nagpal-225b78256/",
                    color: "hover:bg-blue-600",
                  },
                  {
                    // REPLACED TWITTER WITH LEETCODE
                    name: "LeetCode",
                    icon: (
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13.633 1.637l-4.43 1.036-.341 1.394 4.195-1.077.576-2.023zm-6.23 2.158l-2.061 4.545-1.24-.265 2.195-4.502 1.106.222zm-2.053 5.37l-1.05 4.595-1.206-.275 1.135-4.57 1.121.25zm-1.898 5.48l-.348 4.398 1.22.198.375-4.428-1.247-.168zm2.637 5.093l4.314 1.488.196-1.261-4.321-1.5-.189 1.273zm4.568 1.624l4.577.49.12-1.206-4.57-.492-.127 1.208zm4.735-.045l3.224-3.41-1.092-1.036-3.136 3.486 1.004.96zm-1.39-3.92l3.435-4.225-1.004-.813-3.32 4.13.889.908zm-1.68-4.58l2.956-4.544-1.07-1.065-3.085 4.417 1.199 1.192zM12 22a10 10 0 100-20 10 10 0 000 20zM12 21a9 9 0 110-18 9 9 0 010 18z" />
                      </svg>
                    ),
                    url: "https://leetcode.com/u/nagpaladi05/",
                    color: "hover:bg-yellow-600",
                  },
                  {
                    name: "Email",
                    icon: (
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    ),
                    url: "mailto:nagpaladi05@email.com",
                    color: "hover:bg-red-500",
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 ${social.color} hover:text-white`}
                  >
                    <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                      {social.icon}
                    </div>
                    <span className="font-semibold">{social.name}</span>
                  </a>
                ))}
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Ready to collaborate?
                </h3>
                <p className="text-lg mb-6 opacity-90">
                  I'm always open to discussing new opportunities and
                  interesting projects.
                </p>
                <a
                  href="mailto:nagpaladi05@email.com"
                  className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Send Message</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default App;
