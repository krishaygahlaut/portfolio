
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-mono text-xs text-white/25 tracking-wider">
          © 2025 Krishay Gahlaut · Built with Next.js + R3F
        </div>
        <div className="flex items-center gap-6">
          {[
            { label: "GitHub",   href: "https://github.com/krishaygahlaut" },
            { label: "LinkedIn", href: "https://linkedin.com/in/krishaygahlaut" },
            { label: "Email",    href: "mailto:kg3636@srmist.edu.in" },
          ].map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener"
              className="font-mono text-xs text-white/25 hover:text-accent transition-colors duration-200">
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
