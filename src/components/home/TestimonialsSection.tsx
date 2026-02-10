import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, MessageSquareHeart } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { testimonials } from "@/data/testimonials";

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  // Auto-advance every 6s
  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((p) => (p + 1) % testimonials.length);
  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-amber-100/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
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
            <MessageSquareHeart size={12} />
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl font-medium leading-tight text-foreground md:text-5xl lg:text-6xl"
          >
            What Our{" "}
            <span className="relative">
              <span className="relative z-10">Guests</span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-3 rounded-full bg-primary/20"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </span>{" "}
            Say
          </motion.h2>
        </AnimatedSection>

        {/* Testimonial Card */}
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-card shadow-2xl"
          >
            {/* Decorative backgrounds */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5" />
            <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-amber-100/50" />

            <div className="relative p-8 md:p-12">
              {/* Quote icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="absolute right-8 top-8"
              >
                <Quote size={48} className="text-primary/10" />
              </motion.div>

              {/* Rating stars */}
              <motion.div
                className="mb-6 flex justify-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.4 + i * 0.08, type: "spring" as const }}
                  >
                    <Star
                      size={24}
                      className="fill-amber-400 text-amber-400"
                      fillOpacity={0.6}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Testimonial text */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-center"
                >
                  <p className="mb-8 font-serif text-xl italic leading-relaxed text-foreground md:text-2xl">
                    "{testimonials[current].text}"
                  </p>

                  {/* Author info */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, type: "spring" as const }}
                      className="mb-3 h-16 w-16 overflow-hidden rounded-full border-2 border-primary/20"
                    >
                      <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground font-serif text-xl font-bold">
                        {testimonials[current].name.split(" ").map((n) => n[0]).join("")}
                      </div>
                    </motion.div>
                    <p className="font-serif text-lg font-semibold text-foreground">
                      {testimonials[current].name}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {testimonials[current].service}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <motion.div
                className="mt-10 flex items-center justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  onClick={prev}
                  whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--secondary))" }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-primary"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={20} className="text-muted-foreground" />
                </motion.button>

                {/* Dots indicator */}
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === current ? "w-8 bg-primary" : "w-2 bg-border hover:bg-primary/30"
                      }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                      whileHover={{ scale: 1.2 }}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={next}
                  whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--secondary))" }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-primary"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={20} className="text-muted-foreground" />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Trust badges */}
        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          {[
            { value: "500+", label: "5-Star Reviews" },
            { value: "98%", label: "Satisfaction" },
            { value: "4.9", label: "Average Rating" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 + i * 0.1 }}
              className="flex flex-col items-center"
            >
              <span className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                {stat.value}
              </span>
              <span className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
