import Head from "next/head";
import { useState, useEffect } from "react";
import { Sun, Moon, Mail, Github, Linkedin, FileText, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  // Initialize with null (will be set based on browser preference in useEffect)
  const [darkMode, setDarkMode] = useState(null);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [nameHover, setNameHover] = useState(false);
  const [showGithubPreview, setShowGithubPreview] = useState(false);
  
  // Define the JSON string at the component level
  const jsonNameString = '{"name":"sukhmander"}';

  // Store GitHub data
  const [githubData, setGithubData] = useState({
    avatar_url: '',
    login: '',
    bio: '',
    public_repos: 0,
    followers: 0,
    following: 0,
    loading: true
  });

  useEffect(() => {
    // Get user's system preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDarkMode);
    
    // Listen for changes to the system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply the theme classes when darkMode changes
  useEffect(() => {
    if (darkMode === null) return; // Skip initial render before we know the preference
    document.body.classList.remove("bg-black", "text-white", "bg-white", "text-black");
    document.body.classList.add(darkMode ? "bg-black" : "bg-white", darkMode ? "text-white" : "text-black");
  }, [darkMode]);

  // useEffect to fetch data when component mounts
  useEffect(() => {
    async function fetchGithubData() {
      try {
        const response = await fetch('https://api.github.com/users/callmesukhi');
        if (response.ok) {
          const data = await response.json();
          setGithubData({
            avatar_url: data.avatar_url,
            login: data.login,
            bio: data.bio || 'IT Engineer at GitHub',
            public_repos: data.public_repos,
            followers: data.followers,
            following: data.following,
            loading: false
          });
        }
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      }
    }
    
    fetchGithubData();
  }, []);

  return (
    <>
      <Head>
        <title>@callmesukhi</title>
        <meta name="description" content="Sukhmander's personal site" />
        
        {/* Standard favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        
        {/* PNG icons for better quality */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-512x512.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-192x192.png" />
        
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* Other meta tags */}
        <meta name="theme-color" content={darkMode ? "#000000" : "#ffffff"} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&family=Roboto+Mono&display=swap" rel="stylesheet" />
      </Head>
      
      <style jsx global>{`
  body {
    font-family: 'Roboto', sans-serif;
  }
  
  .gradient-text {
    background: linear-gradient(to right, #6366f1, #a855f7);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    transition: all 0.3s ease;
  }
  
  .gradient-text:hover {
    background: linear-gradient(to right, #ec4899, #8b5cf6);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-shadow: 0px 2px 8px rgba(139, 92, 246, 0.3);
  }

  .code-text {
    font-family: 'Roboto Mono', monospace;
  }
  
  /* Terminal popup styling - positioned higher above the name */
  .terminal-popup {
    position: absolute;
    top: -120px; /* Position much higher above the name */
    left: 50%;
    transform: translateX(-50%); /* Center horizontally only */
    background-color: #1e1e1e;
    border-radius: 6px;
    padding: 6px 10px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
    z-index: 10;
    width: auto; /* Adjust width to fit content */
    min-width: 240px;
  }
  
  /* Arrow pointing down to the name - increase its height to bridge the gap */
  .terminal-arrow {
    display: block; /* Show the arrow */
    position: absolute;
    bottom: -20px; /* Extended down further */
    left: 50%;
    transform: translateX(-50%);
    width: 14px;
    height: 20px; /* Taller arrow to bridge the gap */
    clip-path: polygon(0 0, 100% 0, 50% 100%);
    background-color: #1e1e1e;
  }
  
  .terminal-header {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
  }
  
  .terminal-dot {
    height: 8px;
    width: 8px;
    border-radius: 50%;
    margin-right: 5px;
  }
  
  .terminal-red { background-color: #ff5f56; }
  .terminal-yellow { background-color: #ffbd2e; }
  .terminal-green { background-color: #27c93f; }
  
  /* Ensure text is smaller and lowercase */
  .terminal-content {
    color: #5af78e;
    font-size: 0.5em; /* Slightly small font */
    white-space: nowrap;
    line-height: 1.4;
    text-transform: lowercase !important; /* Force lowercase */
    letter-spacing: -0.2px; /* Tighter spacing */
    padding: 2px 0;
  }
  
  /* Blinking cursor */
  .cursor {
    display: inline-block;
    width: 5px;
    height: 0.9em;
    background-color: #5af78e;
    animation: blink 1.2s infinite;
    margin-left: 2px;
    vertical-align: middle;
  }
  
  @keyframes blink {
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
  }
  
  .name-overlay {
    position: relative;
  }

  .theme-switch-btn {
    transition: all 0.3s ease;
  }

  .theme-switch-btn:hover {
    transform: rotate(20deg) scale(1.1);
    box-shadow: 0 0 8px rgba(138, 92, 246, 0.5);
  }

  .theme-switch-btn:active {
    transform: scale(0.9);
  }
`}</style>
      
      <div className="min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300">

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-4 right-4 p-2 rounded-full border border-current hover:opacity-75 theme-switch-btn"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Increased heading size */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-extrabold mb-16 text-center leading-tight"
        >
          Hi, I'm{" "}
          <span 
            className="uppercase font-black relative inline-block transition-all duration-300 gradient-text name-overlay"
            onMouseEnter={() => setNameHover(true)}
            onMouseLeave={() => setNameHover(false)}
          >
            Sukhmander
            <AnimatePresence>
              {nameHover && (
                <motion.div 
                  className={`terminal-popup ${darkMode ? 'terminal-popup-light' : 'terminal-popup-dark'}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="terminal-header">
                    <div className="terminal-dot terminal-red"></div>
                    <div className="terminal-dot terminal-yellow"></div>
                    <div className="terminal-dot terminal-green"></div>
                  </div>
                  <div className={`terminal-content ${darkMode ? 'terminal-content-light' : 'terminal-content-dark'}`}>
                    $ {jsonNameString}
                    <span className={`cursor ${darkMode ? 'cursor-light' : 'cursor-dark'}`}></span>
                  </div>
                  <div className={`terminal-arrow ${darkMode ? 'terminal-arrow-light' : 'terminal-arrow-dark'}`}></div>
                </motion.div>
              )}
            </AnimatePresence>
          </span>.
        </motion.h1>

        {/* Increased paragraph size */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-2xl md:text-3xl max-w-3xl text-center mb-12 leading-relaxed"
        >
          I'm an IT Engineer at{" "}
          <span className="font-black relative inline-block transition-all duration-300 gradient-text">
            GitHub
          </span> based in the Netherlands. I build efficient systems, solve complex problems, and drink too much decaf coffee.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex gap-6 mt-6"
        >
          {/* Email/Mail icon */}
          <button 
            onClick={() => setShowContactPopup(true)} 
            className="group relative transition cursor-pointer" 
            aria-label="Contact Me"
          >
            <Mail size={28} className="transition-all duration-300 group-hover:opacity-0" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="#EA4335">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
              </svg>
            </div>
          </button>
          
          {/* GitHub icon - with dark mode */}
          <a 
            href="https://github.com/callmesukhi" 
            target="_blank" 
            className="group relative transition" 
            aria-label="GitHub"
            onMouseEnter={() => setShowGithubPreview(true)}
            onMouseLeave={() => setShowGithubPreview(false)}
          >
            <Github size={28} className="transition-all duration-300 group-hover:opacity-0" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {darkMode ? (
                <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="28" height="28" fill="black">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              )}
            </div>

            {/* GitHub Preview Popup */}
            <AnimatePresence>
              {showGithubPreview && (
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 w-80 rounded-md overflow-hidden shadow-xl z-10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  {/* Browser-like header */}
                  <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-200'} p-2 flex items-center`}>
                    <div className="flex space-x-1.5 mr-2">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                    </div>
                    <div className={`${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-500'} rounded-md flex-1 py-1 px-2 text-xs truncate`}>
                      github.com/callmesukhi
                    </div>
                  </div>
                  
                  {/* GitHub content */}
                  <div className={darkMode ? 'bg-gray-800' : 'bg-white'}>
                    <div className={`w-full h-40 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}>
                      {/* GitHub profile image */}
                      <div className="flex items-center justify-center flex-col">
                        <div className="w-16 h-16 rounded-full bg-gray-300 mb-2 overflow-hidden">
                          {githubData.loading ? (
                            <div className="w-full h-full bg-gray-200 animate-pulse"></div>
                          ) : (
                            <img 
                              src={githubData.avatar_url} 
                              alt="GitHub Profile" 
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64" fill="%23333"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>';
                              }}
                            />
                          )}
                        </div>
                        <div className={`text-sm font-medium ${darkMode ? 'text-white' : ''}`}>@{githubData.login || 'callmesukhi'}</div>
                        <div className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-1`}>{githubData.bio}</div>
                      </div>
                    </div>
                    
                    {/* Repository stats bar */}
                    <div className={`flex justify-around py-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} text-xs`}>
                      <div className="text-center">
                        <div className={`font-bold ${darkMode ? 'text-white' : ''}`}>Repositories</div>
                        <div className={darkMode ? 'text-gray-300' : ''}>{githubData.loading ? '...' : githubData.public_repos}</div>
                      </div>
                      <div className="text-center">
                        <div className={`font-bold ${darkMode ? 'text-white' : ''}`}>Followers</div>
                        <div className={darkMode ? 'text-gray-300' : ''}>{githubData.loading ? '...' : githubData.followers}</div>
                      </div>
                      <div className="text-center">
                        <div className={`font-bold ${darkMode ? 'text-white' : ''}`}>Following</div>
                        <div className={darkMode ? 'text-gray-300' : ''}>{githubData.loading ? '...' : githubData.following}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </a>
          
          {/* LinkedIn icon */}
          <a href="https://linkedin.com/in/callmesukhi" target="_blank" className="group relative transition" aria-label="LinkedIn">
            <Linkedin size={28} className="transition-all duration-300 group-hover:opacity-0" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="#0A66C2">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
          </a>
          
          {/* Resume/Document icon */}
          <a href="/resume.pdf" target="_blank" className="group relative transition" aria-label="Download Resume">
            <FileText size={28} className="transition-all duration-300 group-hover:opacity-0" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="#4285F4">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
              </svg>
            </div>
            {/* Tooltip */}
            <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 text-sm whitespace-nowrap rounded transition-opacity opacity-0 group-hover:opacity-100 ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
              Clicking on this would take you to resume page
            </div>
          </a>
        </motion.div>
        
        <AnimatePresence>
          {showContactPopup && (
            <motion.div 
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowContactPopup(false)}
            >
              <motion.div 
                className={`${darkMode ? 'bg-gray-800' : 'bg-[#1e1e1e]'} p-6 rounded-lg shadow-xl max-w-md w-full`}
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Terminal header with dots */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-[#ff5f56] mr-2"></div>
                    <div className="h-3 w-3 rounded-full bg-[#ffbd2e] mr-2"></div>
                    <div className="h-3 w-3 rounded-full bg-[#27c93f]"></div>
                  </div>
                  <button 
                    onClick={() => setShowContactPopup(false)}
                    className="p-1 rounded-full hover:bg-gray-700 transition"
                  >
                    <X size={16} className="text-gray-400" />
                  </button>
                </div>
                
                {/* Terminal content with JSON */}
                <div className={`font-mono text-sm bg-[#1e1e1e] p-4 rounded`}>
                  <div className="flex items-center mb-2">
                    <span className="text-[#ff79c6] mr-2">$</span>
                    <span className="text-gray-300">cat contact.json</span>
                  </div>
                  <div className="pl-4">
                    <pre className="text-white">
                      <span className="text-[#8be9fd]">{"{"}</span>
                      <br />
                      <span className="pl-4">
                        <span className="text-[#79b8ff]">"email"</span>
                        <span className="text-white">: </span>
                        <a 
                          href="mailto:callmesukhi@gmail.com" 
                          className="text-[#79b8ff] hover:text-[#a2c8ff] transition-colors duration-200"
                        >
                          "callmesukhi@gmail.com"
                        </a>
                        <span className="text-white">,</span>
                      </span>
                      <br />
                      <span className="pl-4">
                        <span className="text-[#79b8ff]">"phone"</span>
                        <span className="text-white">: </span>
                        <span className="text-[#79b8ff]">"+31 6 23310717"</span>
                      </span>
                      <br />
                      <span className="text-[#8be9fd]">{"}"}</span>
                      <span className="inline-block w-2 h-4 bg-[#5af78e] ml-1 animate-pulse"></span>
                    </pre>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
