import React, { useState } from "react";
import { Phone, Mail, Clock, Calendar, MapPin, Loader2, Sparkles, AlertCircle, CheckCircle } from "lucide-react";

export default function Contact() {
  // Input fields state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "weddings",
    date: "",
    guests: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [outcome, setOutcome] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = "Full Name is required.";
    if (!formData.email.trim()) {
      tempErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please input a valid email address.";
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone number is required.";
    } else if (!/^\+?[0-9\s-]{7,15}$/.test(formData.phone)) {
      tempErrors.phone = "Provide a valid contact number.";
    }
    if (!formData.date) tempErrors.date = "Please select a preferred event date.";
    if (!formData.guests) {
      tempErrors.guests = "Estimated guest count is required.";
    } else if (isNaN(Number(formData.guests)) || Number(formData.guests) <= 0) {
      tempErrors.guests = "Guest count must be a positive number.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear singular error as user types
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOutcome(null);

    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setOutcome({
          type: "success",
          message: data.message || `Thank you! Your inquiry has been submitted successfully to Terry.`,
        });
        // Clear forms
        setFormData({
          name: "",
          email: "",
          phone: "",
          eventType: "weddings",
          date: "",
          guests: "",
          message: "",
        });
      } else {
        setOutcome({
          type: "error",
          message: data.error || "Failed to submit booking inquiry. Please try again or call Terry directly.",
        });
      }
    } catch (err: any) {
      console.error(err);
      setOutcome({
        type: "error",
        message: "A network issue occurred. Please check your connection and retry or contact Terry at 678-409-9635.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-space-950 relative overflow-hidden">
      <div className="absolute top-[20%] left-[20%] w-[350px] h-[350px] rounded-full bg-gold-600/5 filter blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[330px] h-[330px] rounded-full bg-gold-400/5 filter blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-fade-in-up">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-500/10 border border-gold-500/20 text-[#C5A059] text-xs uppercase tracking-[0.4em] font-bold italic mb-5">
            <Calendar className="w-3.5 h-3.5" /> Bookings Office & Concierge
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-wider uppercase">
            Schedule Your <span className="italic font-light text-gold-500">Private Tour</span>
          </h2>
          <p className="mt-4 text-sm text-white/50 leading-relaxed font-sans font-light">
            Envision your event in stunning grandeur. Submit the scheduling request below and our main director, Terry, will formulate customized layouts and packages.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left panel: Info Coordinates & Map */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full">
            <div className="glass-panel p-6 sm:p-8 rounded-none flex flex-col gap-6 relative shadow-2xl border-white/10 bg-[#0c0c0c] text-left">
              <h3 className="font-serif text-lg text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-500" /> General Coordinates
              </h3>

              <div className="flex flex-col gap-6 mt-2">
                <div className="flex gap-4">
                  <div className="p-3 rounded-none bg-black border border-white/10 text-gold-500 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] text-gold-500 font-mono tracking-widest uppercase block">Booking Line</span>
                    <a href="tel:678-409-9635" className="text-base sm:text-lg text-white font-mono font-medium hover:text-gold-300 transition-colors tracking-wide">
                      678-409-9635
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-3 rounded-none bg-black border border-white/10 text-gold-500 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] text-gold-500 font-mono tracking-widest uppercase block">Booking Email</span>
                    <a href="mailto:terry@brantland.com" className="text-base sm:text-lg text-white font-sans font-medium hover:text-gold-300 transition-colors tracking-wide break-all">
                      terry@brantland.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-3 rounded-none bg-black border border-white/10 text-gold-500 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] text-gold-500 font-mono tracking-widest uppercase block">Venue Office</span>
                    <p className="text-xs sm:text-sm text-stone-300 mt-1 leading-relaxed">
                      Atlanta Region, Georgia (theatriumlive.us)
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 border-t border-white/10 pt-5">
                  <div className="p-3 rounded-none bg-black border border-white/10 text-gold-500 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] text-gold-500 font-mono tracking-widest uppercase block">Viewing Hours</span>
                    <p className="text-xs text-stone-300 mt-1 leading-relaxed font-sans font-light">
                      By strict reservation only: Monday to Sunday (9:00 AM - 10:00 PM)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Interactive Map with stunning architectural visual coordinates */}
            <div id="simulated-map" className="w-full h-64 rounded-none overflow-hidden relative border border-white/10 shadow-2xl bg-space-900 group">
              {/* Radial geography layout graphic background */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.12)_0%,#0a0a0c_80%)] opacity-80" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                {/* Neon geographic locator rings */}
                <div className="relative flex items-center justify-center w-16 h-16 mb-4">
                  <div className="absolute w-full h-full bg-gold-500/10 rounded-none border border-gold-400/30 animate-pulse" />
                  <div className="absolute w-12 h-12 bg-gold-500/20 rounded-none border border-gold-400/40" />
                  <MapPin className="w-6 h-6 text-gold-300 relative z-10 drop-shadow" />
                </div>
                
                <h4 className="font-serif font-medium text-xs text-white uppercase tracking-widest mt-1">Atlanta Region, Georgia</h4>
                <p className="text-[10px] text-gold-500 font-mono mt-0.5 uppercase tracking-wider">Coordinates: 33.7490° N, 84.3880° W</p>
                
                <p className="text-[11px] text-white/40 mt-3 max-w-sm font-sans font-light leading-relaxed">
                  Strategically situated in Georgia's premier metropolitan belt with convenient luxury valet drop-off and helicopter charter access.
                </p>
              </div>

              {/* Decorative direction marker */}
              <div className="absolute bottom-3 right-3 text-[9px] uppercase font-mono tracking-widest text-[#C5A059] group-hover:text-white transition-colors pointer-events-none">
                theatriumlive.us
              </div>
            </div>
          </div>

          {/* Right panel: Complete inquiry Form */}
          <div className="lg:col-span-7 w-full">
            <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-10 rounded-none flex flex-col gap-5 text-left border-white/10 bg-[#0c0c0c] shadow-2xl relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/5 rounded-bl-full pointer-events-none filter blur-xl" />

              <div>
                <h3 className="font-serif text-2xl text-white uppercase tracking-wider">Inquiry Form</h3>
                <span className="font-sans font-light text-xs text-white/40 mt-1 block">Specify your dates and estimated guest density to verify availability.</span>
              </div>

              {/* Success / Error notification bar overlays */}
              {outcome && (
                <div className={`p-4 rounded-none flex items-start gap-3 border ${
                  outcome.type === "success"
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
                    : "bg-rose-500/10 border-rose-500/20 text-rose-300"
                }`}>
                  {outcome.type === "success" ? (
                    <CheckCircle className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 shrink-0 text-rose-400 mt-0.5" />
                  )}
                  <span className="text-xs sm:text-sm leading-relaxed">{outcome.message}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-[10px] font-mono font-medium text-gold-500 select-none tracking-widest uppercase">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Cassandra Vance"
                    className={`w-full px-4 py-3 rounded-none bg-black border text-sm text-white focus:outline-none focus:border-[#C5A059] transition-all ${
                      errors.name ? "border-rose-500/50" : "border-white/10"
                    }`}
                  />
                  {errors.name && <span className="text-[10px] text-rose-400 font-sans mt-1">{errors.name}</span>}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[10px] font-mono font-medium text-gold-500 select-none tracking-widest uppercase">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. cassandra@example.com"
                    className={`w-full px-4 py-3 rounded-none bg-black border text-sm text-white focus:outline-none focus:border-[#C5A059] transition-all ${
                      errors.email ? "border-rose-500/50" : "border-white/10"
                    }`}
                  />
                  {errors.email && <span className="text-[10px] text-rose-400 font-sans mt-1">{errors.email}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-[10px] font-mono font-medium text-gold-500 select-none tracking-widest uppercase">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. 678-409-9635"
                    className={`w-full px-4 py-3 rounded-none bg-black border text-sm text-white focus:outline-none focus:border-[#C5A059] transition-all ${
                      errors.phone ? "border-rose-500/50" : "border-white/10"
                    }`}
                  />
                  {errors.phone && <span className="text-[10px] text-rose-400 font-sans mt-1">{errors.phone}</span>}
                </div>

                {/* Event Type */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="eventType" className="text-[10px] font-mono font-medium text-gold-500 select-none tracking-widest uppercase">
                    Event Classification
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-none bg-black border border-white/10 text-sm text-white focus:outline-none focus:border-[#C5A059] transition-all cursor-pointer"
                  >
                    <option value="weddings">Heavenly Wedding</option>
                    <option value="corporate">Corporate Gala / Summit</option>
                    <option value="private">Private Celebration Milestone</option>
                    <option value="live-music">Live Concert Entertainment</option>
                    <option value="other">Bespoke Custom Setup</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Event Date */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="date" className="text-[10px] font-mono font-medium text-gold-500 select-none tracking-widest uppercase">
                    Preferred Event Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-none bg-black border text-sm text-white focus:outline-none focus:border-[#C5A059] transition-all cursor-pointer ${
                      errors.date ? "border-rose-500/50" : "border-white/10"
                    }`}
                  />
                  {errors.date && <span className="text-[10px] text-rose-400 font-sans mt-1">{errors.date}</span>}
                </div>

                {/* Estimated Guests */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="guests" className="text-[10px] font-mono font-medium text-gold-500 select-none tracking-widest uppercase">
                    Estimated Guests *
                  </label>
                  <input
                    type="number"
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    placeholder="e.g. 150"
                    className={`w-full px-4 py-3 rounded-none bg-black border text-sm text-white focus:outline-none focus:border-[#C5A059] transition-all ${
                      errors.guests ? "border-rose-500/50" : "border-white/10"
                    }`}
                  />
                  {errors.guests && <span className="text-[10px] text-rose-400 font-sans mt-1">{errors.guests}</span>}
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-[10px] font-mono font-medium text-gold-500 select-none tracking-widest uppercase">
                  Additional Scope and Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Outline any premium requests, audio layouts, visual backlines or catering desires..."
                  className="w-full px-4 py-3 rounded-none bg-black border border-white/10 text-sm text-white focus:outline-none focus:border-[#C5A059] transition-all resize-none"
                />
              </div>

              {/* Submit Trigger button */}
              <button
                type="submit"
                id="contact-submit-btn"
                disabled={isLoading}
                className="w-full py-4 mt-2 px-5 rounded-none bg-[#C5A059] text-black border border-[#C5A059] hover:bg-black hover:text-white font-mono font-bold text-xs tracking-widest uppercase shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 text-rose-400 animate-spin" />
                    <span>Verifying Coordinates...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Request to Terry</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
