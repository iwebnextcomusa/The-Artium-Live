import React from "react";
import { ArrowRight, MapPin, Sparkles, Star } from "lucide-react";
// Import our custom generated asset reflecting luxury Georgia atrium style
import heroBg from "../assets/images/venue_hero_bg_1780684781429.png";

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-28 pb-16"
    >
      {/* Underlying high-res custom generated glass-atrium render backdrop */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="The Atrium Live Venue Space"
          className="w-full h-full object-cover scale-102 transform duration-[10s] ease-out select-none"
          referrerPolicy="no-referrer"
        />
        {/* Multilayer linear and radial gradient shields for premium contrast and absolute readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-space-950/70 via-space-950/85 to-space-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-space-950 via-space-950/40 to-space-950/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,135,43,0.06)_0%,transparent_70%)]" />
      </div>

      {/* Atmospheric particles */}
      <div className="absolute top-[25%] left-[25%] w-[180px] h-[180px] rounded-full bg-gold-500/10 filter blur-[70px] mix-blend-screen pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[30%] right-[20%] w-[250px] h-[250px] rounded-full bg-gold-400/5 filter blur-[90px] mix-blend-screen pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Content Area */}
          <div className="lg:col-span-8 flex flex-col gap-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-500/10 border border-gold-500/20 text-gold-500 text-xs uppercase tracking-[0.4em] font-bold italic w-fit">
              <Sparkles className="w-3 text-gold-500" />
              Luxury Event Venue
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-tight tracking-tight uppercase">
              Where <span className="italic font-light text-gold-500">extraordinary</span> <br className="hidden sm:inline" />
              moments take <br className="hidden sm:inline" />
              center stage
            </h1>

            <p className="text-base sm:text-md text-white/70 max-w-2xl font-sans font-light leading-relaxed">
              Experience the pinnacle of hospitality at <span className="text-gold-200">The Atrium Live</span>. Blending soaring glass roofs, ultra-fidelity acoustics, and majestic botanical grids, our contemporary space transforms to meet your vision.
            </p>

            {/* Event metrics overlay */}
            <div className="grid grid-cols-3 gap-8 pt-6 pb-6 my-2 border-t border-b border-white/10 max-w-xl">
              <div>
                <p className="text-2xl sm:text-3xl font-serif text-gold-500">12k+</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mt-1">Sq Feet</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-serif text-gold-500">500+</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mt-1">Capacity</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-serif text-gold-500">5.0</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mt-1">Client Rating</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-2">
              <button
                onClick={() => onNavigate("contact")}
                className="px-8 py-4 bg-gold-500 text-black text-xs uppercase tracking-[0.2em] font-bold hover:bg-gold-600 active:scale-98 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
              >
                Schedule Inquiry
                <ArrowRight className="w-3.5 h-3.5 text-black group-hover:translate-x-1.5 transition-transform" />
              </button>
              
              <button
                onClick={() => onNavigate("3d-experience")}
                className="px-8 py-4 border border-white/20 bg-transparent text-white text-xs uppercase tracking-[0.2em] hover:bg-white/5 active:scale-98 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                View Catalog
              </button>
            </div>
          </div>

          {/* Quick-Access Floating Banner / Overlay Card */}
          <div className="lg:col-span-4 flex items-center justify-center w-full">
            <div className="glass-panel w-full p-6 sm:p-8 flex flex-col gap-5 shadow-2xl relative border-white/10">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gold-500/5 rounded-bl-full pointer-events-none filter blur-md" />
              
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 text-gold-500 fill-gold-500" />
                ))}
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059] ml-2">Atlanta's Favorite</span>
              </div>

              <blockquote className="text-sm italic text-stone-300 font-serif leading-relaxed">
                "The Atrium Live hosted our wedding of 320 people last autumn. The panoramic skylight ceiling at dusk left our guests in absolute awe. Terry and his event crew were majestic."
              </blockquote>

              <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                <div>
                  <h4 className="font-serif font-medium text-xs text-white uppercase tracking-wider">Cassandra & Marcus</h4>
                  <p className="text-[10px] text-white/40 font-mono mt-0.5">Married October 2025</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gold-500 font-semibold uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                  Atlanta, GA
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative vertical bounds edge border and scroll hint and location indicator */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce cursor-pointer" onClick={() => onNavigate("services")}>
        <span className="text-[9px] text-gold-400 font-mono uppercase tracking-widest">Explore Venue</span>
        <div className="w-1.5 h-8 bg-gradient-to-b from-gold-500 to-transparent rounded-full" />
      </div>
    </section>
  );
}
