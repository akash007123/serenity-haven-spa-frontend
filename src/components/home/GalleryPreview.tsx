import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Maximize2, Eye } from "lucide-react";
import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import spaOils from "@/assets/spa-oils.jpg";
import spaLounge from "@/assets/spa-lounge.jpg";

const images = [
  { src: gallery1, alt: "Spa relaxation room", span: "row-span-2", size: "large" },
  { src: spaOils, alt: "Essential oils", span: "", size: "medium" },
  { src: gallery2, alt: "Spa products", span: "", size: "medium" },
  { src: spaLounge, alt: "Spa lounge", span: "", size: "medium" },
  { src: gallery3, alt: "Meditation room", span: "", size: "medium" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const imageVariants = {
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

const GalleryPreview = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-amber-100/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container-spa">
        {/* Header */}
        <AnimatedSection className="mb-12 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-primary"
          >
            <Eye size={12} />
            Visual Tour
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl font-medium leading-tight text-foreground md:text-5xl lg:text-6xl"
          >
            Step Inside{" "}
            <span className="relative">
              <span className="relative z-10">Serenity</span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-3 rounded-full bg-primary/20"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            Take a glimpse into our tranquil spaces designed to soothe your senses
            and transport you to a world of relaxation.
          </motion.p>
        </AnimatedSection>

        {/* Masonry-style Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
        >
          {images.map((img, i) => (
            <motion.div
              key={i}
              variants={imageVariants}
              className={`relative overflow-hidden rounded-2xl shadow-lg transition-shadow hover:shadow-2xl ${
                img.span || ""
              } ${img.size === "large" ? "md:row-span-2 md:h-full" : ""}`}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative h-48 md:h-full"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />

                {/* Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 transition-opacity duration-300"
                  animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
                />

                {/* Hover content */}
                <AnimatePresence>
                  {hoveredIndex === i && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                        <Maximize2 size={24} className="text-white" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Caption on hover */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: hoveredIndex === i ? 0 : 20, opacity: hoveredIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="rounded-full bg-primary/90 px-3 py-1.5 text-xs font-medium text-primary-foreground">
                    {img.alt}
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <AnimatedSection className="mt-12 text-center">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <Link
              to="/gallery"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Full Gallery
                <motion.span
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 17 }}
                >
                  <ArrowRight size={18} />
                </motion.span>
              </span>
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </Link>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default GalleryPreview;
