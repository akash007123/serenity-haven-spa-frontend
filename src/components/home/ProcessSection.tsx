import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight, Sparkles, Heart, Utensils, Calendar, Coffee } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import spaProcess from "@/assets/spa-process.jpg";

const steps = [
  {
    num: "01",
    title: "Consultation",
    desc: "We begin with a personal consultation to understand your needs, preferences, and any areas of concern.",
    icon: Calendar,
  },
  {
    num: "02",
    title: "Preparation",
    desc: "Your therapist prepares a customized blend of oils and sets the ambiance to match your desired experience.",
    icon: Heart,
  },
  {
    num: "03",
    title: "Treatment",
    desc: "Enjoy your treatment in a tranquil environment, expertly delivered by our certified therapists.",
    icon: Sparkles,
  },
  {
    num: "04",
    title: "Aftercare",
    desc: "Relax in our lounge with herbal tea while we share personalized aftercare tips for lasting benefits.",
    icon: Coffee,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
    },
  },
};

const ProcessSection = () => (
  <section className="relative overflow-hidden py-20 md:py-28">
    {/* Background decoration */}
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-1/2 left-0 h-96 w-96 -translate-y-1/2 rounded-full bg-amber-100/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
    </div>

    <div className="container-spa">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        {/* Image Section */}
        <AnimatedSection direction="left" className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Main image with frame */}
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <motion.img
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                src={spaProcess}
                alt="Spa treatment room"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, type: "spring" as const }}
              className="absolute -bottom-8 -right-8 hidden rounded-2xl bg-primary p-6 text-center shadow-2xl lg:block"
            >
              <motion.p
                className="font-serif text-4xl font-bold text-primary-foreground"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                15+
              </motion.p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-primary-foreground/80">
                Years of Excellence
              </p>
              <motion.div
                className="absolute -bottom-2 -left-2 h-4 w-4 rounded-full bg-amber-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -left-4 top-1/2 h-24 w-24 rounded-full border-2 border-primary/20"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            />
          </motion.div>
        </AnimatedSection>

        {/* Content Section */}
        <AnimatedSection direction="right">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-primary">
              <Sparkles size={12} />
              Your Journey
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-2 font-serif text-4xl font-medium leading-tight text-foreground md:text-5xl"
          >
            Experience Our{" "}
            <span className="relative">
              <span className="relative z-10">Wellness</span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-3 rounded-full bg-primary/20"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </span>{" "}
            Process
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground"
          >
            From your first consultation to final aftercare, every step is designed
            to provide you with a transformative spa experience that rejuvenates
            both body and mind.
          </motion.p>

          {/* Steps */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mt-10 space-y-6"
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                variants={itemVariants}
                className="group relative flex gap-5"
              >
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="absolute left-6 top-14 h-[calc(100%-3.5rem)] w-px bg-border transition-colors group-hover:bg-primary/30" />
                )}

                {/* Number circle */}
                <motion.div
                  className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 17 }}
                >
                  <step.icon size={20} />
                </motion.div>

                {/* Content */}
                <div className="flex-1 pb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      Step {step.num}
                    </span>
                  </div>
                  <h3 className="mt-1 font-serif text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10"
          >
            <motion.button
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-2 font-medium text-primary transition-colors hover:text-primary/80"
            >
              Book Your Journey
              <motion.span
                className="inline-flex"
                whileHover={{ x: 5 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 17 }}
              >
                <ArrowRight size={18} />
              </motion.span>
            </motion.button>
          </motion.div>
        </AnimatedSection>
      </div>
    </div>
  </section>
);

export default ProcessSection;
