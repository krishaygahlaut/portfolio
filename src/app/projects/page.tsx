
"use client";
import dynamic from "next/dynamic";
import { Suspense, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { PROJECTS } from "@/lib/data";

const PhoneMockup = dynamic(()=>import("@/components/3d/PhoneMockup"),{ssr:false});
const NeuralNet   = dynamic(()=>import("@/components/3d/NeuralNet"),  {ssr:false});
const RobotArm    = dynamic(()=>import("@/components/3d/RobotArm"),   {ssr:false});

function Scene3D({ scene, accentColor }: { scene:string; accentColor:string }) {
  return (
    <Canvas camera={{position:[0,0,4],fov:50}} dpr={[1,1.5]} performance={{min:0.5}} gl={{alpha:true,antialias:false}}>
      <Suspense fallback={null}>
        {scene==="phone"  && <PhoneMockup accentColor={accentColor}/>}
        {scene==="neural" && <NeuralNet />}
        {scene==="robot"  && <RobotArm  />}
      </Suspense>
    </Canvas>
  );
}

function ProjectCard({ project, index }: { project:typeof PROJECTS[0]; index:number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });
  const even = index % 2 === 0;
  return (
    <motion.div ref={ref}
      initial={{y:60,opacity:0}} animate={inView?{y:0,opacity:1}:{}}
      transition={{duration:0.8,ease:[0.22,1,0.36,1],delay:0.05}}
      className="glass-strong rounded-3xl overflow-hidden hover:scale-[1.005] transition-all duration-500"
      style={{borderColor:`${project.accentColor}14`}}>
      <div className={`grid md:grid-cols-2 ${even?"":"md:[direction:rtl]"}`}>
        {/* 3D Preview */}
        <div className={`h-64 md:h-auto min-h-[280px] relative ${even?"":"md:[direction:ltr]"}`}
          style={{background:`radial-gradient(circle at center,${project.accentColor}09,transparent 70%)`}}>
          <Scene3D scene={project.scene} accentColor={project.accentColor}/>
          <div className={`absolute inset-0 pointer-events-none hidden md:block bg-gradient-to-${even?"r":"l"} from-transparent`}
            style={{backgroundImage:`linear-gradient(to ${even?"right":"left"}, transparent 60%, #06070e)`}}/>
        </div>

        {/* Content */}
        <div className={`p-7 md:p-10 flex flex-col justify-between gap-6 ${even?"":"md:[direction:ltr]"}`}>
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="font-mono text-xs text-white/30">{project.date}</span>
                <h2 className="font-display font-bold text-2xl text-white mt-1 group-hover:text-accent transition-colors">{project.title}</h2>
                <p className="text-white/40 text-sm mt-0.5">{project.subtitle}</p>
              </div>
              <a href={project.link} target="_blank" rel="noopener"
                className="flex-shrink-0 w-9 h-9 rounded-full glass flex items-center justify-center border border-white/10 hover:border-accent/40 hover:bg-accent/8 transition-all">
                <svg className="w-3.5 h-3.5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">{project.desc}</p>
            <ul className="space-y-1.5">
              {project.bullets.map(b=>(
                <li key={b} className="flex items-start gap-2 text-sm text-white/40">
                  <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{background:project.accentColor}}/>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map(t=>(
              <span key={t} className="px-2.5 py-1 rounded text-xs font-mono"
                style={{background:`${project.accentColor}10`,color:project.accentColor,border:`1px solid ${project.accentColor}28`}}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <motion.div initial={{y:40,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.8,ease:[0.22,1,0.36,1]}} className="mb-14">
          <span className="tag mb-4 inline-block">Portfolio</span>
          <h1 className="font-display font-extrabold text-white leading-tight mt-4" style={{fontSize:"clamp(40px,6vw,68px)"}}>
            Things I've<br/><span className="grad-text">built</span>
          </h1>
          <p className="text-white/45 mt-4 max-w-lg text-lg">Real-world projects spanning iOS development, AI algorithms, and embedded robotics.</p>
        </motion.div>

        <div className="space-y-6">
          {PROJECTS.map((p,i)=><ProjectCard key={p.id} project={p} index={i}/>)}
        </div>
      </div>
    </div>
  );
}
