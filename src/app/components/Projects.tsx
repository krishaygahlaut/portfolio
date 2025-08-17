

"use client";
import { motion } from "framer-motion";
import React from "react";

const projects = [
  {
    title: "RiskyFy - Trading Risk Analysis App",
    description:
      "A professional iOS and Web app for crypto, forex, and stock traders. Includes risk calculators, trade logs, strategy simulators, and Firebase sync.",
    tech: ["SwiftUI", "Firebase", "Next.js"],
    github: "#",
  },
  {
    title: "BillBuster - AI OCR Expense Tracker",
    description:
      "iOS app that scans receipts using OCR, categorizes expenses with AI, and visualizes spending insights with charts.",
    tech: ["Swift", "CoreML", "VisionKit"],
    github: "https://github.com/krishaygahlaut/BillBuster",
  },
  {
    title: "TripiFy - Trip Planner App",
    description:
      "A collaborative trip planning app for iOS that lets users create, organize, and share travel itineraries. Features real-time syncing, activity suggestions, and sleek UI.",
    tech: ["SwiftUI", "Firebase", "MapKit"],
    github: "https://github.com/krishaygahlaut/TripiFy",
  },
  {
    title: "FitFuel - Smart Meal Logger & Calorie Tracker",
    description:
      "iOS app that lets users log meals with a simple photo, tracks calories and macros using AI-powered food recognition, and provides daily nutrition insights. Syncs securely with HealthKit.",
    tech: ["Swift", "CoreML", "HealthKit"],
    github: "https://github.com/krishaygahlaut/FitFuel",
  },
  {
    title: "Weatherly - iOS Weather App",
    description:
      "A beautiful iOS weather app with real-time forecasts, animated weather backgrounds, and location-based alerts. Built with SwiftUI and OpenWeatherMap API.",
    tech: ["SwiftUI", "OpenWeatherMap", "CoreLocation"],
    github: "https://github.com/krishaygahlaut/Weatherly",
  },
  {
    title: "Community Connect Project",
    description:
      "Volunteering project with Red Cross and NGOs, organizing awareness campaigns, workshops, and tech-driven outreach.",
    tech: ["Community", "Social Impact", "Workshops"],
    link: "https://jaspurtimes.com/3927/",
  },
];

export default function Projects() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          viewport={{ once: true }}
          className="bg-black/30 backdrop-blur-lg border border-purple-500/30 rounded-xl p-6 shadow-lg hover:shadow-purple-500/40 transition-shadow duration-500"
        >
          <h3 className="text-2xl font-semibold mb-3 text-purple-300">
            {project.title}
          </h3>
          <p className="text-gray-300 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((t, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm bg-purple-900/40 text-purple-200 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
            {/* For Community Connect Project, show News Article button. For others, show GitHub button if github exists */}
            {project.link ? (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.8, rotate: -10 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden px-4 py-2 bg-purple-700 hover:bg-purple-600 rounded-lg transition"
                onClick={(e) => {
                  e.preventDefault();
                  const button = e.currentTarget;
                  const circle = document.createElement("span");
                  const diameter = Math.max(button.clientWidth, button.clientHeight);
                  const radius = diameter / 2;
                  circle.style.width = circle.style.height = `${diameter}px`;
                  circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
                  circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
                  circle.classList.add("ripple");
                  const ripple = button.getElementsByClassName("ripple")[0];
                  if (ripple) ripple.remove();
                  button.appendChild(circle);
                  const url = project.link;
                  setTimeout(() => {
                    window.open(url, "_blank");
                  }, 300);
                }}
              >
                <span className="pointer-events-none absolute inset-0"></span>
                News Article
              </motion.a>
            ) : project.github ? (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.8, rotate: -10 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden px-4 py-2 bg-purple-700 hover:bg-purple-600 rounded-lg transition"
                onClick={(e) => {
                  e.preventDefault();
                  const button = e.currentTarget;
                  const circle = document.createElement("span");
                  const diameter = Math.max(button.clientWidth, button.clientHeight);
                  const radius = diameter / 2;
                  circle.style.width = circle.style.height = `${diameter}px`;
                  circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
                  circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
                  circle.classList.add("ripple");
                  const ripple = button.getElementsByClassName("ripple")[0];
                  if (ripple) ripple.remove();
                  button.appendChild(circle);
                  const url = project.github;
                  setTimeout(() => {
                    window.open(url, "_blank");
                  }, 300);
                }}
              >
                <span className="pointer-events-none absolute inset-0"></span>
                GitHub
              </motion.a>
            ) : null}
          </div>
        </motion.div>
      ))}
    </div>
  );
}