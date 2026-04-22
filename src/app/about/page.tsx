
"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SKILLS, EDUCATION, VOLUNTEERING } from "@/lib/data";

const fadeUp = (delay=0) => ({ hidden:{y:40,opacity:0}, show:{y:0,opacity:1,transition:{duration:0.8,ease:[0.22,1,0.36,1],delay}} });

export default function About() {
  const ref1=useRef(null), ref2=useRef(null), ref3=useRef(null), ref4=useRef(null);
  const v1=useInView(ref1,{once:true,margin:"-80px"}), v2=useInView(ref2,{once:true,margin:"-80px"});
  const v3=useInView(ref3,{once:true,margin:"-80px"}), v4=useInView(ref4,{once:true,margin:"-80px"});

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-5 md:px-8 space-y-28">

        {/* ── INTRO ── */}
        <motion.div initial="hidden" animate="show" variants={{show:{transition:{staggerChildren:0.1}}}} className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <motion.div variants={fadeUp()}>
              <span className="tag mb-4 inline-block">About Me</span>
              <h1 className="font-display font-extrabold text-white leading-tight mt-4" style={{fontSize:"clamp(40px,6vw,68px)"}}>
                The person<br/><span className="grad-text">behind the code</span>
              </h1>
            </motion.div>
            <motion.p variants={fadeUp(0.1)} className="text-white/50 leading-relaxed text-lg">
              CS student at <span className="text-white/80 font-medium">SRM IST, Kattankulathur</span> (CGPA 8.28). I build iOS apps, AI-driven systems, and autonomous robots — always with a focus on clean architecture and practical impact.
            </motion.p>
            <motion.p variants={fadeUp(0.15)} className="text-white/50 leading-relaxed text-lg">
              AWS Certified in both <span className="text-accent font-medium">Cloud</span> and <span style={{color:"#7B61FF"}} className="font-medium">AI</span>. 12+ certifications spanning machine learning, deep learning, image processing, networking, DSA, and full-stack web development.
            </motion.p>
            <motion.div variants={fadeUp(0.2)} className="flex flex-wrap gap-2 pt-2">
              {["iOS Dev","AI/ML","Deep Learning","Robotics","AWS Cloud","Full-Stack","MATLAB","Networking"].map(t=>(
                <span key={t} className="tag">{t}</span>
              ))}
            </motion.div>
          </div>

          <motion.div variants={fadeUp(0.1)} className="grid grid-cols-2 gap-4">
            {[
              {n:"8.28",label:"CGPA at SRM IST",  icon:"🎓", color:"#4DFFD2"},
              {n:"5+",  label:"Real-world Projects",icon:"⚡", color:"#7B61FF"},
              {n:"12+", label:"Certifications",    icon:"🏆", color:"#FF6B35"},
              {n:"2027",label:"Graduation Year",   icon:"🚀", color:"#FFD93D"},
            ].map(c=>(
              <div key={c.n} className="glass-strong rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300">
                <div className="text-3xl mb-3">{c.icon}</div>
                <div className="font-display font-bold text-4xl" style={{color:c.color}}>{c.n}</div>
                <div className="text-white/40 text-sm mt-1">{c.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── EDUCATION ── */}
        <div ref={ref1}>
          <motion.div initial="hidden" animate={v1?"show":"hidden"} variants={{show:{transition:{staggerChildren:0.1}}}}>
            <motion.div variants={fadeUp()} className="mb-10">
              <span className="tag mb-3 inline-block">Education</span>
              <h2 className="font-display font-bold text-white mt-3" style={{fontSize:"clamp(32px,4vw,48px)"}}>Academic Journey</h2>
            </motion.div>
            <div className="space-y-4">
              {EDUCATION.map((e,i)=>(
                <motion.div key={e.school} variants={fadeUp(i*0.08)}
                  className="glass-strong rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 hover:scale-[1.01] transition-all duration-300"
                  style={{borderColor:`${e.color}18`}}>
                  <div className="flex-1">
                    <div className="font-display font-bold text-white text-xl">{e.school}</div>
                    <div className="text-white/55 mt-1">{e.degree}</div>
                    <div className="text-white/35 text-sm mt-1 font-mono">{e.location}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-display font-bold text-2xl" style={{color:e.color}}>{e.grade}</div>
                    <div className="font-mono text-xs text-white/35 mt-1">{e.year}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── SKILLS ── */}
        <div ref={ref2}>
          <motion.div initial="hidden" animate={v2?"show":"hidden"} variants={{show:{transition:{staggerChildren:0.08}}}}>
            <motion.div variants={fadeUp()} className="mb-10">
              <span className="tag mb-3 inline-block">Skills</span>
              <h2 className="font-display font-bold text-white mt-3" style={{fontSize:"clamp(32px,4vw,48px)"}}>Technical Stack</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SKILLS.map((group,i)=>(
                <motion.div key={group.category} variants={fadeUp(i*0.06)}
                  className="glass rounded-2xl p-6 hover:border-white/10 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 rounded-full" style={{background:group.color,boxShadow:`0 0 8px ${group.color}`}}/>
                    <span className="font-mono text-xs text-white/40 tracking-wider uppercase">{group.category}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map(s=>(
                      <span key={s} className="px-3 py-1.5 rounded-lg text-sm transition-all duration-200 hover:scale-105"
                        style={{background:`${group.color}10`, color:group.color, border:`1px solid ${group.color}25`}}>{s}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── VOLUNTEERING ── */}
        <div ref={ref3}>
          <motion.div initial="hidden" animate={v3?"show":"hidden"} variants={{show:{transition:{staggerChildren:0.1}}}}>
            <motion.div variants={fadeUp()} className="mb-10">
              <span className="tag mb-3 inline-block">Volunteering</span>
              <h2 className="font-display font-bold text-white mt-3" style={{fontSize:"clamp(32px,4vw,48px)"}}>Giving Back</h2>
            </motion.div>
            <motion.div variants={fadeUp(0.1)}
              className="glass-strong rounded-3xl p-8 md:p-10 relative overflow-hidden"
              style={{borderColor:"rgba(77,255,210,0.1)"}}>
              <div className="absolute top-0 left-0 w-1 h-full rounded-l-3xl" style={{background:"linear-gradient(to bottom,#4DFFD2,#7B61FF)"}}/>
              <div className="pl-2">
                <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
                  <div>
                    <div className="font-display font-bold text-white text-xl">{VOLUNTEERING.org}</div>
                    <div className="text-accent text-sm font-mono mt-1">{VOLUNTEERING.role}</div>
                  </div>
                  <a href={VOLUNTEERING.link} target="_blank" rel="noopener"
                    className="tag text-xs hover:bg-accent/15 transition-colors">News Coverage ↗</a>
                </div>
                <p className="text-white/55 leading-relaxed">{VOLUNTEERING.desc}</p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent"/>
                  <span className="font-mono text-xs text-white/35">{VOLUNTEERING.coverage}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── CTA ── */}
        <div ref={ref4}>
          <motion.div initial={{opacity:0,y:30}} animate={v4?{opacity:1,y:0}:{}} transition={{duration:0.8}}
            className="text-center space-y-6 py-8">
            <h3 className="font-display font-bold text-white" style={{fontSize:"clamp(28px,4vw,44px)"}}>Want to work together?</h3>
            <p className="text-white/45 max-w-md mx-auto">Open to internships, collaborations, and interesting problems.</p>
            <a href="/contact" className="inline-block font-display font-bold px-8 py-4 rounded-full text-void transition-all duration-300"
              style={{background:"#4DFFD2"}}
              onMouseEnter={e=>(e.currentTarget as HTMLElement).style.boxShadow="0 0 40px rgba(77,255,210,0.45)"}
              onMouseLeave={e=>(e.currentTarget as HTMLElement).style.boxShadow=""}>
              Get in Touch
            </a>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
