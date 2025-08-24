// Certificates Page - Next.js (React)
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const certificateData = [
  {
    title: "React Developer Certification",
    description:
      "Learned advanced React concepts including hooks, context, and performance optimization. Built real-world applications and mastered component architecture.",
    image: "/certificates/react.png", // placeholder path
  },
  {
    title: "Next.js Mastery",
    description:
      "Gained expertise in server-side rendering, static site generation, and dynamic routing with Next.js. Developed full-stack applications with API routes.",
    image: "/certificates/nextjs.png", // placeholder path
  },
  {
    title: "UI/UX Design Essentials",
    description:
      "Explored the fundamentals of user interface and experience design. Focused on accessibility, color theory, and modern design systems.",
    image: "/certificates/uiux.png", // placeholder path
  },
];

export default function CertificatesPage() {
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-16 bg-gradient-to-br from-purple-950 via-black/70 to-purple-900">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-3xl text-center mb-12"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-fuchsia-400 via-pink-500 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
          Certificates
        </h1>
        <p className="mt-4 text-lg text-purple-200/90">
          Every certificate tells a story — a step forward in mastering my craft.
        </p>
      </motion.div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        {certificateData.map((cert, idx) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: idx * 0.15,
              type: "spring",
              stiffness: 90,
              damping: 20
            }}
            whileHover={{ scale: 1.08, rotate: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            onClick={() => setSelectedCert(cert.image)}
            className="relative rounded-2xl p-[2px] bg-gradient-to-br from-fuchsia-500 via-pink-500 to-purple-500 shadow-xl cursor-pointer hover:scale-105 hover:shadow-pink-500/50 transition-transform"
          >
            <div className="flex flex-col h-full rounded-2xl bg-black/80 backdrop-blur-xl p-6">
              <div className="flex items-center justify-center h-32 mb-4">
                {/* Certificate image placeholder */}
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-24 h-24 object-contain rounded-xl shadow-lg hover:scale-105 transition-transform"
                />
              </div>
              <h2 className="text-xl font-bold text-fuchsia-200 mb-2">{cert.title}</h2>
              <p className="text-purple-100 text-sm mb-2 flex-1">{cert.description}</p>
              {/* Optional: Add a "View Certificate" button or link */}
            </div>
          </motion.div>
        ))}
      </section>

      {selectedCert && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedCert(null)}
        >
          <motion.img
            src={selectedCert}
            alt="Certificate"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-3xl w-[90%] rounded-xl shadow-2xl"
          />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-12"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-fuchsia-800/80 via-pink-800/70 to-purple-900/80 backdrop-blur-md border border-fuchsia-400/30 text-fuchsia-100 font-semibold shadow-lg hover:shadow-pink-500/60 hover:scale-110 transition-transform duration-300"
        >
          <span className="text-lg">←</span>
          <span>Back to Home</span>
        </Link>
      </motion.div>
    </main>
  );
}