import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from "lucide-react";
// Import local generated materials for coherence
import heroBg from "../assets/images/venue_hero_bg_1780684781429.png";
import weddingImg from "../assets/images/wedding_service_1780684798542.png";

interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  category: "all" | "architecture" | "weddings" | "corporate" | "entertainment";
  description: string;
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const photos: GalleryPhoto[] = [
    {
      id: "photo1",
      src: heroBg,
      title: "The Main Grand Dome",
      category: "architecture",
      description: "Ample modern structural elegance featuring our signature glass skylight architecture."
    },
    {
      id: "photo2",
      src: weddingImg,
      title: "Romantic Dinner Reception",
      category: "weddings",
      description: "Whimsical floral installations and premium candlelit banquet seating arrangements."
    },
    {
      id: "photo3",
      src: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80",
      title: "Executive Keynote Setup",
      category: "corporate",
      description: "Dynamic stage integration ideal for seminars, products launch reveals, and corporate meets."
    },
    {
      id: "photo4",
      src: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=1000&q=80",
      title: "Live Concert Acoustics Arena",
      category: "entertainment",
      description: "Stately multi-directional LED stage arrays and concert sound grids."
    },
    {
      id: "photo5",
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
      title: "Majestic Stage Altar",
      category: "weddings",
      description: "A whimsical floral aisle crafted with delicate details for eternal bridal memories."
    },
    {
      id: "photo6",
      src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1000&q=80",
      title: "Elite VIP Lounge and Gallery",
      category: "architecture",
      description: "A secluded overhead mezzanine view with private bars and leather lounge options."
    },
    {
      id: "photo7",
      src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1000&q=80",
      title: "Sophisticated Cocktail Galas",
      category: "corporate",
      description: "Gleaming ambient configurations showcasing premium liquor displays and ice arrangements."
    },
    {
      id: "photo8",
      src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=80",
      title: "Illuminated Stage Broadcast",
      category: "entertainment",
      description: "Outstanding Backstage artist cottages with complete sound-broadcast interfaces."
    }
  ];

  const categories = [
    { id: "all", label: "All Works" },
    { id: "architecture", label: "Architectural Spaces" },
    { id: "weddings", label: "Weddings" },
    { id: "corporate", label: "Corporate Galas" },
    { id: "entertainment", label: "Live Music" }
  ];

  const filteredPhotos = activeCategory === "all"
    ? photos
    : photos.filter(p => p.category === activeCategory);

  const openLightbox = (id: string) => {
    const idx = photos.findIndex(p => p.id === id);
    if (idx !== -1) setLightboxIndex(idx);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => (prev !== null && prev > 0 ? prev - 1 : photos.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => (prev !== null && prev < photos.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="gallery" className="py-24 bg-space-950 relative overflow-hidden">
      <div className="absolute top-[10%] left-[20%] w-[300px] h-[300px] rounded-full bg-gold-600/5 filter blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] rounded-full bg-gold-400/5 filter blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-fade-in-up">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="text-left max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-500/10 border border-gold-500/20 text-[#C5A059] text-xs uppercase tracking-[0.4em] font-bold italic mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              Venue Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-wider uppercase">
              The Living <span className="italic font-light text-gold-500">Gallery</span>
            </h2>
            <p className="mt-4 text-sm text-white/50 leading-relaxed font-sans font-light">
              Gaze upon the versatility of Georgia's premier destination. Check the spatial geometry and setups we've executed for prestigious guests.
            </p>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap gap-2.5 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`cat-btn-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 text-xs font-semibold tracking-widest uppercase transition-all duration-300 outline-none cursor-pointer rounded-none border ${
                  activeCategory === cat.id
                    ? "bg-[#C5A059] border-[#C5A059] text-black"
                    : "bg-[#050505] border-white/10 text-white/70 hover:border-[#C5A059] hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Photos Grid Container with beautiful micro animations */}
        <div id="gallery-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              id={`photo-card-${photo.id}`}
              onClick={() => openLightbox(photo.id)}
              className="group relative h-80 rounded-none overflow-hidden cursor-pointer bg-[#050505] border border-white/5 hover:border-[#C5A059]/40 shadow-xl transition-all duration-500 flex flex-col justify-end"
            >
              {/* Image element with low opacity placeholder background */}
              <div className="absolute inset-0">
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
                {/* Overlay masks blending into the photo base */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent transition-opacity duration-300" />
                <div className="absolute inset-0 bg-[#C5A059]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Expand Trigger Icon (Reveals on hover) */}
              <div className="absolute top-4 right-4 w-9 h-9 border border-white/20 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-[-10px] group-hover:translate-y-0 transition-all duration-300">
                <Maximize2 className="w-4 h-4 text-[#C5A059]" />
              </div>

              {/* Content information panel layout */}
              <div className="relative z-10 p-5 translate-y-[28px] group-hover:translate-y-0 transition-transform duration-500 text-left">
                <span className="font-mono text-[8px] font-bold tracking-widest text-[#C5A059] uppercase">
                  {photo.category}
                </span>
                <h3 className="font-serif text-base text-white mt-1 leading-tight tracking-wide group-hover:text-gold-200 transition-colors">
                  {photo.title}
                </h3>
                <p className="text-[11px] text-white/50 mt-1 lines-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 line-clamp-2">
                  {photo.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Trigger Dialog Overlay Modal */}
      {lightboxIndex !== null && (
        <div
          id="lightbox-overlay"
          onClick={closeLightbox}
          className="fixed inset-0 z-100 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 md:p-8 animate-fade-in"
        >
          {/* Close Action Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 border border-white/10 hover:border-[#C5A059]/50 bg-[#0c0c0c] text-white flex items-center justify-center transition-all shadow-xl font-semibold cursor-pointer rounded-none"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Navigation control */}
          <button
            onClick={handlePrev}
            className="absolute left-4 p-3 bg-black/40 hover:bg-black/90 border border-white/10 hover:border-[#C5A059]/40 text-white flex items-center justify-center transition-all cursor-pointer rounded-none"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Center viewport panel and details */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full flex flex-col border border-white/10 rounded-none overflow-hidden bg-[#0c0c0c] shadow-2xl animate-scale-up"
          >
            <div className="relative aspect-video max-h-[70vh] bg-black flex items-center justify-center">
              <img
                src={photos[lightboxIndex].src}
                alt={photos[lightboxIndex].title}
                className="w-full h-full object-contain pointer-events-none"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Descriptive texts */}
            <div className="p-5 sm:p-6 border-t border-white/10 bg-[#0c0c0c] flex justify-between items-center sm:flex-row flex-col gap-4 text-left">
              <div>
                <span className="font-mono text-[9px] text-[#C5A059] font-bold uppercase tracking-widest block">
                  {photos[lightboxIndex].category} · Category Portfolio
                </span>
                <h4 className="font-serif text-lg text-white mt-1 uppercase tracking-wider">
                  {photos[lightboxIndex].title}
                </h4>
                <p className="text-xs text-white/50 mt-1 font-sans font-light">
                  {photos[lightboxIndex].description}
                </p>
              </div>
              <div className="flex items-center gap-2 font-mono text-[10px] text-[#C5A059] bg-black px-3 py-1.5 border border-white/10 rounded-none">
                <span>{lightboxIndex + 1}</span> / <span>{photos.length}</span>
              </div>
            </div>
          </div>

          {/* Right Navigation control */}
          <button
            onClick={handleNext}
            className="absolute right-4 p-3 bg-black/40 hover:bg-black/90 border border-white/10 hover:border-[#C5A059]/40 text-white flex items-center justify-center transition-all cursor-pointer rounded-none"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
}
