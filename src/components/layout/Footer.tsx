import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, Youtube, ArrowRight, Clock } from "lucide-react";
import api from "../../lib/api";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/services", label: "Services" },
  { path: "/gallery", label: "Gallery" },
  { path: "/booking", label: "Booking" },
  { path: "/contact", label: "Contact" },
  { path: "/faq", label: "FAQ" },
];

const servicesLinks = [
  { name: "Swedish Massage", path: "/services#swedish" },
  { name: "Deep Tissue Massage", path: "/services#deep-tissue" },
  { name: "Aromatherapy", path: "/services#aromatherapy" },
  { name: "Hot Stone Therapy", path: "/services#hot-stone" },
  { name: "Thai Massage", path: "/services#thai" },
  { name: "Reflexology", path: "/services#reflexology" },
  { name: "Facial Treatments", path: "/services#facial" },
  { name: "Body Wraps", path: "/services#body-wraps" },
];

/* ─── Footer ─── */
const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError("");

    try {
      await api.subscribeToNewsletter(email);
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to subscribe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-[#45735D] via-[#62a585] to-[#45735D] text-secondary relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-accent/50 to-accent" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-accent/5 rounded-full blur-2xl" />

      <div className="container-spa relative z-10 grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
        {/* Brand & Newsletter */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h3 className="font-serif text-3xl font-bold text-secondary mb-2">Tripod Spa</h3>
            <p className="text-sm leading-relaxed text-secondary/70 max-w-sm">
              Your sanctuary of peace and rejuvenation. We blend ancient healing traditions with modern luxury to create unforgettable wellness experiences.
            </p>
          </div>
          
          {/* Newsletter Subscription */}
          <div className="bg-white/5 rounded-2xl p-5 backdrop-blur-sm border border-white/10">
            <h4 className="font-serif text-lg font-semibold text-secondary mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              Subscribe to Our Newsletter
            </h4>
            <p className="text-xs text-secondary/60 mb-4">
              Get wellness tips, exclusive offers, and news straight to your inbox.
            </p>
            
            {subscribed ? (
              <div className="flex items-center gap-2 text-accent bg-accent/10 px-4 py-3 rounded-xl">
                <span className="text-sm font-medium">✓ Thank you for subscribing!</span>
              </div>
            ) : (
              <>
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-secondary placeholder:text-secondary/40 focus:outline-none focus:border-accent focus:bg-black/40 transition-all text-sm"
                    required
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-3 bg-accent hover:bg-accent/90 disabled:bg-accent/50 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/25 flex items-center gap-2 group"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    )}
                  </button>
                </form>
                {error && (
                  <p className="text-xs text-red-400 mt-2">{error}</p>
                )}
              </>
            )}
          </div>

          {/* Social Links */}
          <div className="mt-6 flex gap-4">
            {[
              { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
              { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
              { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
              { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-accent rounded-xl text-secondary/70 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-accent/25"
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-serif text-lg font-semibold text-secondary mb-6 relative inline-block">
            Quick Links
            <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-accent rounded-full" />
          </h4>
          <ul className="space-y-3 text-sm">
            {navLinks.map((l) => (
              <li key={l.path}>
                <Link 
                  to={l.path} 
                  className="text-secondary/70 hover:text-accent transition-all duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-accent/50 rounded-full group-hover:bg-accent group-hover:w-2 transition-all" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-serif text-lg font-semibold text-secondary mb-6 relative inline-block">
            Our Services
            <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-accent rounded-full" />
          </h4>
          <ul className="space-y-3 text-sm">
            {servicesLinks.map((s) => (
              <li key={s.path}>
                <Link 
                  to={s.path}
                  className="text-secondary/70 hover:text-accent transition-all duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-accent/50 rounded-full group-hover:bg-accent group-hover:w-2 transition-all" />
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-serif text-lg font-semibold text-secondary mb-6 relative inline-block">
            Contact Us
            <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-accent rounded-full" />
          </h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3 text-secondary/70">
              <div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl text-accent shrink-0 border border-white/5">
                <MapPin size={18} />
              </div>
              <span>Gali No. 1, Kala Patthar<br />Nanakheda, Ujjain</span>
            </li>
            <li className="flex items-center gap-3 text-secondary/70">
              <div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl text-accent shrink-0 border border-white/5">
                <Phone size={18} />
              </div>
              <span>+91-9424940252</span>
            </li>
            <li className="flex items-center gap-3 text-secondary/70">
              <div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl text-accent shrink-0 border border-white/5">
                <Mail size={18} />
              </div>
              <span>wellnesstripod@gmail.com</span>
            </li>
            <li className="flex items-center gap-3 text-secondary/70">
              <div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl text-accent shrink-0 border border-white/5">
                <Clock size={18} />
              </div>
              <div>
                <span className="block">Mon - Fri: 9AM - 8PM</span>
                <span className="block text-secondary/50">Sat - Sun: 10AM - 6PM</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/10 py-6">
        <div className="container-spa flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-secondary/50">
          <p>© {new Date().getFullYear()} Tripod Wellness Spa. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
