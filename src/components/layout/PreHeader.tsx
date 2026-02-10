import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

/* ─── Pre-header ─── */
const PreHeader = () => (
  <div className="relative overflow-hidden bg-gradient-to-r from-primary/95 via-primary to-primary/90 text-primary-foreground">
    {/* Decorative gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 pointer-events-none" />
    
    <div className="container-spa relative flex flex-wrap items-center justify-between gap-2 py-2.5 text-xs md:text-sm">
      <div className="flex flex-wrap items-center gap-3 lg:gap-5">
        {/* Phone */}
        <a 
          href="tel:+15551234567" 
          className="group flex items-center gap-1.5 transition-all duration-300 hover:scale-105"
        >
          <span className="relative">
            <Phone size={14} className="transition-transform group-hover:rotate-12" />
            <span className="absolute -inset-1 rounded-full bg-accent/20 opacity-0 transition-opacity group-hover:opacity-100" />
          </span>
          <span className="hidden sm:inline">(555) 123-4567</span>
        </a>
        
        {/* Divider */}
        <div className="hidden h-4 w-px bg-white/20 md:block" />
        
        {/* Email */}
        <a 
          href="mailto:hello@serenityspa.com" 
          className="group hidden items-center gap-1.5 transition-all duration-300 hover:scale-105 sm:flex"
        >
          <span className="relative">
            <Mail size={14} className="transition-transform group-hover:-rotate-12" />
            <span className="absolute -inset-1 rounded-full bg-accent/20 opacity-0 transition-opacity group-hover:opacity-100" />
          </span>
          <span className="hidden lg:inline">hello@serenityspa.com</span>
          <span className="lg:hidden">Email Us</span>
        </a>
        
        {/* Divider */}
        <div className="hidden h-4 w-px bg-white/20 md:block" />
        
        {/* Location */}
        <span className="hidden items-center gap-1.5 md:flex">
          <MapPin size={14} className="text-accent" />
          <span className="hidden xl:inline">123 Tranquil Lane, Wellness City</span>
          <span className="xl:hidden">Visit Us</span>
        </span>
      </div>

      {/* Right side - Hours & Booking */}
      <div className="flex items-center gap-4 lg:gap-6">
        {/* Opening Hours */}
        <div className="hidden items-center gap-1.5 md:flex">
          <Clock size={14} className="text-accent" />
          <span className="text-xs lg:text-sm">Mon-Sat: 9AM-8PM | Sun: 10AM-6PM</span>
        </div>

        {/* Divider */}
        <div className="hidden h-6 w-px bg-white/20 md:block" />

        {/* Book Appointment Button */}
        <Link
          to="/booking"
          className="group relative overflow-hidden rounded-full bg-accent px-5 py-1.5 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/30"
        >
          <span className="relative z-10 flex items-center gap-1.5">
            Book Appointment
            <svg 
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
          {/* Shimmer effect */}
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
        </Link>
      </div>
    </div>
  </div>
);

export default PreHeader;
