import { Award, Heart, Sparkles, Shield, Star, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const items = [
  {
    icon: Award,
    title: "Expert Therapists",
    desc: "Certified professionals with 8-15 years of experience in diverse healing modalities.",
    stat: "15+",
    statLabel: "Years Combined",
  },
  {
    icon: Heart,
    title: "Personalized Care",
    desc: "Every treatment is tailored to your unique needs after a thorough consultation.",
    stat: "100%",
    statLabel: "Customized",
  },
  {
    icon: Sparkles,
    title: "Premium Products",
    desc: "We use only organic, sustainably-sourced oils and products for your wellbeing.",
    stat: "50+",
    statLabel: "Organic Oils",
  },
  {
    icon: Shield,
    title: "Serene Environment",
    desc: "Our space is designed to calm your senses from the moment you walk in.",
    stat: "5-Star",
    statLabel: "Rated",
  },
];

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

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
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

const iconVariants: Variants = {
  hover: {
    rotate: 180,
    scale: 1.1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const WhyChooseUs = () => (
  <section className="relative overflow-hidden py-20 md:py-28">
    {/* Background decorative elements */}
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
          <Sparkles size={12} />
          Why Serenity
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-4xl font-medium leading-tight text-foreground md:text-5xl lg:text-6xl"
        >
          The{" "}
          <span className="relative">
            <span className="relative z-10">Serenity</span>
            <motion.span
              className="absolute -bottom-2 left-0 right-0 h-3 rounded-full bg-primary/20"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </span>{" "}
          Difference
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
        >
          Experience wellness redefined with our commitment to excellence in every
          detail of your spa journey.
        </motion.p>
      </AnimatedSection>

      {/* Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            variants={itemVariants}
            className="group relative overflow-hidden rounded-2xl bg-card/80 p-6 text-center shadow-lg backdrop-blur-sm transition-all hover:shadow-2xl"
            whileHover={{ y: -10 }}
          >
            {/* Background gradient on hover */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Decorative corner */}
            <div className="absolute top-0 right-0 h-16 w-16 overflow-hidden">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 transition-transform duration-300 group-hover:scale-150" />
            </div>

            {/* Icon container */}
            <div className="relative mb-5 flex justify-center">
              <motion.div
                variants={iconVariants}
                whileHover="hover"
                className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25"
              >
                <item.icon size={28} />
                {/* Inner ring decoration */}
                <div className="absolute inset-1 rounded-full border border-white/20" />
              </motion.div>
            </div>

            {/* Content */}
            <h3 className="mb-3 font-serif text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
              {item.title}
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              {item.desc}
            </p>

            {/* Stat badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              <CheckCircle2 size={12} />
              {item.stat}
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

      {/* Trust indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-16 flex flex-wrap items-center justify-center gap-8 text-center md:gap-12"
      >
        {[
          { label: "Happy Clients", value: "10,000+" },
          { label: "5-Star Reviews", value: "500+" },
          { label: "Awards Won", value: "12" },
        ].map((stat, i) => (
          <div key={stat.label} className="flex flex-col items-center">
            <motion.span
              className="font-serif text-3xl font-bold text-foreground md:text-4xl"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 + i * 0.1, type: "spring" as const }}
            >
              {stat.value}
            </motion.span>
            <span className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Stars decoration */}
      <motion.div
        className="mt-8 flex justify-center gap-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
      >
        {[1, 2, 3, 4, 5].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 + i * 0.1 }}
          >
            <Star
              size={20}
              className="fill-amber-400 text-amber-400"
              fillOpacity={0.5}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default WhyChooseUs;
