import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import HoverButton from "./components/HoverButton";
import { FaHtml5, FaCss3Alt, FaJs } from "react-icons/fa";
import { SiCplusplus, SiC } from "react-icons/si";
import StreakBackground from "./components/StreakBackground";

function TypingText({ words }) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      setText((prev) =>
        isDeleting
          ? currentWord.substring(0, prev.length - 1)
          : currentWord.substring(0, prev.length + 1)
      );

      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words]);

  return (
    <span>
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
}

function App() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const skills = [
  { name: "HTML", icon: <FaHtml5 /> },
  { name: "CSS", icon: <FaCss3Alt /> },
  { name: "Basic JavaScript", icon: <FaJs /> },
  { name: "C", icon: <SiC /> },
  { name: "C++", icon: <SiCplusplus /> },
];
  return (
   <div className="relative bg-transparent text-white overflow-hidden">
    <StreakBackground />
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-4 bg-black/30 backdrop-blur-md z-50">
        <h1 className="font-semibold">Vaidehi</h1>
        <div className="space-x-6 text-sm text-gray-300">
          <a href="#about" className="hover:text-white">About</a>
          <a href="#skills" className="hover:text-white">Skills</a>
          <a href="#projects" className="hover:text-white">Projects</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </div>
      </nav>

{/* HERO */}

    <section
      className="min-h-screen flex items-center justify-center px-6 py-24 text-center relative overflow-hidden"
      onMouseMove={(e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        setPos({ x, y });
      }}
    >
  <div className="max-w-3xl">

<motion.h1 
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="relative text-5xl md:text-7xl font-bold tracking-tight mb-6"
>
  <span className="relative z-10">VAIDEHI CHAURASIA</span>

  {/* 🔥 Glow Layer */}
<span
  className="absolute inset-0 blur-3xl opacity-20 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 animate-glow transition-transform duration-200"
  style={{
    transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`
  }}
></span>
</motion.h1>

    <motion.p 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="text-lg md:text-xl text-gray-400 mb-10"
    >
      Web Development Enthusiast
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.4 }}
      className="flex justify-center"
    >
      <HoverButton onClick={() => window.location.href = "#about"}>
        View More ↓
      </HoverButton>
    </motion.div>

  </div>
</section>

      {/* ABOUT SECTION */}
      <section id="about" className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl text-center"
        >
          <h2 className="text-3xl md:text-5xl font-semibold mb-6">
            About Me
          </h2>
          <div className="text-gray-400 text-lg leading-relaxed space-y-6 text-left max-w-4xl mx-auto mt-8">
            <p>
              <strong className="text-white">Career Objective:</strong> To enhance my skills in web development and gain practical experience by working on real-world projects.
            </p>
            <p>
              <strong className="text-white">Education:</strong> B.E in Information Science (2022–2028), Fr. Conceicao Rodrigues College of Engineering
            </p>
            <p>
              <strong className="text-white">Achievements:</strong> Participated in coding competition
            </p>
            <p>
              <strong className="text-white">Hobbies:</strong> Reading, Drawing
            </p>
          </div>
        </motion.div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-5xl w-full text-center">
    
        <h2 className="text-3xl md:text-5xl font-semibold mb-12">
          Skills
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      
         {skills.map((skill, i) => (
       <div
  key={i}
  className="relative p-6 bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden group transition-all duration-300 hover:scale-105 hover:bg-[#1f1f1f]"
>
  
  {/* Glow layer */}
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 blur-xl"></div>

  {/* Content */}
 <div className="relative z-10 flex flex-col items-center gap-3">
  <div className="text-3xl text-gray-400 group-hover:text-white transition">
    {skill.icon}
  </div>

  <p className="text-sm font-medium text-gray-300 group-hover:text-white transition">
    {skill.name}
  </p>
</div>

</div>
        ))}

         </div>
         <div className="mt-10 flex justify-center">
  <HoverButton onClick={() => window.location.href = "#projects"}>
    View Projects →
  </HoverButton>
</div>

          </div>
        </section>

        {/* PROJECTS SECTION */}
<section id="projects" className="min-h-screen flex items-center justify-center px-6">
  <div className="text-center">

    <h2 className="text-3xl md:text-5xl font-semibold mb-8">
      Projects
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto text-left">
      <div className="p-6 bg-[#1a1a1a] rounded-xl border border-gray-800 transition-all duration-300 hover:scale-105 hover:bg-[#1f1f1f]">
        <h3 className="text-2xl font-bold mb-3 text-white">Simple Calculator</h3>
        <p className="text-gray-400">Developed using HTML, CSS & JavaScript</p>
      </div>
      <div className="p-6 bg-[#1a1a1a] rounded-xl border border-gray-800 transition-all duration-300 hover:scale-105 hover:bg-[#1f1f1f]">
        <h3 className="text-2xl font-bold mb-3 text-white">Resume Website</h3>
        <p className="text-gray-400">Created as part of WT Lab project</p>
      </div>
      <div className="p-6 bg-[#1a1a1a] rounded-xl border border-gray-800 transition-all duration-300 hover:scale-105 hover:bg-[#1f1f1f]">
        <h3 className="text-2xl font-bold mb-3 text-white">Leave Portal</h3>
        <p className="text-gray-400">Basic web application for managing leave requests</p>
      </div>
    </div>

  </div>
</section>
{/* CONTACT SECTION */}
<section id="contact" className="min-h-screen flex items-center justify-center px-6">
  <div className="text-center max-w-xl">

   <h2 className="text-3xl md:text-5xl font-semibold mb-6 tracking-wide">
  Let’s work{" "}
  <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
    together!
  </span>
</h2>

    <p className="text-gray-400 mb-8">
      Feel free to reach out for collaborations or just a friendly hello 👋<br />
      <span className="block mt-4 text-white text-lg">📞 8591733126</span>
    </p>

    {/* Email Button */}
    <a href="mailto:sonalchaurasia28@gmail.com">
  <HoverButton>Email Me</HoverButton>
</a>

  </div>
</section>

    </div>
  );
}
export default App;