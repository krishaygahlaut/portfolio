// SuccessToast.tsx
"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SuccessToastProps {
  show: boolean;
  onClose: () => void;
}

export default function SuccessToast({ show, onClose }: SuccessToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="max-w-xs w-full px-8 py-6 rounded-3xl
              bg-gradient-to-r from-purple-700/40 via-pink-600/30 to-purple-800/40
              backdrop-blur-lg border-4 border-transparent rounded-3xl
              relative text-center text-white font-semibold text-lg
              before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-r before:from-purple-500 before:via-pink-500 before:to-purple-600 before:opacity-75 before:blur-lg before:animate-glow before:z-[-1]"
          >
            Message sent successfully!
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Add the following global CSS somewhere in your styles (e.g. globals.css or tailwind config):
// @keyframes glow {
//   0%, 100% {
//     filter: drop-shadow(0 0 6px rgba(219, 39, 119, 0.7)) drop-shadow(0 0 10px rgba(139, 92, 246, 0.7));
//   }
//   50% {
//     filter: drop-shadow(0 0 12px rgba(219, 39, 119, 1)) drop-shadow(0 0 20px rgba(139, 92, 246, 1));
//   }
// }
// .animate-glow {
//   animation: glow 3s ease-in-out infinite;
// }