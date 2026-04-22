import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import CustomCursor from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  metadataBase: new URL("https://krishaygahlaut.vercel.app"),
  title: {
    default: "Krishay Gahlaut — iOS & AI Developer",
    template: "%s | Krishay Gahlaut",
  },
  description:
    "CS student at SRM IST building scalable iOS apps, AI systems, and embedded robotics. AWS Certified Cloud & AI Practitioner. CGPA 8.28/10. Graduating 2027.",
  keywords: [
    "Krishay Gahlaut","iOS Developer","Swift","SwiftUI","AI","Machine Learning",
    "Deep Learning","AWS","Cloud","Portfolio","SRM IST","Arduino","Robotics",
    "Full Stack","React","Python","DSA","MATLAB",
  ],
  authors: [{ name: "Krishay Gahlaut", url: "https://krishaygahlaut.vercel.app" }],
  openGraph: {
    title: "Krishay Gahlaut — iOS & AI Developer",
    description: "Building things that matter. iOS · AI · Robotics · AWS.",
    type: "website",
    url: "https://krishaygahlaut.vercel.app",
    siteName: "Krishay Gahlaut Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Krishay Gahlaut — iOS & AI Developer",
    description: "CS student building iOS apps, AI systems & robotics. AWS Certified.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <CustomCursor />
        <Navbar />
        <main className="page-enter min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
