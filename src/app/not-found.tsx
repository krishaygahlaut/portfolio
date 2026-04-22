
"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:0.8}}
        className="text-center space-y-6">
        <div className="font-mono text-xs text-white/30 tracking-widest">404 — NOT FOUND</div>
        <h1 className="font-display font-extrabold text-white" style={{fontSize:"clamp(60px,12vw,120px)",lineHeight:1}}>
          <span className="grad-text">Oops.</span>
        </h1>
        <p className="text-white/45 max-w-sm mx-auto">This page doesn't exist. Let's get you back on track.</p>
        <Link href="/" className="inline-block font-display font-bold px-8 py-4 rounded-full text-void transition-all duration-300"
          style={{background:"#4DFFD2"}}
          onMouseEnter={e=>(e.currentTarget as HTMLElement).style.boxShadow="0 0 40px rgba(77,255,210,0.4)"}
          onMouseLeave={e=>(e.currentTarget as HTMLElement).style.boxShadow=""}>
          Back Home
        </Link>
      </motion.div>
    </div>
  );
}
