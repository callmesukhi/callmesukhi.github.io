
import Head from "next/head";
import { useState, useEffect } from "react";
import { Sun, Moon, Mail, Github, Linkedin, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.body.classList.remove("bg-black", "text-white", "bg-white", "text-black");
    document.body.classList.add(darkMode ? "bg-black" : "bg-white", darkMode ? "text-white" : "text-black");
  }, [darkMode]);

  return (
    <>
      <Head>
        <title>@callmesukhi</title>
        <meta name="description" content="Sukhmander's personal site" />
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center font-sans p-4 transition-colors duration-300">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-4 right-4 p-2 rounded-full border border-current hover:opacity-75"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold mb-8 text-center uppercase tracking-wide hover:scale-105 hover:text-indigo-500 transition-transform duration-300"
        >
          Hi, I'm SUKHMANDER.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-xl max-w-xl text-center mb-4"
        >
          I'm an IT Engineer at GitHub based in the Netherlands. I build efficient systems, solve complex problems, and drink too much coffee.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex gap-6 mt-6"
        >
          <a href="mailto:callmesukhi@gmail.com" className="hover:opacity-80 transition" aria-label="Email"><Mail size={28} /></a>
          <a href="https://github.com/callmesukhi" target="_blank" className="hover:opacity-80 transition" aria-label="GitHub"><Github size={28} /></a>
          <a href="https://linkedin.com/in/callmesukhi" target="_blank" className="hover:opacity-80 transition" aria-label="LinkedIn"><Linkedin size={28} /></a>
          <a href="/resume.pdf" target="_blank" className="hover:opacity-80 transition" aria-label="Download Resume"><FileText size={28} /></a>
        </motion.div>
      </div>
    </>
  );
}
