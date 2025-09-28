// Certificates Page - Next.js (React)
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface CertificatePost {
  title: string;
  brief: string;
  coverImage: string | null;
  slug: string;
  url: string;
}

const certificateData: CertificatePost[] = [
  {
    title: "Deep Learning Onramp – MathWorks",
    brief: "Completed the Deep Learning Onramp course by MathWorks Training Services, learning neural networks and deep learning fundamentals in MATLAB.",
    coverImage: "/certificates/deep-learning.png",
    slug: "deep-learning-onramp-mathworks",
    url: "https://deep-learning-onramp-certificate-mathworks.hashnode.dev/deep-learning-onramp-certificate-mathworks",
  },
  {
    title: "Image Processing Onramp – MathWorks",
    brief: "Learned image processing techniques and fundamentals using MATLAB through the Image Processing Onramp course.",
    coverImage: "/certificates/image-processing.png",
    slug: "image-processing-onramp-mathworks",
    url: "https://image-processing-onramp-certificate-mathworks.hashnode.dev/image-processing-onramp-certificate-mathworks?showSharer=true",
  },
  {
    title: "Machine Learning Onramp – MathWorks",
    brief: "Gained foundational knowledge of machine learning concepts and applications in MATLAB.",
    coverImage: "/certificates/machine-learning.png",
    slug: "machine-learning-onramp-mathworks",
    url: "https://machine-learning-onramp-certificate-mathworks.hashnode.dev/machine-learning-onramp-certificate-mathworks?showSharer=true",
  },
  {
    title: "MATLAB Onramp – MathWorks",
    brief: "Completed the MATLAB Onramp course to master the basics of MATLAB programming and environment.",
    coverImage: "/certificates/matlab-onramp.png",
    slug: "matlab-onramp-mathworks",
    url: "https://matlab-onramp-certificate-mathworks.hashnode.dev/matlab-onramp-certificate-mathworks?showSharer=true",
  },
  {
    title: "Full-Stack Web Development Bootcamp – Udemy",
    brief: "Completed an intensive bootcamp covering front-end and back-end web development technologies.",
    coverImage: "/certificates/fullstack-web-dev.png",
    slug: "full-stack-web-development-bootcamp-udemy",
    url: "https://fullstack-web-development-bootcamp-certificate-udemy.hashnode.dev/full-stack-web-development-bootcamp-certificate-udemy?showSharer=true",
  },
  {
    title: "iOS & Swift Bootcamp – Udemy",
    brief: "Learned iOS app development and Swift programming through hands-on projects.",
    coverImage: "/certificates/ios-swift.png",
    slug: "ios-swift-bootcamp-udemy",
    url: "https://ios-swift-app-development-bootcamp-certificate-udemy.hashnode.dev/ios-and-swift-app-development-bootcamp-certificate-udemy?showSharer=true",
  },
  {
    title: "Mastering Data Structures & Algorithms – Udemy",
    brief: "Mastered essential data structures and algorithms for technical interviews and software development.",
    coverImage: "/certificates/data-structures-algorithms.png",
    slug: "mastering-data-structures-algorithms-udemy",
    url: "https://mastering-data-structures-algorithms-certificate-udemy.hashnode.dev/mastering-data-structures-and-algorithms-certificate-udemy?showSharer=true",
  },
  {
    title: "Mastering Machine Learning – Udemy",
    brief: "Advanced course on machine learning techniques and practical implementations.",
    coverImage: "/certificates/mastering-machine-learning.png",
    slug: "mastering-machine-learning-udemy",
    url: "https://mastering-machine-learning-certificate-udemy.hashnode.dev/mastering-machine-learning-from-basics-to-breakthroughs-udemy?showSharer=true",
  },
  {
    title: "Programming in Java – NPTEL",
    brief: "Completed the Programming in Java course offered by NPTEL, covering core Java concepts and programming.",
    coverImage: "/certificates/programming-java.png",
    slug: "programming-in-java-nptel",
    url: "https://programming-in-java-certificate-nptel.hashnode.dev/programming-in-java-certificate-nptel?showSharer=true",
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
            key={cert.slug}
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
            onClick={() => cert.coverImage && setSelectedCert(cert.coverImage)}
            className="relative rounded-2xl p-[2px] bg-gradient-to-br from-fuchsia-500 via-pink-500 to-purple-500 shadow-xl cursor-pointer hover:scale-105 hover:shadow-pink-500/50 transition-transform"
          >
            <div className="flex flex-col h-full rounded-2xl bg-black/80 backdrop-blur-xl p-6">
              <div className="relative w-full h-48 sm:h-64 mb-4">
                {/* Certificate image placeholder */}
                {cert.coverImage ? (
                  <Image
                    src={cert.coverImage}
                    alt={cert.title}
                    fill
                    className="object-contain rounded-xl shadow-lg hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-700 rounded-xl flex items-center justify-center text-sm text-purple-300">
                    No Image
                  </div>
                )}
              </div>
              <h2 className="text-xl font-bold text-fuchsia-200 mb-2">{cert.title}</h2>
              <p className="text-purple-100 text-sm mb-2 flex-1">{cert.brief}</p>
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-block mt-auto text-sm font-semibold text-pink-400 hover:text-pink-500 transition-colors"
              >
                More About Certificate →
              </a>
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