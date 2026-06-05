import React from "react";
import { Sparkles, Phone, Mail, MapPin } from "lucide-react";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-space-950 border-t border-white/10 pt-16 pb-8 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[500px] h-[150px] rounded-full bg-gold-600/5 filter blur-[60px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center gap-8 text-center">
          
          {/* Brand Logo in Footer */}
          <div
            onClick={() => onNavigate("hero")}
            className="flex items-center gap-2.5 cursor-pointer group justify-center"
          >
            <div className="w-9 h-9 rounded-none bg-black border border-white/10 p-[1px]">
              <div className="w-full h-full bg-[#0c0c0c] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#C5A059] group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <span className="font-serif text-lg tracking-[0.2em] uppercase text-white">
              THE ATRIUM <span className="font-mono font-light text-xs text-[#C5A059] ml-0.5">LIVE</span>
            </span>
          </div>

          {/* Quick links list */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {[
              { id: "hero", label: "Home" },
              { id: "services", label: "Services" },
              { id: "gallery", label: "Gallery" },
              { id: "3d-experience", label: "3D Tour" },
              { id: "about", label: "About" },
              { id: "testimonials", label: "Reviews" },
              { id: "contact", label: "Booking" },
            ].map((lnk) => (
              <button
                key={lnk.id}
                onClick={() => onNavigate(lnk.id)}
                className="text-xs tracking-widest uppercase text-stone-400 hover:text-white transition-colors cursor-pointer font-serif"
              >
                {lnk.label}
              </button>
            ))}
          </div>

          {/* Core coordinate information row */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 border-t border-b border-white/10 py-6 w-full max-w-3xl">
            <a href="tel:678-409-9635" className="flex items-center gap-2 text-xs text-[#C5A059] hover:text-white transition-all">
              <Phone className="w-4 h-4 text-gold-500" />
              <span className="font-mono tracking-wider font-semibold">678-409-9635</span>
            </a>
            
            <a href="mailto:terry@brantland.com" className="flex items-center gap-2 text-xs text-[#C5A059] hover:text-white transition-all">
              <Mail className="w-4 h-4 text-gold-500" />
              <span className="font-sans tracking-wide font-medium">terry@brantland.com</span>
            </a>

            <div className="flex items-center gap-2 text-xs text-stone-500">
              <MapPin className="w-4 h-4 text-gold-500" />
              <span>theatriumlive.us • Atlanta Region, GA</span>
            </div>
          </div>

          {/* Center Centered brand and copyright with exact Developer credit links */}
          <div className="w-full flex flex-col md:flex-row md:justify-between items-center pt-4 border-t border-white/10 gap-4">
            <p className="text-[11px] text-stone-650 font-mono tracking-wider">
              &copy; {currentYear} The Atrium Live. All Rights Reserved. Brantland Developments.
            </p>
            <p className="text-xs text-stone-400 font-sans tracking-wider uppercase">
              Developed by <a href="https://iwebnext.com" target="_blank" rel="noopener noreferrer" className="text-[#C5A059] hover:text-white hover:underline hover:scale-105 transition-all duration-300 font-semibold px-1">iWebNext</a>
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
