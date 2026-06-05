import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import Interactive3D from "./components/Interactive3D";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");

  // Track scroll section intersection is correct to highlight the active menu elements
  useEffect(() => {
    const sections = [
      "hero",
      "services",
      "gallery",
      "3d-experience",
      "about",
      "testimonials",
      "contact",
    ];

    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -40% 0px", // Trigger when section occupies viewable center
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      // Smooth travel matching offsets
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-space-950 text-gold-50/90 font-sans min-h-screen relative selection:bg-gold-500/30 selection:text-white">
      {/* Background ambient lighting effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[5%] left-[5%] w-[40vw] h-[40vw] rounded-full bg-gold-600/3 filter blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-[10%] right-[5%] w-[50vw] h-[50vw] rounded-full bg-gold-500/2 filter blur-[180px] mix-blend-screen" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation Header */}
        <Header activeSection={activeSection} onNavigate={handleNavigate} />

        {/* Master contents layout sections */}
        <main className="flex-grow">
          {/* Hero space */}
          <Hero onNavigate={handleNavigate} />

          {/* Services specifications */}
          <Services onNavigate={handleNavigate} />

          {/* Galleries portfolio */}
          <Gallery />

          {/* Interactive virtual 3D tour built on Three.js */}
          <Interactive3D />

          {/* About story panel */}
          <About />

          {/* Testimonial slider reviews */}
          <Testimonials />

          {/* Booking Request Contact card */}
          <Contact />
        </main>

        {/* Floating elements */}
        <Chatbot />
        <ScrollToTop />

        {/* Footer info brand */}
        <Footer onNavigate={handleNavigate} />
      </div>
    </div>
  );
}
