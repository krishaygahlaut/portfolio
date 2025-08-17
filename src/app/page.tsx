"use client";
import "./globals.css";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Projects from "./components/Projects";

export default function Home() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const { scrollYProgress } = useScroll();

  const aboutRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: aboutProgress } = useScroll({
    target: aboutRef,
    offset: ["start 80%", "start 40%"],
  });
  const aboutOpacity = useTransform(aboutProgress, [0, 1], [0, 1]);
  const aboutY = useTransform(aboutProgress, [0, 1], [40, 0]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const moveCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleDown = () => setIsClicking(true);
    const handleUp = () => setIsClicking(false);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual"; // prevent browser from restoring scroll
      window.scrollTo({ top: 0, behavior: "instant" }); // jump to top
    }
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  const skills = [
    { name: "Web Development", level: 90 },
    { name: "iOS Development", level: 85 },
    { name: "AI/ML", level: 75 },
    { name: "Design", level: 70 },
    { name: "Firebase", level: 80 },
    { name: "Tailwind", level: 90 },
    { name: "Embedded Systems (Arduino)", level: 60 },
  ];

  const experienceEntries = [
    {
      title: "Internship at IIT Bombay",
      date: "Jun 2022 - Aug 2022",
      description:
        "Worked on machine learning projects and contributed to research papers.",
    },
    {
      title: "Community Connect",
      date: "Jan 2021 - Present",
      description:
        "Organized tech workshops and coding bootcamps for local communities.",
    },
    {
      title: "Personal Projects",
      date: "Ongoing",
      description:
        "Built multiple apps and web projects focusing on productivity and design.",
    },
    {
      title: "Learning Embedded Systems with Arduino",
      date: "Currently",
      description:
        "Exploring hardware programming and embedded systems using Arduino to broaden my development skills.",
    },
  ];

  const experienceContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const experienceItemVariants = {
    hidden: (index: number) => ({
      opacity: 0,
      x: index % 2 === 0 ? -100 : 100,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  const aboutContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const aboutItemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 60, damping: 25, mass: 0.8 },
    },
  };

  const testimonialsContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.4,
      },
    },
  };

  const testimonialItemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 150, damping: 25, mass: 0.8 },
    },
  };

  return (
    <div className="cursor-none">
      {/* Floating Menu Button */}
      <button
        onClick={() => setIsNavOpen(!isNavOpen)}
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-purple-600 text-white shadow-lg hover:bg-pink-500 transition"
      >
        {isNavOpen ? "✕" : "☰"}
      </button>

      <AnimatePresence>
        {isNavOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-30"
              onClick={() => setIsNavOpen(false)}
            />
            {/* Pop-out Navigation */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4 }}
              className="fixed top-0 right-0 h-full w-64 bg-black/95 backdrop-blur-md text-white flex flex-col items-center justify-center gap-6 z-40 shadow-lg"
            >
              <a href="#about" onClick={() => setIsNavOpen(false)} className="hover:text-pink-400">About</a>
              <a href="#projects" onClick={() => setIsNavOpen(false)} className="hover:text-pink-400">Projects</a>
              <a href="#skills" onClick={() => setIsNavOpen(false)} className="hover:text-pink-400">Skills</a>
              <a href="#experience" onClick={() => setIsNavOpen(false)} className="hover:text-pink-400">Experience</a>
              <a href="#testimonials" onClick={() => setIsNavOpen(false)} className="hover:text-pink-400">Testimonials</a>
              <a href="#contact" onClick={() => setIsNavOpen(false)} className="hover:text-pink-400">Contact</a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <motion.section
        className="h-screen flex flex-col items-center justify-center 
      bg-gradient-to-b from-black via-purple-950 to-black text-white relative overflow-hidden cursor-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Background Overlay */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(0px)" }}
          animate={{ opacity: 0.6, filter: "blur(8px)" }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-900/40 to-black/70"
        />
        {/* Elegant Name */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-extrabold mb-6 
        bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-400 to-purple-600"
        >
          Krishay Gahlaut
        </motion.h1>

        {/* Elegant Tagline */}
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          className="text-xl md:text-3xl font-medium 
        bg-clip-text text-transparent bg-gradient-to-r from-gray-300 via-purple-200 to-pink-200"
        >
          Creative Developer & Designer
        </motion.h2>

        {/* Subtle Glow Orbs */}
        <div className="absolute top-28 left-28 w-48 h-48 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-28 right-28 w-64 h-64 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>

        {/* Minimal Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 2, duration: 1 }}
          onClick={scrollToAbout}
          className="absolute bottom-10 animate-bounce text-white/70 cursor-pointer"
        >
          ↓ Scroll
        </motion.button>

        {/* Custom Glow Cursor */}
        <>
          {/* Outer Glow Aura */}
          <motion.div
            animate={{
              x: cursorPos.x - 32,
              y: cursorPos.y - 32,
              scale: isClicking ? 2.2 : 1.5,
              opacity: isClicking ? 0.6 : 0.4,
            }}
            transition={{ type: "spring", stiffness: 100, damping: 30 }}
            className="fixed top-0 left-0 w-16 h-16 rounded-full pointer-events-none
      bg-purple-500 blur-2xl opacity-50 mix-blend-screen z-40"
          />
          {/* Inner Core Cursor */}
          <motion.div
            animate={{
              x: cursorPos.x - 8,
              y: cursorPos.y - 8,
              scale: isClicking ? 1.6 : 1,
              opacity: 1,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none
      bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 shadow-lg z-50"
          />
        </>
      </motion.section>

      {/* About Section moved after landing */}
      <motion.section
        id="about"
        ref={aboutRef}
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-purple-950/70 to-black text-white px-6 md:px-20 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        {/* Gradient Glowing Background Animation */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-900/30 via-pink-700/20 to-purple-900/30 blur-3xl opacity-40 animate-pulse pointer-events-none"
        />
        <motion.div
          variants={aboutContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="w-full flex flex-col items-center relative z-10"
        >
          {/* Animated heading */}
          <motion.h2
            variants={aboutItemVariants}
            className="text-4xl md:text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-400 to-purple-600"
          >
            About Me
          </motion.h2>

          {/* Intro text */}
          <motion.p
            variants={aboutItemVariants}
            className="max-w-3xl text-lg md:text-xl text-gray-300 leading-relaxed text-center"
          >
            I'm <span className="text-purple-400 font-semibold">Krishay Gahlaut</span>,
            a versatile developer passionate about building elegant
            <span className="text-pink-400"> iOS apps</span>, modern
            <span className="text-purple-400"> web experiences</span>,
            and using <span className="text-pink-400">AI</span> to maximize productivity.
            I love learning new technologies and applying them to craft innovative solutions.
          </motion.p>

          {/* Cards */}
          <motion.div
            variants={aboutContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl"
          >
            {/* iOS */}
            <motion.div
              variants={aboutItemVariants}
              className="bg-gradient-to-br from-purple-900/40 to-black/30 rounded-xl p-6 backdrop-blur-md border border-purple-700/40 shadow-lg hover:shadow-purple-500/30 transition"
            >
              <h3 className="text-2xl font-semibold text-purple-300 mb-3">iOS Development</h3>
              <p className="text-gray-400">
                Experienced in Swift, SwiftUI, CoreData, and CloudKit.
                Built scalable apps with VisionKit, UPI integration, and real-time sync.
              </p>
            </motion.div>

            {/* Web */}
            <motion.div
              variants={aboutItemVariants}
              className="bg-gradient-to-br from-purple-900/40 to-black/30 rounded-xl p-6 backdrop-blur-md border border-purple-700/40 shadow-lg hover:shadow-purple-500/30 transition"
            >
              <h3 className="text-2xl font-semibold text-purple-300 mb-3">Web Development</h3>
              <p className="text-gray-400">
                Skilled in React, Next.js, Tailwind, and Framer Motion.
                Passionate about crafting animated, elegant, and responsive web apps.
              </p>
            </motion.div>

            {/* AI */}
            <motion.div
              variants={aboutItemVariants}
              className="bg-gradient-to-br from-purple-900/40 to-black/30 rounded-xl p-6 backdrop-blur-md border border-purple-700/40 shadow-lg hover:shadow-purple-500/30 transition"
            >
              <h3 className="text-2xl font-semibold text-purple-300 mb-3">AI & Productivity</h3>
              <p className="text-gray-400">
                Leverage AI tools like ChatGPT and Copilot to boost productivity,
                automate workflows, and learn faster while solving complex problems.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>


      <motion.section
        id="projects"
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-purple-950 to-black text-white px-6 md:px-20 py-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-400 to-purple-600">
          Projects
        </h2>
        <Projects />
      </motion.section>

      {/* Skills Section */}
      <motion.section
        id="skills"
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-purple-950 to-black text-white px-6 md:px-20 py-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-400 to-purple-600">
          Skills
        </h2>
        <div className="w-full max-w-4xl space-y-8">
          {skills.map(({ name, level }) => (
            <div key={name}>
              <div className="flex justify-between mb-1">
                <span className="text-lg font-medium text-purple-300">{name}</span>
                <span className="text-sm text-gray-400">{level}%</span>
              </div>
              <div className="w-full bg-purple-900 rounded-full h-4">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${level}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="h-4 rounded-full bg-gradient-to-r from-pink-400 via-purple-500 to-purple-700"
                />
              </div>
            </div>
          ))}
        </div>
        {/* Rolling Skill Logos */}
        <div className="relative w-full mt-20 overflow-hidden py-12">
          {/* Left Fade */}
          <div className="absolute left-0 top-0 w-40 h-full bg-gradient-to-r from-black via-black/60 to-transparent z-10 pointer-events-none"></div>
          {/* Right Fade */}
          <div className="absolute right-0 top-0 w-40 h-full bg-gradient-to-l from-black via-black/60 to-transparent z-10 pointer-events-none"></div>
          {/* Moving Logos */}
          <div className="relative flex overflow-hidden">
            <div className="flex animate-marquee min-w-max gap-16">
              <img src="/logos/react.svg" alt="React" className="h-14 w-auto grayscale hover:grayscale-0 hover:scale-110 hover:drop-shadow-lg transition-transform duration-300" />
              <img src="/logos/nextjs.svg" alt="Next.js" className="h-14 w-auto invert grayscale hover:grayscale-0 hover:scale-110 hover:drop-shadow-lg transition-transform duration-300" />
              <img src="/logos/tailwind.svg" alt="Tailwind" className="h-14 w-auto grayscale hover:grayscale-0 hover:scale-110 hover:drop-shadow-lg transition-transform duration-300" />
              <img src="/logos/firebase.svg" alt="Firebase" className="h-14 w-auto grayscale hover:grayscale-0 hover:scale-110 hover:drop-shadow-lg transition-transform duration-300" />
              <img src="/logos/swift.svg" alt="Swift" className="h-14 w-auto grayscale hover:grayscale-0 hover:scale-110 hover:drop-shadow-lg transition-transform duration-300" />
              <img src="/logos/arduino.svg" alt="Arduino" className="h-14 w-auto grayscale hover:grayscale-0 hover:scale-110 hover:drop-shadow-lg transition-transform duration-300" />
              <img src="/logos/github.svg" alt="GitHub" className="h-14 w-auto invert grayscale hover:grayscale-0 hover:scale-110 hover:drop-shadow-lg transition-transform duration-300" />
              <img src="/logos/vercel.svg" alt="Vercel" className="h-14 w-auto invert grayscale hover:grayscale-0 hover:scale-110 hover:drop-shadow-lg transition-transform duration-300" />
              <img src="/logos/python.svg" alt="Python" className="h-14 w-auto grayscale hover:grayscale-0 hover:scale-110 hover:drop-shadow-lg transition-transform duration-300" />
              <img src="/logos/figma.svg" alt="Figma" className="h-14 w-auto grayscale hover:grayscale-0 hover:scale-110 hover:drop-shadow-lg transition-transform duration-300" />
              <img src="/logos/cpp.svg" alt="C++" className="h-14 w-auto grayscale hover:grayscale-0 hover:scale-110 hover:drop-shadow-lg transition-transform duration-300" />
              <img src="/logos/nodejs.svg" alt="Node.js" className="h-14 w-auto grayscale hover:grayscale-0 hover:scale-110 hover:drop-shadow-lg transition-transform duration-300" />
            </div>
            {/* duplicate for seamless loop */}
            <div className="flex animate-marquee min-w-max gap-16" aria-hidden="true">
              <img src="/logos/react.svg" alt="React" className="h-14 w-auto grayscale" />
              <img src="/logos/nextjs.svg" alt="Next.js" className="h-14 w-auto invert grayscale" />
              <img src="/logos/tailwind.svg" alt="Tailwind" className="h-14 w-auto grayscale" />
              <img src="/logos/firebase.svg" alt="Firebase" className="h-14 w-auto grayscale" />
              <img src="/logos/swift.svg" alt="Swift" className="h-14 w-auto grayscale" />
              <img src="/logos/arduino.svg" alt="Arduino" className="h-14 w-auto grayscale" />
              <img src="/logos/github.svg" alt="GitHub" className="h-14 w-auto invert grayscale" />
              <img src="/logos/vercel.svg" alt="Vercel" className="h-14 w-auto invert grayscale" />
              <img src="/logos/python.svg" alt="Python" className="h-14 w-auto grayscale" />
              <img src="/logos/figma.svg" alt="Figma" className="h-14 w-auto grayscale" />
              <img src="/logos/cpp.svg" alt="C++" className="h-14 w-auto grayscale" />
              <img src="/logos/nodejs.svg" alt="Node.js" className="h-14 w-auto grayscale" />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section
        id="experience"
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-purple-950 to-black text-white px-6 md:px-20 py-20 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        variants={experienceContainerVariants}
        viewport={{ once: true }}
      >
        {/* Subtle animated glow background */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-900/30 via-pink-700/20 to-purple-900/30 blur-3xl opacity-40 animate-pulse pointer-events-none"
        />
        <h2 className="relative z-10 text-4xl md:text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-400 to-purple-600">
          Experience
        </h2>
        <div className="relative max-w-3xl w-full before:absolute before:top-0 before:left-5 before:w-1 before:h-full before:bg-purple-700 z-10">
          {experienceEntries.map(({ title, date, description }, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={experienceItemVariants}
              className="mb-12 relative pl-12"
            >
              <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-purple-500 border-2 border-purple-700"></div>
              <h3 className="text-2xl font-semibold text-purple-300">{title}</h3>
              <span className="text-sm text-gray-400">{date}</span>
              <p className="mt-2 text-gray-300">{description}</p>
            </motion.div>
          ))}
        </div>
        {/* Smooth Fade-Out Divider */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        id="testimonials"
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-purple-950 to-black text-white px-6 md:px-20 py-20 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        variants={testimonialsContainerVariants}
        viewport={{ once: true }}
      >
        {/* Smooth Fade-In Divider */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent pointer-events-none z-0" />
        {/* Subtle animated glow background */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-900/30 via-pink-700/20 to-purple-900/30 blur-3xl opacity-40 animate-pulse pointer-events-none z-0"
        />
        <h2 className="relative z-10 text-4xl md:text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-400 to-purple-600">
          Testimonials
        </h2>
        <div className="relative z-10 max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            variants={testimonialItemVariants}
            whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(168,85,247,0.3)" }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className="z-10 bg-gradient-to-br from-purple-900/40 to-black/30 rounded-xl p-6 backdrop-blur-md border border-purple-700/40 shadow-lg hover:shadow-purple-500/30 transition"
          >
            <p className="text-gray-300 italic mb-4">
              "Krishay's dedication and skill transformed our project beyond expectations. A true professional!"
            </p>
            <h4 className="text-purple-300 font-semibold">Mentor</h4>
          </motion.div>

          <motion.div
            variants={testimonialItemVariants}
            whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(168,85,247,0.3)" }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className="z-10 bg-gradient-to-br from-purple-900/40 to-black/30 rounded-xl p-6 backdrop-blur-md border border-purple-700/40 shadow-lg hover:shadow-purple-500/30 transition"
          >
            <p className="text-gray-300 italic mb-4">
              "Working alongside Krishay was inspiring. His creativity and problem-solving skills shine through every project."
            </p>
            <h4 className="text-purple-300 font-semibold">Colleague</h4>
          </motion.div>

          <motion.div
            variants={testimonialItemVariants}
            whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(168,85,247,0.3)" }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className="z-10 bg-gradient-to-br from-purple-900/40 to-black/30 rounded-xl p-6 backdrop-blur-md border border-purple-700/40 shadow-lg hover:shadow-purple-500/30 transition"
          >
            <p className="text-gray-300 italic mb-4">
              "The app Krishay developed exceeded our expectations. Highly recommend his expertise and professionalism."
            </p>
            <h4 className="text-purple-300 font-semibold">Client</h4>
          </motion.div>
        </div>
      </motion.section>
      {/* Contact Section moved to bottom */}
      <motion.section
        id="contact"
        className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-b from-black via-purple-950 to-black text-white px-6 md:px-20 py-20 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Subtle animated glow background */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-900/30 via-pink-700/20 to-purple-900/30 blur-3xl opacity-40 animate-pulse pointer-events-none z-0"
        />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          viewport={{ once: true }}
          className="relative z-10 w-full max-w-2xl flex flex-col items-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-400 to-purple-600 text-center"
          >
            Let&rsquo;s Work Together
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-gray-300 mb-10 text-center max-w-xl"
          >
            Interested in collaborating or have a project in mind? Let&rsquo;s connect and create something amazing!
          </motion.p>
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className="w-full bg-gradient-to-br from-purple-900/40 to-black/30 rounded-xl p-8 backdrop-blur-md border border-purple-700/40 shadow-lg flex flex-col gap-6 mb-8"
            onSubmit={e => {
              e.preventDefault();
              // Could add form handling here
            }}
            autoComplete="off"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <label htmlFor="name" className="text-purple-200 mb-2">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="rounded-lg px-4 py-2 bg-black/60 border border-purple-700/40 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                autoComplete="off"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <label htmlFor="email" className="text-purple-200 mb-2">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="rounded-lg px-4 py-2 bg-black/60 border border-purple-700/40 text-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                autoComplete="off"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <label htmlFor="message" className="text-purple-200 mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="rounded-lg px-4 py-2 bg-black/60 border border-purple-700/40 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition resize-none"
                autoComplete="off"
              />
            </motion.div>
            <motion.button
              type="submit"
              whileHover={{
                boxShadow: "0 0 24px 6px #a855f7, 0 0 40px 12px #ec4899",
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              className="mt-2 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-700 text-white font-semibold py-2 rounded-lg shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Send Message
            </motion.button>
          </motion.form>
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            viewport={{ once: true }}
            className="flex gap-8 items-center justify-center"
          >
            {/* GitHub */}
            <a
              href="https://github.com/krishayg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-300 hover:text-pink-400 transition flex items-center gap-2 text-lg"
              aria-label="GitHub"
            >
              <svg width="24" height="24" fill="currentColor" className="inline-block align-middle"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.426 2.865 8.182 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.004.07 1.532 1.033 1.532 1.033.892 1.53 2.341 1.089 2.91.833.092-.647.35-1.09.636-1.341-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.42-.012 2.75 0 .267.18.578.688.48C19.138 20.2 22 16.446 22 12.021 22 6.484 17.522 2 12 2z"/></svg>
              <span className="hidden md:inline">GitHub</span>
            </a>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/krishaygahlaut/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-300 hover:text-pink-400 transition flex items-center gap-2 text-lg"
              aria-label="LinkedIn"
            >
              <svg width="24" height="24" fill="currentColor" className="inline-block align-middle"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.5 19h-3v-9h3v9zm-1.5-10.3c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15 10.3h-3v-4.5c0-1.07-.02-2.44-1.5-2.44-1.5 0-1.73 1.17-1.73 2.36v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.41-1.54 2.9-1.54 3.1 0 3.67 2.04 3.67 4.7v4.61z"/></svg>
              <span className="hidden md:inline">LinkedIn</span>
            </a>
            {/* Email */}
            <a
              href="mailto:krishaygahlaut@gmail.com"
              className="text-purple-300 hover:text-pink-400 transition flex items-center gap-2 text-lg"
              aria-label="Email"
            >
              <svg width="24" height="24" fill="currentColor" className="inline-block align-middle"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zm0 12H4V8.99l8 6.99 8-6.99V18z"/></svg>
              <span className="hidden md:inline">Email</span>
            </a>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
}