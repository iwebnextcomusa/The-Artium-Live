import React, { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const reviews = [
    {
      id: "rev1",
      name: "Olivia & Nicholas Montgomery",
      role: "Bridal Couple",
      event: "Autumn Wedding Reception",
      text: "Our wedding was an absolute masterpiece. Genuinely, the architectural skylight dome at sunset is spectacular. The glass ceiling reflected the cascading fairy strings, making the whole night spark like a diamond dream. Terry went out of his way to arrange backstage changing spaces for our double VIP families.",
      rating: 5,
      date: "September 2025",
    },
    {
      id: "rev2",
      name: "Marcus Vance",
      role: "VP of Product Development",
      event: "NextGen Tech Keynote Gala",
      text: "The stage geometry at The Atrium Live is stellar. We broadcasted our live 4k virtual streaming presentation without a glitch, thanks to the fiber integration and sound engineering isolation bounds. Highly aesthetic, highly professional, fast speed network, and phenomenal VIP mezzanine lounges.",
      rating: 5,
      date: "November 2025",
    },
    {
      id: "rev3",
      name: "Seraphina Sterling",
      role: "Lead Orchestra Director",
      event: "Acoustic Springs Performance Showcase",
      text: "The L-Acoustics distribution map at the venue is simply phenomenal. The reverberations off the vertical biological forest grids create a warm, crisp tone. The acoustic buffer behaves beautifully. We registered 500 visitors and scheduling ran flawlessly.",
      rating: 5,
      date: "January 2026",
    },
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : reviews.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < reviews.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="testimonials" className="py-24 bg-space-950 relative overflow-hidden">
      <div className="absolute top-[20%] left-[10%] w-[330px] h-[330px] rounded-full bg-gold-600/5 filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-gold-500/5 filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-fade-in-up">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-500/10 border border-gold-500/20 text-[#C5A059] text-xs uppercase tracking-[0.4em] font-bold italic mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            Accolades & Success Stories
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-wider uppercase">
            Sovereign <span className="italic font-light text-gold-500">Trust</span>
          </h2>
          <p className="mt-4 text-sm text-white/50 leading-relaxed font-sans font-light">
            Hear first-hand from the creative directors, brides, and corporate planners who orchestrated milestone memories with us.
          </p>
        </div>

        {/* Testimonial Active Display Card Container */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Slider Panel */}
          <div className="lg:col-span-8 flex flex-col justify-between glass-panel p-6 sm:p-10 rounded-none relative shadow-2xl border-white/10 bg-[#0c0c0c]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-bl-full pointer-events-none filter blur-xl" />
            
            <div className="flex flex-col gap-6">
              {/* Quote marks and ratings */}
              <div className="flex justify-between items-center">
                <Quote className="w-10 h-10 text-gold-500/10 shrink-0" />
                <div className="flex items-center gap-1">
                  {Array.from({ length: reviews[activeIndex].rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold-500 fill-[#C5A059]" />
                  ))}
                </div>
              </div>
              
              {/* Quotes text body */}
              <blockquote className="text-base sm:text-lg italic text-white/80 font-serif leading-relaxed text-left">
                "{reviews[activeIndex].text}"
              </blockquote>
            </div>

            {/* Author details with date */}
            <div className="border-t border-white/10 pt-6 mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-left animate-fade-in">
                <h4 className="font-serif font-semibold text-sm sm:text-base text-white uppercase tracking-wider">
                  {reviews[activeIndex].name}
                </h4>
                <p className="text-xs text-[#C5A059] mt-1 font-mono">
                  {reviews[activeIndex].role} · <span className="text-stone-400">{reviews[activeIndex].event}</span>
                </p>
              </div>
              <span className="text-[10px] font-mono text-gold-500 bg-black px-3 py-1.5 border border-white/10 rounded-none">
                {reviews[activeIndex].date}
              </span>
            </div>
          </div>

          {/* Controls and Indicator Panel */}
          <div className="lg:col-span-4 flex lg:flex-col justify-between items-center lg:items-stretch glass-panel-light p-6 rounded-none border border-white/10 bg-[#0c0c0c] gap-6">
            <div className="flex flex-col gap-2 text-left hidden lg:block">
              <h3 className="font-serif text-xs text-[#C5A059] uppercase tracking-widest text-left">
                Story Indices
              </h3>
              <p className="text-white/40 text-[11px] leading-relaxed text-left">
                Flip through historical reviews to check detailed ratings.
              </p>
            </div>

            {/* Micro dot indicators */}
            <div className="flex lg:flex-col gap-2 items-center w-full">
              {reviews.map((rev, index) => (
                <button
                  key={rev.id}
                  id={`rev-indicator-${rev.id}`}
                  onClick={() => setActiveIndex(index)}
                  className={`border transition-all flex items-center justify-between text-left outline-none cursor-pointer rounded-none text-[10px] font-mono tracking-widest uppercase p-2.5 w-full ${
                    activeIndex === index
                      ? "bg-[#C5A059] border-[#C5A059] text-black font-bold"
                      : "bg-black border-white/10 text-white/60 hover:text-gold-500 hover:border-white/30"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <span>Story 0{index + 1}</span>
                  {activeIndex === index && <span>●</span>}
                </button>
              ))}
            </div>

            {/* Slider triggers */}
            <div className="flex gap-2 w-full">
              <button
                onClick={handlePrev}
                className="flex-1 py-3 border border-white/10 bg-[#050505] text-[#C5A059] hover:bg-[#C5A059] hover:text-black hover:border-[#C5A059] flex items-center justify-center transition-all cursor-pointer rounded-none animate-none"
                aria-label="Previous Review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="flex-1 py-3 border border-white/10 bg-[#050505] text-[#C5A059] hover:bg-[#C5A059] hover:text-black hover:border-[#C5A059] flex items-center justify-center transition-all cursor-pointer rounded-none animate-none"
                aria-label="Next Review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
