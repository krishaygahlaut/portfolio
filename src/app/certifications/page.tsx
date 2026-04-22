
"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CERTIFICATIONS } from "@/lib/data";

const TIERS = [
  { id:"all",          label:"All"        },
  { id:"professional", label:"Industry"   },
  { id:"course",       label:"Courses"    },
  { id:"academic",     label:"Academic"   },
];

function CertCard({ cert, index }: { cert:typeof CERTIFICATIONS[0]; index:number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-60px" });
  return (
    <motion.div ref={ref}
      initial={{y:40,opacity:0}} animate={inView?{y:0,opacity:1}:{}}
      transition={{duration:0.7,ease:[0.22,1,0.36,1],delay:(index%6)*0.07}}
      className="glass-strong rounded-2xl p-6 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4"
      style={{borderColor:`${cert.color}18`}}>
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
          style={{background:`${cert.color}12`,border:`1px solid ${cert.color}25`}}>
          {cert.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-mono text-xs text-white/30 mb-1">{cert.org}</div>
          <h3 className="font-display font-semibold text-white leading-tight text-base">{cert.name}</h3>
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span className="font-mono text-xs" style={{color:cert.color}}>{cert.date}</span>
        <div className="flex items-center gap-2">
          {cert.expiry && <span className="font-mono text-xs text-white/25">exp {cert.expiry}</span>}
          {cert.hours  && <span className="tag text-xs">{cert.hours}</span>}
          {cert.score  && <span className="font-mono text-xs text-white/40">Score: {cert.score}</span>}
        </div>
      </div>

      {/* ID + Verify */}
      {cert.id && (
        <div className="pt-2 border-t border-white/[0.05] flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] text-white/20 truncate">{cert.id.slice(0,24)}…</span>
          {cert.verifyUrl !== "#" && (
            <a href={cert.verifyUrl} target="_blank" rel="noopener"
              className="flex-shrink-0 font-mono text-[10px] transition-colors"
              style={{color:cert.color}}>
              Verify ↗
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default function Certifications() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? CERTIFICATIONS : CERTIFICATIONS.filter(c => c.tier === filter);

  // Group stats
  const stats = [
    { n:"12+", label:"Total Certs",        color:"#4DFFD2" },
    { n:"2",   label:"AWS Professional",   color:"#FF9900" },
    { n:"4",   label:"Udemy Courses",      color:"#A435F0" },
    { n:"4",   label:"MathWorks / MATLAB", color:"#E16F24" },
  ];

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <motion.div initial={{y:40,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.8}} className="mb-12">
          <span className="tag mb-4 inline-block">Credentials</span>
          <h1 className="font-display font-extrabold text-white leading-tight mt-4" style={{fontSize:"clamp(40px,6vw,68px)"}}>
            Verified<br/><span className="grad-text">Certifications</span>
          </h1>
          <p className="text-white/45 mt-4 max-w-lg text-lg">12+ certifications across cloud, AI, iOS, ML, networking, and full-stack development.</p>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.7}}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map(s=>(
            <div key={s.label} className="glass rounded-2xl p-5 text-center">
              <div className="font-display font-bold text-3xl" style={{color:s.color}}>{s.n}</div>
              <div className="text-white/40 text-xs font-mono mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Filter tabs */}
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.3}}
          className="flex flex-wrap gap-2 mb-10">
          {TIERS.map(t=>(
            <button key={t.id} onClick={()=>setFilter(t.id)}
              className="px-5 py-2 rounded-full font-mono text-sm transition-all duration-200"
              style={filter===t.id
                ? {background:"rgba(77,255,210,0.12)",color:"#4DFFD2",border:"1px solid rgba(77,255,210,0.4)"}
                : {background:"rgba(255,255,255,0.03)",color:"rgba(255,255,255,0.4)",border:"1px solid rgba(255,255,255,0.07)"}
              }>
              {t.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((cert,i)=><CertCard key={cert.name+cert.date} cert={cert} index={i}/>)}
        </div>

        {/* AWS verification callout */}
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}
          className="mt-12 glass-strong rounded-2xl p-7 flex flex-col md:flex-row items-start md:items-center gap-5 justify-between"
          style={{borderColor:"rgba(255,153,0,0.2)"}}>
          <div>
            <div className="text-2xl mb-2">☁️</div>
            <div className="font-display font-bold text-white text-xl">AWS Certifications — Active & Verified</div>
            <div className="text-white/45 text-sm mt-1">Both AWS certifications valid until March 2029. Verify directly on AWS.</div>
          </div>
          <a href="https://aws.amazon.com/verification" target="_blank" rel="noopener"
            className="flex-shrink-0 px-6 py-3 rounded-full font-mono text-sm transition-all duration-200"
            style={{background:"rgba(255,153,0,0.12)",color:"#FF9900",border:"1px solid rgba(255,153,0,0.35)"}}>
            Verify on AWS ↗
          </a>
        </motion.div>
      </div>
    </div>
  );
}
