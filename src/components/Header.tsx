import React, { useState, useEffect } from "react";
import { Menu, X, Phone, Calendar, Sparkles } from "lucide-react";

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "services", label: "Events & Services" },
    { id: "gallery", label: "Gallery" },
    { id: "3d-experience", label: "3D Virtual Venue" },
    { id: "about", label: "About" },
    { id: "testimonials", label: "Success Stories" },
    { id: "contact", label: "Contact & Booking" },
  ];

  const handleItemClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "py-3 glass-panel-heavy shadow-2xl shadow-black/40 border-b border-gold-500/20"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <div
            id="logo-wrap"
            onClick={() => handleItemClick("hero")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 border-2 border-gold-500 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <span className="text-gold-500 font-bold text-xs italic">A</span>
            </div>
            <div>
              <span className="font-serif text-lg tracking-widest uppercase text-white group-hover:text-gold-500 transition-colors">
                The Atrium Live
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleItemClick(item.id)}
                className={`text-[11px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 relative py-2 ${
                  activeSection === item.id
                    ? "text-gold-500"
                    : "text-white/70 hover:text-gold-500"
                }`}
              >
                {item.id === "hero" ? "Home" : item.id === "services" ? "Events" : item.id === "3d-experience" ? "3D Tour" : item.id === "testimonials" ? "Reviews" : item.label}
              </button>
            ))}
          </nav>

          {/* Contact Details & CTA */}
          <div id="header-cta-group" className="hidden sm:flex items-center gap-8">
            <a
              id="header-phone-link"
              href="tel:678-409-9635"
              className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-white/75 hover:text-gold-500 transition-colors duration-300 font-mono"
            >
              <Phone className="w-3.5 h-3.5 text-gold-500" />
              <span>678-409-9635</span>
            </a>
            <button
              id="header-booking-btn"
              onClick={() => handleItemClick("contact")}
              className="px-6 py-2.5 border border-gold-500 text-gold-500 text-[11px] uppercase tracking-widest hover:bg-gold-500 hover:text-black transition-colors duration-300"
            >
              Book a Tour
            </button>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex lg:hidden items-center gap-4">
            <a
              id="mobile-phone-link"
              href="tel:678-409-9635"
              className="p-2 text-gold-400 hover:text-gold-200 transition-colors sm:hidden"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              id="mobile-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gold-300 hover:text-white hover:bg-space-800 transition-all border border-gold-500/10"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav-panel"
          className="fixed inset-0 top-[65px] bg-space-950/98 backdrop-blur-2xl z-40 border-t border-gold-500/15 flex flex-col justify-between p-6 transition-all duration-500"
        >
          <div className="flex flex-col gap-5 py-4">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleItemClick(item.id)}
                className={`text-left text-xl font-display tracking-widest uppercase transition-colors outline-none py-1.5 ${
                  activeSection === item.id
                    ? "text-gold-400 font-medium border-l-2 border-gold-400 pl-3"
                    : "text-gold-100/80 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Footer Area */}
          <div className="border-t border-gold-500/10 pt-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gold-500/10 flex items-center justify-center border border-gold-500/20">
                <Phone className="w-4 h-4 text-gold-400" />
              </div>
              <div>
                <p className="text-xs text-gold-400/70 font-sans uppercase tracking-wider">Bookings Hotline</p>
                <a href="tel:678-409-9635" className="text-sm font-mono text-gold-200 hover:text-white tracking-wider">
                  678-409-9635
                </a>
              </div>
            </div>
            <p className="text-xs text-gold-500/50 text-center uppercase tracking-widest font-mono">
              Designed by iWebNext
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
