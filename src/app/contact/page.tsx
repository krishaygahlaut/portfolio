
"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const CONTACTS = [
  { icon:"📧", label:"Email",    val:"kg3636@srmist.edu.in",                     href:"mailto:kg3636@srmist.edu.in",                    color:"#4DFFD2" },
  { icon:"💼", label:"LinkedIn", val:"linkedin.com/in/krishaygahlaut",            href:"https://linkedin.com/in/krishaygahlaut",         color:"#0A66C2" },
  { icon:"⚡", label:"GitHub",   val:"github.com/krishaygahlaut",                 href:"https://github.com/krishaygahlaut",              color:"#7B61FF" },
  { icon:"📱", label:"Phone",    val:"+91 9639649999",                            href:"tel:+919639649999",                              color:"#FF6B35" },
];

const OPEN_TO = [
  "iOS Development Internships",
  "AI/ML Research Roles",
  "Full-Stack Web Projects",
  "Open-Source Contributions",
  "Hackathons & Competitions",
  "Freelance Projects",
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:kg3636@srmist.edu.in?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Hi Krishay,\n\n${msg}\n\nFrom: ${name}\nEmail: ${email}`)}`;
    window.location.href = mailto;
    setSent(true);
  };

  const inputStyle = {
    background:"rgba(255,255,255,0.03)",
    border:"1px solid rgba(255,255,255,0.08)",
    borderRadius:12,
    padding:"14px 16px",
    color:"#e6e6f0",
    fontSize:15,
    width:"100%",
    outline:"none",
    fontFamily:"'DM Sans',sans-serif",
    transition:"border-color 0.2s",
  };

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <motion.div initial={{y:40,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.8}} className="mb-14">
          <span className="tag mb-4 inline-block">Get in Touch</span>
          <h1 className="font-display font-extrabold text-white leading-tight mt-4" style={{fontSize:"clamp(40px,6vw,68px)"}}>
            Let's build<br/><span className="grad-text">something</span>
          </h1>
          <p className="text-white/45 mt-4 max-w-lg text-lg">Open to internships, collaborations, research roles, and cool ideas. I reply within 24 hours.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left — form */}
          <motion.div initial={{x:-40,opacity:0}} animate={{x:0,opacity:1}} transition={{duration:0.8,delay:0.1}}>
            {sent ? (
              <div className="glass-strong rounded-3xl p-10 text-center space-y-4">
                <div className="text-5xl">✉️</div>
                <div className="font-display font-bold text-white text-2xl">Message sent!</div>
                <p className="text-white/45">Your mail client should have opened. Looking forward to connecting.</p>
                <button onClick={()=>setSent(false)} className="tag hover:bg-accent/12 transition-colors cursor-pointer">Send another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-strong rounded-3xl p-7 md:p-9 space-y-5">
                <h2 className="font-display font-bold text-white text-xl mb-2">Send a message</h2>
                <div>
                  <label className="block font-mono text-xs text-white/35 mb-2 tracking-wider uppercase">Name</label>
                  <input value={name} onChange={e=>setName(e.target.value)} required
                    placeholder="Your name" style={inputStyle}
                    onFocus={e=>(e.target as HTMLElement).style.borderColor="rgba(77,255,210,0.4)"}
                    onBlur={e=>(e.target as HTMLElement).style.borderColor="rgba(255,255,255,0.08)"}/>
                </div>
                <div>
                  <label className="block font-mono text-xs text-white/35 mb-2 tracking-wider uppercase">Email</label>
                  <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required
                    placeholder="your@email.com" style={inputStyle}
                    onFocus={e=>(e.target as HTMLElement).style.borderColor="rgba(77,255,210,0.4)"}
                    onBlur={e=>(e.target as HTMLElement).style.borderColor="rgba(255,255,255,0.08)"}/>
                </div>
                <div>
                  <label className="block font-mono text-xs text-white/35 mb-2 tracking-wider uppercase">Message</label>
                  <textarea value={msg} onChange={e=>setMsg(e.target.value)} required rows={5}
                    placeholder="What's on your mind?" style={{...inputStyle,resize:"vertical"}}
                    onFocus={e=>(e.target as HTMLElement).style.borderColor="rgba(77,255,210,0.4)"}
                    onBlur={e=>(e.target as HTMLElement).style.borderColor="rgba(255,255,255,0.08)"}/>
                </div>
                <button type="submit"
                  className="w-full font-display font-bold py-4 rounded-2xl text-void transition-all duration-300"
                  style={{background:"#4DFFD2"}}
                  onMouseEnter={e=>(e.currentTarget as HTMLElement).style.boxShadow="0 0 40px rgba(77,255,210,0.4)"}
                  onMouseLeave={e=>(e.currentTarget as HTMLElement).style.boxShadow=""}>
                  Send Message →
                </button>
              </form>
            )}
          </motion.div>

          {/* Right — contact cards + open to */}
          <motion.div initial={{x:40,opacity:0}} animate={{x:0,opacity:1}} transition={{duration:0.8,delay:0.15}} className="space-y-5">
            {/* Contact links */}
            <div className="space-y-3">
              {CONTACTS.map((c,i)=>(
                <motion.a key={c.label} href={c.href} target={c.href.startsWith("http")?"_blank":undefined} rel="noopener"
                  initial={{x:20,opacity:0}} animate={{x:0,opacity:1}} transition={{delay:0.2+i*0.08,duration:0.6}}
                  className="glass-strong rounded-2xl p-5 flex items-center gap-4 hover:scale-[1.02] transition-all duration-300 block"
                  style={{borderColor:`${c.color}18`}}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                    style={{background:`${c.color}12`,border:`1px solid ${c.color}25`}}>{c.icon}</div>
                  <div className="min-w-0">
                    <div className="font-mono text-xs text-white/35">{c.label}</div>
                    <div className="text-white/75 text-sm font-medium truncate mt-0.5">{c.val}</div>
                  </div>
                  <div className="ml-auto text-white/25 text-sm">↗</div>
                </motion.a>
              ))}
            </div>

            {/* Open to */}
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.5,duration:0.7}}
              className="glass-strong rounded-2xl p-6" style={{borderColor:"rgba(77,255,210,0.1)"}}>
              <div className="font-display font-bold text-white mb-4">Open to</div>
              <div className="space-y-2.5">
                {OPEN_TO.map(item=>(
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0"/>
                    <span className="text-white/55 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Resume download */}
            <motion.a initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.6,duration:0.7}}
              href="/KRISHAY_GAHLAUT_2.pdf" download
              className="glass-strong rounded-2xl p-6 flex items-center gap-4 hover:scale-[1.02] transition-all duration-300 block"
              style={{borderColor:"rgba(255,107,53,0.18)"}}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                style={{background:"rgba(255,107,53,0.12)",border:"1px solid rgba(255,107,53,0.25)"}}>📄</div>
              <div>
                <div className="font-display font-semibold text-white">Download Resume</div>
                <div className="text-white/40 text-sm mt-0.5">PDF · Updated 2025</div>
              </div>
              <div className="ml-auto font-mono text-xs" style={{color:"#FF6B35"}}>↓</div>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
