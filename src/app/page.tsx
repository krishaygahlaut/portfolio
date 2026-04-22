
"use client";
import dynamic from "next/dynamic";
import { Suspense, useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import Link from "next/link";

const HeroOrb = dynamic(() => import("@/components/3d/HeroOrb"), { ssr: false });

/* ── helpers ── */
const fadeUp  = (d=0) => ({ hidden:{y:40,opacity:0}, show:{y:0,opacity:1,transition:{duration:0.8,ease:[0.22,1,0.36,1],delay:d}} });
const fadeIn  = (d=0) => ({ hidden:{opacity:0},       show:{opacity:1,      transition:{duration:0.7,delay:d}} });

/* ─────────────────────────────────────────────
   MARQUEE TICKER
───────────────────────────────────────────── */
const TICKER_ITEMS = [
  "iOS Development","AWS Certified","AI / ML","Swift","Python","SwiftUI",
  "Embedded Robotics","Deep Learning","Full-Stack","MATLAB","Arduino","DSA","CoreData","React",
];
function Marquee() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="relative overflow-hidden py-4 border-y" style={{borderColor:"rgba(77,255,210,0.1)"}}>
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="flex gap-10 whitespace-nowrap w-max"
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase"
            style={{ color: i % 3 === 0 ? "#4DFFD2" : i % 3 === 1 ? "rgba(255,255,255,0.3)" : "#7B61FF" }}>
            <span className="w-1 h-1 rounded-full bg-current inline-block opacity-60" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   GLOWING STAT CARD
───────────────────────────────────────────── */
function StatCard({ n, label, color, icon }: { n:string; label:string; color:string; icon:string }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="glass-strong rounded-2xl p-5 text-center relative overflow-hidden transition-all duration-300"
      style={{ borderColor: hov ? `${color}45` : `${color}12`, transform: hov ? "translateY(-4px)" : "none",
        boxShadow: hov ? `0 20px 40px ${color}18` : "none" }}
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${color}08, transparent 70%)`, opacity: hov ? 1 : 0 }} />
      <div className="text-2xl mb-2">{icon}</div>
      <div className="font-display font-extrabold text-3xl tabular" style={{ color }}>{n}</div>
      <div className="text-white/40 text-xs font-mono mt-1 tracking-wider uppercase">{label}</div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   GLOW BUTTON
───────────────────────────────────────────── */
function GlowButton({ href, children, primary=false, external=false }:
  { href:string; children:React.ReactNode; primary?:boolean; external?:boolean }) {
  const [hov, setHov] = useState(false);
  const props = external
    ? { href, target:"_blank" as const, rel:"noopener noreferrer" }
    : {};

  const style = primary
    ? { background: hov ? "#6FFFDC" : "#4DFFD2", color: "#020308",
        boxShadow: hov ? "0 0 50px rgba(77,255,210,0.55), 0 0 100px rgba(77,255,210,0.2)" : "0 0 25px rgba(77,255,210,0.25)" }
    : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.7)", borderColor: hov ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.09)",
        boxShadow: hov ? "0 0 25px rgba(255,255,255,0.06)" : "none" };

  const Comp = external ? "a" : Link;
  return (
    // @ts-ignore
    <Comp href={href} {...(external ? props : {})}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="relative inline-flex items-center gap-2.5 font-display font-bold px-7 py-3.5 rounded-full text-sm tracking-wide transition-all duration-250 border overflow-hidden"
      style={style}>
      {/* Pulse ring */}
      {primary && hov && (
        <motion.span initial={{ scale:1, opacity:0.5 }} animate={{ scale:1.6, opacity:0 }}
          transition={{ duration:0.8, repeat:Infinity }}
          className="absolute inset-0 rounded-full border border-accent pointer-events-none" />
      )}
      {children}
    </Comp>
  );
}

/* ─────────────────────────────────────────────
   FEATURED PROJECT CARD (home preview)
───────────────────────────────────────────── */
const FEATURED = [
  { title:"BillBuster",   sub:"iOS FinTech App",         tags:["Swift","SwiftUI","CoreData"], color:"#4DFFD2", emoji:"💸" },
  { title:"AI Chess",     sub:"Minimax Algorithm",       tags:["Python","OOP","AI"],          color:"#7B61FF", emoji:"♟️" },
  { title:"Line Robot",   sub:"Arduino Autonomous Bot",  tags:["Embedded C","IR","L298N"],    color:"#00979D", emoji:"🤖" },
  { title:"FitFuel",      sub:"iOS Calorie Tracker",     tags:["SwiftUI","MVVM","HealthKit"], color:"#FF6B35", emoji:"🥗" },
  { title:"Weatherly",    sub:"Real-Time Weather iOS",   tags:["Swift","CoreLocation","API"], color:"#7B61FF", emoji:"🌤️" },
];

function ProjectPreviewCard({ p, i }: { p: typeof FEATURED[0]; i: number }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:"-60px" }}
      transition={{ duration:0.7, ease:[0.22,1,0.36,1], delay: i * 0.07 }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="glass-strong rounded-2xl p-6 relative overflow-hidden transition-all duration-350 group"
      style={{
        borderColor: hov ? `${p.color}40` : `${p.color}12`,
        transform: hov ? "translateY(-6px)" : "none",
        boxShadow: hov ? `0 24px 48px ${p.color}14` : "none",
      }}
    >
      {/* Glow sweep on hover */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{ background:`radial-gradient(ellipse at 30% 30%, ${p.color}09, transparent 65%)`, opacity: hov ? 1 : 0 }} />

      {/* Left accent bar */}
      <div className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full transition-all duration-300"
        style={{ background: p.color, boxShadow: hov ? `0 0 12px ${p.color}` : "none", opacity: hov ? 1 : 0.4 }} />

      <div className="pl-4 relative z-10">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <span className="text-2xl">{p.emoji}</span>
            <h3 className="font-display font-bold text-white text-lg mt-1.5 group-hover:translate-x-0.5 transition-transform duration-200">{p.title}</h3>
            <p className="text-white/40 text-xs font-mono mt-0.5">{p.sub}</p>
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-200 flex-shrink-0"
            style={{ borderColor: hov ? `${p.color}60` : "rgba(255,255,255,0.08)", background: hov ? `${p.color}12` : "transparent" }}>
            <span className="text-xs" style={{ color: hov ? p.color : "rgba(255,255,255,0.3)" }}>↗</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {p.tags.map(t => (
            <span key={t} className="text-xs font-mono px-2 py-0.5 rounded"
              style={{ background:`${p.color}10`, color:p.color, border:`1px solid ${p.color}22` }}>{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   CERT PILL ROW
───────────────────────────────────────────── */
const CERT_HIGHLIGHTS = [
  { name:"AWS Cloud Practitioner", color:"#FF9900", icon:"☁️" },
  { name:"AWS AI Practitioner",    color:"#FF9900", icon:"🤖" },
  { name:"Cisco Networking",       color:"#00BCEB", icon:"🌐" },
  { name:"iOS & Swift Bootcamp",   color:"#A435F0", icon:"📱" },
  { name:"Mastering DSA",          color:"#A435F0", icon:"🧮" },
  { name:"Deep Learning Onramp",   color:"#E16F24", icon:"🧠" },
  { name:"MATLAB Onramp",          color:"#E16F24", icon:"📊" },
  { name:"Full-Stack Web Dev",     color:"#A435F0", icon:"🌐" },
  { name:"NPTEL Java",             color:"#4DFFD2", icon:"☕" },
  { name:"ML Basics → Breakthroughs", color:"#A435F0", icon:"🔬" },
  { name:"Image Processing",       color:"#E16F24", icon:"🖼️" },
  { name:"Machine Learning Onramp",color:"#E16F24", icon:"🤖" },
];

/* ─────────────────────────────────────────────
   FLOATING BADGE (decorative)
───────────────────────────────────────────── */
function FloatingBadge({ label, color, style }: { label:string; color:string; style: React.CSSProperties }) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0], rotate: [-1, 1, -1] }}
      transition={{ duration: 4 + Math.random()*2, repeat: Infinity, ease: "easeInOut" }}
      className="absolute hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs pointer-events-none"
      style={{ ...style, background:`${color}12`, border:`1px solid ${color}35`, color, backdropFilter:"blur(8px)",
        boxShadow:`0 0 20px ${color}18` }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {label}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function Home() {
  const projRef   = useRef(null);
  const certsRef  = useRef(null);
  const aboutRef  = useRef(null);
  const projInView  = useInView(projRef,  { once:true, margin:"-80px" });
  const certsInView = useInView(certsRef, { once:true, margin:"-80px" });
  const aboutInView = useInView(aboutRef, { once:true, margin:"-80px" });

  return (
    <div className="overflow-x-hidden">

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden grid-bg pt-20">
        {/* Ambient glows */}
        <div className="absolute top-1/4 left-1/3 w-[700px] h-[700px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{ background:"radial-gradient(circle, rgba(123,97,255,0.09), transparent 65%)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background:"radial-gradient(circle, rgba(77,255,210,0.06), transparent 65%)" }} />
        <div className="absolute top-1/2 right-0 w-[300px] h-[600px] rounded-full pointer-events-none"
          style={{ background:"radial-gradient(circle, rgba(255,107,53,0.04), transparent 65%)" }} />

        {/* 3D Orb — right half */}
        <div className="absolute inset-0 pointer-events-none md:pointer-events-auto">
          <Canvas camera={{ position:[0,0,6], fov:50 }} dpr={[1,1.5]} performance={{ min:0.5 }} gl={{ antialias:true, alpha:true }}>
            <Suspense fallback={null}><HeroOrb /></Suspense>
          </Canvas>
        </div>

        {/* Floating badges */}
        <FloatingBadge label="AWS Certified" color="#FF9900" style={{ top:"22%", right:"8%"  }} />
        <FloatingBadge label="CGPA 8.28"     color="#4DFFD2" style={{ top:"38%", right:"18%" }} />
        <FloatingBadge label="SRM IST 2027"  color="#7B61FF" style={{ top:"55%", right:"6%"  }} />
        <FloatingBadge label="iOS Engineer"  color="#FF6B35" style={{ top:"70%", right:"22%" }} />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 w-full grid md:grid-cols-2 gap-12 items-center min-h-screen py-32">
          <motion.div
            initial="hidden" animate="show"
            variants={{ show:{ transition:{ staggerChildren:0.1, delayChildren:0.2 }}}}
            className="space-y-8"
          >
            {/* Status badge */}
            <motion.div variants={fadeUp()} className="flex items-center gap-3">
              <span className="flex items-center gap-2 tag">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Available · SRM IST 2027
              </span>
              <span className="tag" style={{ color:"#FF9900", borderColor:"rgba(255,153,0,0.3)", background:"rgba(255,153,0,0.07)" }}>
                AWS Certified
              </span>
            </motion.div>

            {/* Name */}
            <motion.div variants={fadeUp(0.05)}>
              <h1 className="font-display font-extrabold leading-[0.95] tracking-tight text-white"
                style={{ fontSize:"clamp(52px,8vw,92px)" }}>
                Krishay<br />
                <span className="grad-text">Gahlaut</span>
              </h1>
            </motion.div>

            {/* Role pills */}
            <motion.div variants={fadeUp(0.1)} className="flex flex-wrap gap-2">
              {[
                { label:"iOS Developer", color:"#FF6B35" },
                { label:"AI Builder",    color:"#7B61FF" },
                { label:"Robotics",      color:"#00979D" },
                { label:"Full-Stack",    color:"#4DFFD2" },
              ].map(r => (
                <span key={r.label} className="font-mono text-xs px-3 py-1.5 rounded-full"
                  style={{ background:`${r.color}10`, color:r.color, border:`1px solid ${r.color}30` }}>
                  {r.label}
                </span>
              ))}
            </motion.div>

            {/* Tagline */}
            <motion.p variants={fadeUp(0.12)} className="text-white/50 leading-relaxed max-w-lg"
              style={{ fontSize:"clamp(16px,1.8vw,19px)" }}>
              Building scalable <span className="text-accent font-medium">iOS apps</span>, intelligent{" "}
              <span style={{ color:"#7B61FF" }} className="font-medium">AI systems</span>, and{" "}
              <span style={{ color:"#FF6B35" }} className="font-medium">autonomous robots</span> — with a focus on clean architecture and real-world impact.
            </motion.p>

            {/* Stats */}
            <motion.div variants={fadeUp(0.14)} className="grid grid-cols-4 gap-3">
              <StatCard n="8.28" label="CGPA"     color="#4DFFD2" icon="🎓" />
              <StatCard n="5+"   label="Projects" color="#7B61FF" icon="⚡" />
              <StatCard n="12+"  label="Certs"    color="#FF6B35" icon="🏆" />
              <StatCard n="2027" label="Grad"     color="#FFD93D" icon="🚀" />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp(0.16)} className="flex flex-wrap gap-3">
              <GlowButton href="/projects" primary>View My Work →</GlowButton>
              <GlowButton href="/certifications">Credentials</GlowButton>
              <GlowButton href="/contact">Let's Talk</GlowButton>
            </motion.div>

            {/* Social links */}
            <motion.div variants={fadeUp(0.18)} className="flex items-center gap-6">
              {[
                { l:"GitHub",   h:"https://github.com/krishaygahlaut", icon:"⚡" },
                { l:"LinkedIn", h:"https://linkedin.com/in/krishaygahlaut", icon:"💼" },
                { l:"Email",    h:"mailto:kg3636@srmist.edu.in", icon:"✉️" },
              ].map(({ l, h, icon }) => (
                <a key={l} href={h} target="_blank" rel="noopener"
                  className="flex items-center gap-1.5 font-mono text-xs text-white/30 hover:text-accent transition-all duration-200 group">
                  <span className="group-hover:scale-110 transition-transform">{icon}</span>
                  {l}
                </a>
              ))}
            </motion.div>
          </motion.div>

          <div className="hidden md:block" />
        </div>

        {/* Scroll cue */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] text-white/20 tracking-[0.3em] uppercase">scroll</span>
          <motion.div animate={{ y:[0,8,0] }} transition={{ repeat:Infinity, duration:1.6, ease:"easeInOut" }}
            className="w-px h-8" style={{ background:"linear-gradient(to bottom, rgba(77,255,210,0.6), transparent)" }} />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          MARQUEE
      ══════════════════════════════════════ */}
      <Marquee />

      {/* ══════════════════════════════════════
          FEATURED PROJECTS
      ══════════════════════════════════════ */}
      <section ref={projRef} className="section relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full pointer-events-none"
          style={{ background:"radial-gradient(circle, rgba(77,255,210,0.04), transparent 70%)" }} />

        <div className="max-w-7xl mx-auto px-5 md:px-8">
          {/* Section header */}
          <motion.div initial="hidden" animate={projInView ? "show" : "hidden"}
            variants={{ show:{ transition:{ staggerChildren:0.08 }}}}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <motion.div variants={fadeUp()}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-px" style={{ background:"linear-gradient(to right, #4DFFD2, transparent)" }} />
                  <span className="font-mono text-xs text-accent/70 tracking-[0.2em] uppercase">Featured Work</span>
                </div>
                <h2 className="font-display font-extrabold text-white leading-tight"
                  style={{ fontSize:"clamp(36px,5vw,60px)" }}>
                  Things I've<br /><span className="grad-text">built</span>
                </h2>
              </motion.div>
            </div>
            <motion.div variants={fadeUp(0.1)}>
              <GlowButton href="/projects">View All Projects →</GlowButton>
            </motion.div>
          </motion.div>

          {/* Project grid — 2 cols + 1 wide */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURED.map((p, i) => (
              <Link key={p.title} href="/projects" className="block">
                <ProjectPreviewCard p={p} i={i} />
              </Link>
            ))}
          </div>

          {/* View all CTA strip */}
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.7 }}
            className="mt-8 glass-strong rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderColor:"rgba(77,255,210,0.12)" }}>
            <div>
              <p className="font-display font-semibold text-white text-lg">See the full breakdown</p>
              <p className="text-white/40 text-sm mt-0.5">Each project has bullet points, tech stack, and 3D previews.</p>
            </div>
            <GlowButton href="/projects" primary>Explore Projects →</GlowButton>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          ABOUT STRIP
      ══════════════════════════════════════ */}
      <section ref={aboutRef} className="relative overflow-hidden py-24">
        {/* Full-bleed accent background */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background:"linear-gradient(135deg, rgba(123,97,255,0.055) 0%, rgba(77,255,210,0.03) 50%, rgba(255,107,53,0.04) 100%)" }} />
        <div className="absolute inset-x-0 top-0 h-px" style={{ background:"linear-gradient(to right, transparent, rgba(123,97,255,0.4), transparent)" }} />
        <div className="absolute inset-x-0 bottom-0 h-px" style={{ background:"linear-gradient(to right, transparent, rgba(77,255,210,0.3), transparent)" }} />

        <div className="max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left */}
          <motion.div initial="hidden" animate={aboutInView ? "show" : "hidden"}
            variants={{ show:{ transition:{ staggerChildren:0.1 }}}} className="space-y-6">
            <motion.div variants={fadeUp()}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-px" style={{ background:"linear-gradient(to right, #7B61FF, transparent)" }} />
                <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color:"rgba(123,97,255,0.7)" }}>Who I Am</span>
              </div>
              <h2 className="font-display font-extrabold text-white leading-tight"
                style={{ fontSize:"clamp(32px,4.5vw,52px)" }}>
                CS student building<br /><span style={{ color:"#7B61FF" }}>things that matter</span>
              </h2>
            </motion.div>
            <motion.p variants={fadeUp(0.08)} className="text-white/50 leading-relaxed text-base">
              At SRM IST with a <span className="text-white/80 font-medium">CGPA of 8.28</span>. I specialize in iOS development, AI/ML systems, and embedded robotics — and I back it with <span className="text-white/80 font-medium">12+ certifications</span> from AWS, Cisco, Udemy, NPTEL, and MathWorks.
            </motion.p>

            {/* Inline stats row */}
            <motion.div variants={fadeUp(0.12)} className="grid grid-cols-3 gap-4">
              {[
                { n:"SRM IST", label:"University",  color:"#4DFFD2" },
                { n:"8.28",    label:"CGPA / 10",   color:"#7B61FF" },
                { n:"2027",    label:"Grad Year",   color:"#FF6B35" },
              ].map(s => (
                <div key={s.label} className="glass rounded-xl p-4 text-center">
                  <div className="font-display font-bold text-lg" style={{ color:s.color }}>{s.n}</div>
                  <div className="font-mono text-[10px] text-white/35 mt-1 tracking-wider uppercase">{s.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp(0.14)}>
              <GlowButton href="/about">Full Background →</GlowButton>
            </motion.div>
          </motion.div>

          {/* Right — skill tag cloud */}
          <motion.div initial={{ opacity:0, scale:0.9 }} animate={aboutInView ? { opacity:1, scale:1 } : {}}
            transition={{ duration:0.9, ease:[0.22,1,0.36,1] }}
            className="relative">
            <div className="grid grid-cols-3 gap-3">
              {[
                { s:"Swift",          c:"#FF6B35" }, { s:"Python",    c:"#4DFFD2" }, { s:"Java",       c:"#FF9900" },
                { s:"C / C++",        c:"#4DFFD2" }, { s:"AI / ML",   c:"#7B61FF" }, { s:"iOS Dev",    c:"#FF6B35" },
                { s:"Deep Learning",  c:"#7B61FF" }, { s:"AWS",       c:"#FF9900" }, { s:"SwiftUI",    c:"#FF6B35" },
                { s:"MATLAB",         c:"#E16F24" }, { s:"Robotics",  c:"#00979D" }, { s:"React",      c:"#61DAFB" },
                { s:"Full-Stack",     c:"#4DFFD2" }, { s:"DSA",       c:"#FFD93D" }, { s:"Networking", c:"#00BCEB" },
                { s:"Git",            c:"#F05032" }, { s:"Img Proc",  c:"#E16F24" }, { s:"Arduino",    c:"#00979D" },
              ].map((item, i) => (
                <motion.div key={item.s}
                  initial={{ opacity:0, scale:0.7 }} animate={aboutInView ? { opacity:1, scale:1 } : {}}
                  transition={{ duration:0.5, delay: 0.05 * i, ease:[0.22,1,0.36,1] }}
                  whileHover={{ scale:1.08, y:-2 }}
                  className="flex items-center justify-center py-2.5 px-3 rounded-xl text-center font-mono text-xs cursor-default transition-shadow duration-200"
                  style={{ background:`${item.c}10`, border:`1px solid ${item.c}25`, color:item.c }}>
                  {item.s}
                </motion.div>
              ))}
            </div>
            {/* Glow behind grid */}
            <div className="absolute -inset-8 rounded-3xl pointer-events-none -z-10"
              style={{ background:"radial-gradient(circle at center, rgba(123,97,255,0.06), transparent 70%)" }} />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CERTIFICATIONS PREVIEW
      ══════════════════════════════════════ */}
      <section ref={certsRef} className="section relative">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full pointer-events-none"
          style={{ background:"radial-gradient(circle, rgba(255,153,0,0.05), transparent 70%)" }} />

        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <motion.div initial="hidden" animate={certsInView ? "show" : "hidden"}
            variants={{ show:{ transition:{ staggerChildren:0.08 }}}}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <motion.div variants={fadeUp()}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-px" style={{ background:"linear-gradient(to right, #FF9900, transparent)" }} />
                  <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color:"rgba(255,153,0,0.7)" }}>Credentials</span>
                </div>
                <h2 className="font-display font-extrabold text-white leading-tight"
                  style={{ fontSize:"clamp(36px,5vw,60px)" }}>
                  Verified<br /><span className="grad-text">Certifications</span>
                </h2>
              </motion.div>
            </div>
            <motion.div variants={fadeUp(0.1)}>
              <GlowButton href="/certifications">View All 12 →</GlowButton>
            </motion.div>
          </motion.div>

          {/* Cert pills grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            {CERT_HIGHLIGHTS.map((c, i) => (
              <motion.div key={c.name}
                initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, margin:"-40px" }}
                transition={{ duration:0.6, ease:[0.22,1,0.36,1], delay: i * 0.05 }}
                whileHover={{ scale:1.02, y:-3 }}
                className="flex items-center gap-3 glass-strong rounded-xl px-4 py-3.5 transition-all duration-250"
                style={{ borderColor:`${c.color}20` }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                  style={{ background:`${c.color}12`, border:`1px solid ${c.color}25` }}>{c.icon}</div>
                <div>
                  <div className="text-white/80 text-sm font-medium leading-tight">{c.name}</div>
                  <div className="font-mono text-[10px] mt-0.5" style={{ color:c.color }}>Verified ✓</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* AWS highlight banner */}
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.7 }}
            className="glass-strong rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between"
            style={{ borderColor:"rgba(255,153,0,0.25)", background:"rgba(255,153,0,0.04)" }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background:"rgba(255,153,0,0.12)", border:"1px solid rgba(255,153,0,0.3)" }}>☁️</div>
              <div>
                <div className="font-display font-bold text-white text-lg">AWS Dual Certified</div>
                <div className="text-white/45 text-sm mt-0.5">Cloud Practitioner + AI Practitioner · Valid until Mar 2029</div>
              </div>
            </div>
            <a href="https://aws.amazon.com/verification" target="_blank" rel="noopener"
              className="flex-shrink-0 font-mono text-xs px-5 py-2.5 rounded-full transition-all duration-200"
              style={{ background:"rgba(255,153,0,0.12)", color:"#FF9900", border:"1px solid rgba(255,153,0,0.35)" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(255,153,0,0.25)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = ""}>
              Verify on AWS ↗
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BOTTOM CTA
      ══════════════════════════════════════ */}
      <section className="section relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background:"linear-gradient(to bottom, transparent, rgba(77,255,210,0.03), transparent)" }} />
        <div className="absolute inset-x-0 top-0 h-px"
          style={{ background:"linear-gradient(to right, transparent, rgba(77,255,210,0.2), rgba(123,97,255,0.2), transparent)" }} />

        <div className="max-w-4xl mx-auto px-5 md:px-8 text-center">
          <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.9, ease:[0.22,1,0.36,1] }}
            className="space-y-8">
            <div className="font-mono text-xs tracking-[0.35em] uppercase" style={{ color:"rgba(77,255,210,0.5)" }}>
              Open to opportunities
            </div>
            <h2 className="font-display font-extrabold text-white leading-tight"
              style={{ fontSize:"clamp(36px,6vw,72px)" }}>
              Let's build something<br />
              <span className="grad-text">remarkable</span>
            </h2>
            <p className="text-white/45 text-lg max-w-xl mx-auto leading-relaxed">
              Available for iOS internships, AI/ML research roles, full-stack projects, and collaborations. I reply within 24 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <GlowButton href="/contact" primary>Get in Touch →</GlowButton>
              <GlowButton href="/about">View Background</GlowButton>
              <a href="/KRISHAY_GAHLAUT_2.pdf" download
                className="inline-flex items-center gap-2 font-mono text-xs px-5 py-3 rounded-full border transition-all duration-200"
                style={{ color:"rgba(255,255,255,0.4)", borderColor:"rgba(255,255,255,0.08)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color="#4DFFD2"; (e.currentTarget as HTMLElement).style.borderColor="rgba(77,255,210,0.3)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.4)"; (e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.08)"; }}>
                ↓ Download Resume
              </a>
            </div>

            {/* Contact links */}
            <div className="flex justify-center gap-8 pt-2">
              {[
                { l:"kg3636@srmist.edu.in",     h:"mailto:kg3636@srmist.edu.in" },
                { l:"github.com/krishaygahlaut", h:"https://github.com/krishaygahlaut" },
                { l:"linkedin.com/in/krishaygahlaut", h:"https://linkedin.com/in/krishaygahlaut" },
              ].map(({ l, h }) => (
                <a key={l} href={h} target="_blank" rel="noopener"
                  className="font-mono text-xs text-white/25 hover:text-accent transition-colors duration-200 hidden sm:block">
                  {l}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
