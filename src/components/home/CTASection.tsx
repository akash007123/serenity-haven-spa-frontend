import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Calendar, MessageCircle, Heart, Star } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const CTASection = () => (
  <section className="relative overflow-hidden bg-primary py-24 md:py-32">
    {/* Animated background shapes */}
    <motion.div
      animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
    />
    <motion.div
      animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-secondary/10 blur-3xl"
    />
    <motion.div
      animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/2 left-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl"
    />

    {/* Floating decorative elements */}
    <motion.div
      className="absolute left-10 top-1/4 hidden md:block"
      animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <Heart size={24} className="text-accent/30" fill="currentColor" fillOpacity={0.2} />
    </motion.div>
    <motion.div
      className="absolute right-20 bottom-1/4 hidden md:block"
      animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <Star size={20} className="text-secondary/30" fill="currentColor" fillOpacity={0.2} />
    </motion.div>

    <div className="container-spa relative z-10 text-center">
      <AnimatedSection>
        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-xs font-medium uppercase tracking-wider text-primary-foreground backdrop-blur-sm"
        >
          <Sparkles size={14} />
          Your Journey Awaits
        </motion.span>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-6 font-serif text-4xl font-medium leading-tight text-primary-foreground md:text-5xl lg:text-6xl"
        >
          Ready to Begin Your{" "}
          <span className="relative">
            <span className="relative z-10 text-accent">Journey</span>
            <motion.span
              className="absolute -bottom-2 left-0 right-0 h-3 rounded-full bg-accent/30"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </span>
          ?
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-primary-foreground/80 md:text-xl"
        >
          Step into serenity today. Let our expert therapists guide you toward total
          relaxation and renewed vitality. Your path to wellness starts here.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {/* Primary Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative"
          >
            <Link
              to="/booking"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-accent px-10 py-4 text-base font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all hover:shadow-xl hover:shadow-accent/30"
            >
              <Calendar size={20} className="relative z-10" />
              <span className="relative z-10">Book Your Appointment</span>
              <motion.span
                className="relative z-10"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <ArrowRight size={20} />
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

          {/* Secondary Button */}
          <motion.div
            whileHover={{ scale: 1.02, backgroundColor: "hsl(var(--primary) / 0.2)" }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:border-accent/50"
            >
              <MessageCircle size={18} className="transition-transform group-hover:-translate-x-1" />
              <span>Contact Us</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-8"
        >
          {[
            { value: "10k+", label: "Happy Clients" },
            { value: "15+", label: "Years Experience" },
            { value: "4.9", label: "Star Rating" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-accent text-accent" />
                <span className="font-serif text-2xl font-bold text-primary-foreground">
                  {stat.value}
                </span>
              </div>
              <span className="mt-1 text-xs font-medium uppercase tracking-wider text-primary-foreground/60">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative bottom line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mx-auto mt-12 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
        />
      </AnimatedSection>
    </div>
  </section>
);

export default CTASection;
