
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { href: "/",               label: "Home"    },
  { href: "/about",          label: "About"   },
  { href: "/projects",       label: "Work"    },
  { href: "/certifications", label: "Certs"   },
  { href: "/contact",        label: "Contact" },
];

export default function Navbar() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => { setOpen(false); }, [path]);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass border-b border-white/[0.06] py-3" : "py-5"}`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
        <Link href="/" className="font-display font-extrabold text-lg tracking-tight">
          <span className="text-accent neon-text">K</span>
          <span className="text-white/80">G</span>
          <span className="text-accent font-mono text-xs ml-0.5">_</span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {LINKS.map(l => (
            <Link key={l.href} href={l.href}
              className={`text-sm font-medium transition-colors duration-200 relative ${path === l.href ? "text-accent" : "text-white/45 hover:text-white/80"}`}
            >
              {l.label}
              {path === l.href && (
                <motion.div layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                  style={{ boxShadow: "0 0 8px #4DFFD2" }}
                />
              )}
            </Link>
          ))}
          <a href="/KRISHAY_GAHLAUT_2.pdf" download
            className="glass text-accent text-sm px-5 py-2 rounded-full border border-accent/30 hover:border-accent/60 hover:bg-accent/8 transition-all duration-200">
            Resume ↗
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Menu">
          {[0,1,2].map(i => (
            <span key={i} className={`block h-px w-5 bg-white/70 transition-all duration-300 ${
              i===0&&open ? "rotate-45 translate-y-[7px]" : i===1&&open ? "opacity-0" : i===2&&open ? "-rotate-45 -translate-y-[7px]" : ""
            }`} />
          ))}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }} exit={{ opacity:0, height:0 }}
            className="md:hidden glass border-t border-white/[0.06]">
            <div className="max-w-7xl mx-auto px-5 py-5 flex flex-col gap-1">
              {LINKS.map(l => (
                <Link key={l.href} href={l.href}
                  className={`py-3 text-base font-medium border-b border-white/[0.04] ${path===l.href ? "text-accent" : "text-white/50"}`}>
                  {l.label}
                </Link>
              ))}
              <a href="/KRISHAY_GAHLAUT_2.pdf" download
                className="mt-3 text-center py-3 rounded-xl text-sm font-medium text-accent border border-accent/25 bg-accent/8">
                Download Resume ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
