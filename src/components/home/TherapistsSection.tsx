import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Star, Clock, Award, MessageCircleHeart } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { therapists } from "@/data/therapists";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
    },
  },
};

const TherapistsSection = () => (
  <section className="relative overflow-hidden py-20 md:py-28">
    {/* Background decoration */}
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-amber-100/20 blur-3xl" />
      <div className="absolute top-1/2 right-0 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
    </div>

    <div className="container-spa">
      {/* Header */}
      <AnimatedSection className="mb-16 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-primary"
        >
          <MessageCircleHeart size={12} />
          Our Team
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-4xl font-medium leading-tight text-foreground md:text-5xl lg:text-6xl"
        >
          Meet Our{" "}
          <span className="relative">
            <span className="relative z-10">Therapists</span>
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
          Our team of certified professionals brings passion and expertise to every
          treatment, ensuring you receive the highest quality care.
        </motion.p>
      </AnimatedSection>

      {/* Therapists Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {therapists.map((t, i) => (
          <motion.div
            key={t.id}
            variants={cardVariants}
            className="group relative overflow-hidden rounded-2xl bg-card/80 p-6 text-center shadow-lg backdrop-blur-sm transition-all hover:shadow-2xl"
            whileHover={{ y: -8 }}
          >
            {/* Background gradient */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Avatar container */}
            <div className="relative mb-5 flex justify-center">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
              >
                {/* Avatar circle */}
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25">
                  <span className="font-serif text-2xl font-bold">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>

                {/* Rating badge */}
                <div className="absolute -right-1 -bottom-1 flex items-center gap-0.5 rounded-full bg-amber-400 px-2 py-0.5 text-xs font-bold text-amber-900 shadow">
                  <Star size={12} fill="currentColor" />
                  4.9
                </div>
              </motion.div>
            </div>

            {/* Content */}
            <h3 className="font-serif text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
              {t.name}
            </h3>
            <p className="mb-2 text-sm font-medium text-primary">{t.title}</p>

            {/* Experience badge */}
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs">
              <Clock size={14} className="text-primary" />
              <span className="font-medium text-foreground">{t.experience}</span>
            </div>

            {/* Bio */}
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
              {t.bio}
            </p>

            {/* Specialties */}
            <div className="flex flex-wrap justify-center gap-1.5">
              {t.specialties.slice(0, 3).map((s) => (
                <motion.span
                  key={s}
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                >
                  {s}
                </motion.span>
              ))}
              {t.specialties.length > 3 && (
                <span className="rounded-full bg-secondary/50 px-2.5 py-1 text-xs text-secondary-foreground">
                  +{t.specialties.length - 3}
                </span>
              )}
            </div>

            {/* Decorative corner */}
            <div className="absolute top-0 right-0 h-16 w-16 overflow-hidden">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 transition-transform duration-300 group-hover:scale-150" />
            </div>

            {/* Bottom accent */}
            <motion.div
              className="absolute bottom-0 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-primary"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Join CTA */}
      <AnimatedSection className="mt-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.span
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-6 py-3 text-sm font-medium text-primary"
          >
            <Award size={16} />
            Join our team of expert therapists
          </motion.span>
        </motion.div>
      </AnimatedSection>
    </div>
  </section>
);

export default TherapistsSection;
