import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/services", label: "Services" },
  { path: "/gallery", label: "Gallery" },
  { path: "/booking", label: "Booking" },
  { path: "/contact", label: "Contact" },
  { path: "/faq", label: "FAQ" },
];

/* ─── Header ─── */
const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl shadow-lg"
          : "bg-transparent"
      }`}
    >
      {/* Decorative top accent */}
      <div className={`h-0.5 w-full bg-gradient-to-r from-[hsl(152_25%_36%)] via-[hsl(152_25%_45%)] to-[hsl(152_25%_36%)] transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-50"}`} />

      <div className="container-spa flex items-center justify-between py-4">
        <Link
          to="/"
          className="group relative flex items-center gap-3 font-serif text-2xl font-bold tracking-wide text-[hsl(25_25%_15%)] md:text-3xl"
        >
          <span className="relative">
            Tripod
            <span className="text-primary">.</span>
            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-[hsl(152_25%_45%)] transition-all duration-300 group-hover:w-full" />
          </span>
          <Sparkles className="h-5 w-5 text-primary opacity-0 transition-all duration-300 group-hover:opacity-100" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-2 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-all ${
                location.pathname === l.path ? "text-primary" : "text-foreground/70 hover:text-primary"
              }`}
            >
              <span className="relative z-10">{l.label}</span>
              {location.pathname === l.path && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 rounded-full bg-primary/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/booking"
            className="group relative overflow-hidden rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              Book Now
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
            <div className="absolute inset-0 -translate-x-full bg-[hsl(152_25%_45%)] transition-transform duration-300 group-hover:translate-x-0" />
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative rounded-full p-2 text-foreground transition-all hover:bg-muted lg:hidden"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: mobileOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-background/98 backdrop-blur-xl lg:hidden"
          >
            <div className="container-spa flex flex-col gap-2 py-6">
              {navLinks.map((l, index) => (
                <motion.div
                  key={l.path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Link
                    to={l.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-all ${
                      location.pathname === l.path
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/70 hover:bg-muted hover:text-primary"
                    }`}
                  >
                    {location.pathname === l.path && (
                      <span className="h-2 w-2 rounded-full bg-primary" />
                    )}
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ delay: navLinks.length * 0.05, duration: 0.3 }}
              >
                <Link
                  to="/booking"
                  onClick={() => setMobileOpen(false)}
                  className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-center text-sm font-semibold text-primary-foreground shadow-lg"
                >
                  Book Now
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
