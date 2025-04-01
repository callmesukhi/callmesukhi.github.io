import { useState, useEffect } from "react";
import { Sun, Moon, Mail, Github, Linkedin, FileText } from "lucide-react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.body.className = darkMode ? "bg-black text-white" : "bg-white text-black";
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-mono p-4 transition-colors duration-300">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 p-2 rounded-full border border-current hover:opacity-75"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">Hi, I'm Sukhmander.</h1>
      <p className="text-lg md:text-xl max-w-xl text-center mb-4">
        I'm an IT Engineer at GitHub based in the Netherlands. I build efficient systems, solve complex problems, and drink too much coffee.
      </p>
      <div className="flex gap-6 mt-6">
        <a
          href="mailto:callmesukhi@gmail.com"
          className="hover:opacity-80 transition"
          aria-label="Email"
        >
          <Mail size={28} />
        </a>
        <a
          href="https://github.com/callmesukhi"
          target="_blank"
          className="hover:opacity-80 transition"
          aria-label="GitHub"
        >
          <Github size={28} />
        </a>
        <a
          href="https://linkedin.com/in/callmesukhi"
          target="_blank"
          className="hover:opacity-80 transition"
          aria-label="LinkedIn"
        >
          <Linkedin size={28} />
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          className="hover:opacity-80 transition"
          aria-label="Download Resume"
        >
          <FileText size={28} />
        </a>
      </div>
    </div>
  );
}
