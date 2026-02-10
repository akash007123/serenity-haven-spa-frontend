import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Sparkles, Leaf } from "lucide-react";
import heroImage from "@/assets/hero-spa.jpg";

const HeroSection = () => {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 500], [0, 150]);
  const textY = useTransform(scrollY, [0, 500], [0, 50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Parallax Background Image */}
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0"
      >
        <motion.img
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src={heroImage}
          alt="Serenity Spa interior"
          className="h-full w-full object-cover"
        />
        {/* Multi-layer Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/10" />
      </motion.div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Leaves */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: Math.random() * 1000, y: 600 }}
            animate={{ 
              opacity: [0, 0.6, 0],
              x: Math.random() * 400 - 200,
              y: -100 
            }}
            transition={{ 
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear"
            }}
            className="absolute"
          >
            <Leaf 
              className="h-4 w-4 text-accent/30" 
              style={{ 
                transform: `rotate(${Math.random() * 360}deg)` 
              }} 
            />
          </motion.div>
        ))}
        
        {/* Floating Sparkles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{ 
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 1.5,
            }}
            className="absolute"
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${10 + Math.random() * 60}%`
            }}
          >
            <Sparkles className="h-3 w-3 text-secondary/40" />
          </motion.div>
        ))}

        {/* Ambient Glows */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-primary/15 blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute right-1/3 top-1/3 h-64 w-64 rounded-full bg-secondary/10 blur-3xl"
        />
      </div>

      {/* Content */}
      <motion.div 
        style={{ y: textY, opacity }}
        className="container-spa relative z-10 py-20"
      >
        <div className="max-w-3xl">
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 backdrop-blur-sm"
          >
            <motion.span 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-2 w-2 rounded-full bg-accent"
            />
            <span className="text-xs font-medium uppercase tracking-widest text-accent">
              Premium Spa Experience
            </span>
          </motion.div>

          {/* Main Heading with Staggered Animation */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mb-6 font-serif text-5xl font-bold leading-tight text-secondary md:text-6xl lg:text-7xl"
          >
            Discover Inner{" "}
            <motion.span
              initial={{ opacity: 0, backgroundPosition: "0% 50%" }}
              animate={{ opacity: 1, backgroundPosition: "100% 50%" }}
              transition={{ duration: 1, delay: 0.8 }}
              className="relative inline-block bg-gradient-to-r from-accent via-accent/80 to-primary bg-clip-text text-transparent"
            >
              Serenity
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-secondary/90"
            >
              & Renewal
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-10 max-w-xl text-lg leading-relaxed text-secondary/70 md:text-xl"
          >
            Escape the chaos of daily life and immerse yourself in a sanctuary of tranquility. 
            Our expert therapists deliver personalized treatments that restore balance to your mind, body, and soul.
          </motion.p>

          {/* Stats/Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-10 flex flex-wrap gap-6"
          >
            {[
              { label: "Years Experience", value: "15+" },
              { label: "Happy Clients", value: "10K+" },
              { label: "Expert Therapists", value: "20+" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl font-bold text-accent md:text-3xl">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-wider text-secondary/60">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/booking"
              className="group relative overflow-hidden rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all hover:shadow-accent/40"
            >
              <motion.span
                className="relative z-10 flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Book Your Experience
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </motion.svg>
              </motion.span>
              <motion.div
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-primary/20 to-transparent transition-transform duration-300 group-hover:translate-x-0"
              />
            </Link>
            <Link
              to="/services"
              className="group relative overflow-hidden rounded-full border border-secondary/30 bg-secondary/5 px-8 py-3.5 text-sm font-semibold text-secondary backdrop-blur-sm transition-all hover:border-secondary/50 hover:bg-secondary/15"
            >
              <motion.span
                className="relative z-10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore Services
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-secondary/50">
            Scroll to explore
          </span>
          <motion.div
            className="flex h-10 w-6 items-start justify-center rounded-full border border-secondary/30"
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full bg-secondary/60"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Decorative Border Bottom */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
      />
    </section>
  );
};

export default HeroSection;
