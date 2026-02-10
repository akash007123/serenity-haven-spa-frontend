import { Link } from "react-router-dom";
import { Clock, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { services } from "@/data/services";
import serviceSwedish from "@/assets/service-swedish.jpg";
import serviceAromatherapy from "@/assets/service-aromatherapy.jpg";
import serviceHotStone from "@/assets/service-hot-stone.jpg";
import serviceThai from "@/assets/service-thai.jpg";

const serviceImages: Record<string, string> = {
  swedish: serviceSwedish,
  aromatherapy: serviceAromatherapy,
  "hot-stone": serviceHotStone,
  thai: serviceThai,
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

const ServicesOverview = () => (
  <section className="relative overflow-hidden py-20 md:py-28">
    {/* Background decorative elements */}
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-amber-100/30 blur-3xl" />
    </div>

    <div className="container-spa relative">
      <AnimatedSection className="mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-primary">
            <Sparkles size={12} />
            What We Offer
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-4xl font-medium leading-tight text-foreground md:text-5xl lg:text-6xl"
        >
          Our{" "}
          <span className="relative">
            <span className="relative z-10">Signature</span>
            <motion.span
              className="absolute -bottom-2 left-0 right-0 h-3 w-full rounded-full bg-primary/20"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </span>{" "}
          Treatments
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
        >
          Discover our curated selection of massage therapies, each designed to
          target your specific needs and restore balance to your body and mind.
        </motion.p>
      </AnimatedSection>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {services.slice(0, 4).map((s, i) => (
          <motion.div key={s.id} variants={cardVariants}>
            <Link
              to="/services"
              className="group relative block h-full overflow-hidden rounded-2xl bg-card shadow-md transition-all hover:shadow-2xl"
            >
              {/* Image container with overlay */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  src={serviceImages[s.image] || serviceSwedish}
                  alt={s.name}
                  className="h-full w-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-60 transition-opacity group-hover:opacity-40" />
                
                {/* Price badge */}
                <motion.div
                  className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-sm font-semibold text-foreground shadow-lg backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  {s.price}
                </motion.div>

                {/* Hover overlay content */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-primary/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  initial={false}
                >
                  <motion.span
                    className="flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-primary"
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    Learn more <ArrowRight size={16} />
                  </motion.span>
                </motion.div>
              </div>

              {/* Content */}
              <div className="relative p-6">
                {/* Decorative line */}
                <motion.div
                  className="mb-4 h-0.5 w-12 rounded-full bg-primary/30"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />

                <h3 className="mb-2 font-serif text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                  {s.name}
                </h3>
                <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>

                {/* Duration with icon */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                    <Clock size={14} className="text-primary" />
                    {s.duration}
                  </span>
                </div>
              </div>

              {/* Decorative corner accents */}
              <div className="absolute bottom-0 left-0 h-16 w-16 overflow-hidden">
                <div className="absolute bottom-0 left-0 h-full w-full rounded-tr-full bg-gradient-to-tl from-primary/10 to-transparent" />
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* View All Services CTA */}
      <AnimatedSection delay={0.6} className="mt-14 text-center">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-block"
        >
          <Link
            to="/services"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
          >
            <span className="relative z-10">View All Services</span>
            <motion.span
              className="relative z-10"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <ArrowRight size={18} />
            </motion.span>
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

export default ServicesOverview;
