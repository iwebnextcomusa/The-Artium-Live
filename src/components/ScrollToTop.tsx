import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <button
      id="scroll-to-top-button"
      onClick={scrollToTop}
      className={`fixed bottom-6 left-6 z-90 w-11 h-11 rounded-none bg-black border border-white/10 hover:border-[#C5A059] hover:bg-[#C5A059] text-[#C5A059] hover:text-black flex items-center justify-center transition-all duration-300 shadow-2xl active:scale-95 cursor-pointer ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-label="Scroll back to top"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}
