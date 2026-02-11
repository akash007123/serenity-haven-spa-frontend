import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Camera, Image as ImageIcon, Sparkles, ZoomIn, Download, Share2, Heart } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import heroSpa from "@/assets/hero-spa.jpg";
import spaAbout from "@/assets/spa-about.jpg";
import spaProcess from "@/assets/spa-process.jpg";
import spaOils from "@/assets/spa-oils.jpg";
import spaLounge from "@/assets/spa-lounge.jpg";
import spaExterior from "@/assets/spa-exterior.jpg";

const categories = [
  { id: "All", icon: "✨", count: 12 },
  { id: "Interior", icon: "🏠", count: 5 },
  { id: "Treatments", icon: "💆", count: 3 },
  { id: "Products", icon: "🌿", count: 3 },
  { id: "Exterior", icon: "🌳", count: 1 },
];

const images = [
  { src: gallery1, alt: "Spa relaxation room", cat: "Interior", span: "md:row-span-2" },
  { src: spaOils, alt: "Essential oils collection", cat: "Products", span: "" },
  { src: gallery2, alt: "Spa products display", cat: "Products", span: "" },
  { src: spaProcess, alt: "Treatment room setup", cat: "Treatments", span: "md:col-span-2" },
  { src: gallery3, alt: "Meditation room", cat: "Interior", span: "" },
  { src: gallery4, alt: "Spa pool area", cat: "Interior", span: "md:col-span-2" },
  { src: spaLounge, alt: "Relaxation lounge", cat: "Interior", span: "" },
  { src: gallery5, alt: "Herbal tea service", cat: "Products", span: "" },
  { src: gallery6, alt: "Couples treatment room", cat: "Treatments", span: "md:row-span-2" },
  { src: heroSpa, alt: "Spa interior", cat: "Interior", span: "md:col-span-2" },
  { src: spaAbout, alt: "Treatment setup", cat: "Treatments", span: "" },
  { src: spaExterior, alt: "Spa exterior", cat: "Exterior", span: "md:col-span-3" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
    },
  },
};

const Gallery = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [filter, setFilter] = useState("All");
  const [isFavorite, setIsFavorite] = useState<number[]>([]);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 1.05]);

  const filtered = filter === "All" ? images : images.filter((img) => img.cat === filter);

  const navigateLightbox = (dir: 1 | -1) => {
    if (lightbox === null) return;
    const currentIdx = filtered.findIndex((_, i) => i === lightbox);
    const newIdx = (currentIdx + dir + filtered.length) % filtered.length;
    setLightbox(newIdx);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === "ArrowLeft") navigateLightbox(-1);
      if (e.key === "ArrowRight") navigateLightbox(1);
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox]);

  const toggleFavorite = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setIsFavorite((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden">
        {/* Background with Parallax Grid */}
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0"
        >
          <div className="grid h-full w-full grid-cols-4 grid-rows-4 gap-3 p-3 opacity-15">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="col-span-2 row-span-2 overflow-hidden rounded-2xl"
            >
              <img src={gallery1} alt="" className="h-full w-full object-cover" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 10, repeat: Infinity, delay: 1 }}
              className="row-span-1 overflow-hidden rounded-xl"
            >
              <img src={gallery2} alt="" className="h-full w-full object-cover" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 7, repeat: Infinity, delay: 2 }}
              className="row-span-2 overflow-hidden rounded-xl"
            >
              <img src={gallery3} alt="" className="h-full w-full object-cover" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 9, repeat: Infinity, delay: 0.5 }}
              className="col-span-2 row-span-1 overflow-hidden rounded-xl"
            >
              <img src={spaLounge} alt="" className="h-full w-full object-cover" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 11, repeat: Infinity, delay: 1.5 }}
              className="overflow-hidden rounded-xl"
            >
              <img src={spaOils} alt="" className="h-full w-full object-cover" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.09, 1] }}
              transition={{ duration: 8, repeat: Infinity, delay: 3 }}
              className="overflow-hidden rounded-xl"
            >
              <img src={gallery5} alt="" className="h-full w-full object-cover" />
            </motion.div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90 md:bg-gradient-to-r md:from-background/80 md:via-background/60 md:to-background/80" />
        </motion.div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ x: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -25, 0], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 12, repeat: Infinity, delay: 2 }}
            className="absolute bottom-0 -left-20 h-96 w-96 rounded-full bg-amber-100/20 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-0 right-1/3 h-64 w-64 rounded-full bg-primary/5 blur-3xl"
          />
        </div>

        {/* Floating Icons */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
              rotate: Math.random() * 30 - 15,
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              delay: i * 0.8,
            }}
            className="absolute text-primary/20"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${10 + Math.random() * 70}%`,
              fontSize: `${16 + Math.random() * 16}px`,
            }}
          >
            {["✨", "🌿", "💫", "🕯️", "🌸", "🍃", "🌺", "⭐", "🌙", "💐", "🪷", "🦋"][i % 12]}
          </motion.div>
        ))}

        {/* Content */}
        <div className="container-spa relative z-10 py-20">
          <div className="max-w-3xl text-center mx-auto">
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 backdrop-blur-sm"
            >
              <motion.span
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-2.5 w-2.5 rounded-full bg-primary"
              />
              <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-primary">
                <ImageIcon size={14} />
                {images.length} Photos
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-2 text-sm uppercase tracking-[0.25em] text-muted-foreground"
            >
              Visual Tour
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-serif text-5xl font-medium leading-tight text-foreground md:text-6xl lg:text-7xl"
            >
              Our{" "}
              <span className="relative">
                <span className="relative z-10 text-primary">Gallery</span>
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-3 rounded-full bg-primary/20"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
            >
              Explore our tranquil spaces, premium products, and the serene atmosphere
              that awaits you at Tripod Spa.
            </motion.p>

            {/* Decorative Elements */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mx-auto mt-8 flex items-center justify-center gap-4"
            >
              <Sparkles className="h-5 w-5 text-primary/60" />
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              <Sparkles className="h-5 w-5 text-primary/60" />
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-wrap justify-center gap-8"
            >
              {categories.slice(0, 3).map((cat, index) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="group cursor-pointer rounded-xl bg-card/80 px-6 py-3 text-center shadow-lg backdrop-blur-sm transition-all hover:shadow-xl"
                >
                  <div className="text-2xl">{cat.icon}</div>
                  <div className="mt-1 text-lg font-bold text-foreground">{cat.count}</div>
                  <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground group-hover:text-primary">
                    {cat.id}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Explore</span>
            <div className="h-10 w-px bg-gradient-to-b from-primary/40 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* Category Filters */}
      <section className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur-md py-4">
        <div className="container-spa">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {categories.map((cat, i) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => {
                  setFilter(cat.id);
                  setLightbox(null);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`group relative overflow-hidden rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
                  filter === cat.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-card text-muted-foreground hover:text-foreground hover:shadow-md"
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>{cat.icon}</span>
                  <span>{cat.id}</span>
                  <span className="rounded-full bg-black/10 px-1.5 py-0.5 text-xs">
                    {cat.count}
                  </span>
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding py-20 md:py-28">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-amber-100/20 blur-3xl" />
        </div>

        <div className="container-spa">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={filter}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((img, i) => (
                <motion.div
                  key={img.src + img.alt}
                  variants={itemVariants}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                  className={`relative break-inside-avoid ${img.span || ""}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setLightbox(i)}
                    className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-all hover:shadow-2xl"
                  >
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      src={img.src}
                      alt={img.alt}
                      className="w-full object-cover"
                      loading="lazy"
                    />

                    {/* Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />

                    {/* Hover content */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        className="rounded-full bg-white/20 p-4 backdrop-blur-sm"
                      >
                        <ZoomIn size={32} className="text-white" />
                      </motion.div>
                    </div>

                    {/* Bottom info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-all duration-300 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                      <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm">
                        {img.alt}
                      </span>
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-4 left-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground backdrop-blur-sm">
                        {img.cat}
                      </span>
                    </div>

                    {/* Favorite button */}
                    <motion.button
                      initial={{ opacity: 0 }}
                      whileHover={{ scale: 1.1 }}
                      onClick={(e) => toggleFavorite(e, i)}
                      className="absolute top-4 right-4 rounded-full bg-white/20 p-2 opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100"
                    >
                      <Heart
                        size={18}
                        className={`transition-colors ${
                          isFavorite.includes(i) ? "fill-red-500 text-red-500" : "text-white"
                        }`}
                      />
                    </motion.button>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/95 p-4 backdrop-blur-md"
            onClick={() => setLightbox(null)}
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => setLightbox(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p3 backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Close"
            >
              <X size={24} className="text-white" />
            </motion.button>

            {/* Navigation */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox(-1);
              }}
              className="absolute left-4 z-10 rounded-full bg-white/10 p-4 backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Previous"
            >
              <ChevronLeft size={32} className="text-white" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox(1);
              }}
              className="absolute right-4 z-10 rounded-full bg-white/10 p-4 backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Next"
            >
              <ChevronRight size={32} className="text-white" />
            </motion.button>

            {/* Image */}
            <motion.div
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[lightbox]?.src}
                alt={filtered[lightbox]?.alt}
                className="max-h-[80vh] max-w-full rounded-xl object-contain shadow-2xl"
              />

              {/* Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute -bottom-16 left-0 right-0 text-center"
              >
                <p className="text-lg font-medium text-white">{filtered[lightbox]?.alt}</p>
                <p className="mt-1 text-sm text-white/60">{filtered[lightbox]?.cat}</p>
              </motion.div>

              {/* Actions */}
              <div className="absolute -bottom-16 left-1/2 mt-4 flex -translate-x-1/2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="rounded-full bg-white/10 p-3 backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  <Heart
                    size={20}
                    className={`transition-colors ${
                      isFavorite.includes(lightbox) ? "fill-red-500 text-red-500" : "text-white"
                    }`}
                    onClick={(e) => toggleFavorite(e, lightbox)}
                  />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="rounded-full bg-white/10 p-3 backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  <Share2 size={20} className="text-white" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="rounded-full bg-white/10 p-3 backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  <Download size={20} className="text-white" />
                </motion.button>
              </div>
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/60">
              {lightbox + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
